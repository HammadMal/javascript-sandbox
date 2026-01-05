# Document Object Model (DOM) - Summary

## 1. DOM Introduction

### What is the DOM?
The Document Object Model (DOM) is a programming interface for HTML documents. It represents the page as a tree structure where each HTML element is a node.

```javascript
// The global window object
console.log(window);

// The document object is part of window
console.dir(window.document);

// Access DOM elements directly
console.log(document.body);
console.log(document.links[0]);
```

### Basic DOM Manipulation
```javascript
// Write to the document
document.write('Hello from JS');

// Modify element content
document.getElementById('main').innerHTML = '<h1>Hello</h1>';
document.querySelector('#main h1').innerText = 'Hello';
```

**Key Points:**
- DOM represents HTML as a tree of objects
- `window` is the global browser object
- `document` is a property of `window`
- Can manipulate page content with JavaScript

---

## 2. Examining Document Object Properties

### Useful Document Properties
```javascript
// Get all links
console.log(document.links);

// Get all images
console.log(document.images);

// Get all forms
console.log(document.forms);

// Get the URL
console.log(document.URL);

// Get the domain
console.log(document.domain);
```

**Key Points:**
- `document` object has many useful properties
- Collections are array-like (not true arrays)
- Can access forms, links, images, etc.

---

## 3. DOM Selectors - Single Element

### getElementById()
```javascript
const title = document.getElementById('app-title');

// Get attributes
console.log(title.id);
console.log(title.className);
console.log(title.getAttribute('id'));

// Set attributes
title.title = 'Shopping List';
title.setAttribute('class', 'title');
```

### Get/Change Content
```javascript
// Different ways to get/set content
console.log(title.textContent);  // Gets all text including hidden
title.textContent = 'Hello World';
title.innerText = 'Hello Again';  // Respects CSS styling
title.innerHTML = '<strong>Shopping List</strong>'; // Can include HTML
```

### Change Styles
```javascript
title.style.color = 'red';
title.style.backgroundColor = 'black';
title.style.padding = '10px';
title.style.borderRadius = '10px';
```

### querySelector()
```javascript
// Use any CSS selector
document.querySelector('h1');
document.querySelector('#app-title');
document.querySelector('.container');
document.querySelector('input[type="text"]');
document.querySelector('li:nth-child(2)');

// Can use on other elements too
const list = document.querySelector('ul');
const firstItem = list.querySelector('li');
```

**Key Differences:**
| Property | Description |
|----------|-------------|
| `textContent` | Gets all text, including hidden elements |
| `innerText` | Gets visible text only (respects CSS) |
| `innerHTML` | Gets/sets HTML markup |

---

## 4. DOM Selectors - Multiple Elements

### querySelectorAll()
```javascript
// Returns a NodeList
const listItems = document.querySelectorAll('.item');

// Access by index
console.log(listItems[1].innerText);

// Can use forEach on NodeList
listItems.forEach((item, index) => {
  item.style.color = 'red';

  if (index === 1) {
    item.remove();
  }
});
```

### getElementsByClassName()
```javascript
// Returns an HTMLCollection
const items = document.getElementsByClassName('item');

// Convert to array to use array methods
const itemsArray = Array.from(items);

itemsArray.forEach((item) => {
  console.log(item.innerText);
});
```

### getElementsByTagName()
```javascript
const listItems = document.getElementsByTagName('li');
console.log(listItems[0].innerText);
```

**NodeList vs HTMLCollection:**
| Feature | NodeList | HTMLCollection |
|---------|----------|----------------|
| Returned by | `querySelectorAll()` | `getElementsByClassName()`, `getElementsByTagName()` |
| forEach() | Yes | No (must convert to array) |
| Static/Live | Static | Live (updates automatically) |

**Key Points:**
- `querySelectorAll()` returns NodeList (can use forEach)
- `getElementsByClassName()` returns HTMLCollection (need to convert for forEach)
- NodeList is static, HTMLCollection is live

---

## 5. Traversing the DOM - Elements

### Child Elements
```javascript
const parent = document.querySelector('.parent');

// Get all children (HTMLCollection)
console.log(parent.children);

// Access specific child
parent.children[1].innerText = 'Child Two';
parent.children[1].style.color = 'red';

// First and last child
parent.firstElementChild.innerText = 'Child One';
parent.lastElementChild.innerText = 'Child Three';
```

### Parent Element
```javascript
const child = document.querySelector('.child');

// Get parent
const parent = child.parentElement;
child.parentElement.style.border = '1px solid #ccc';
```

### Sibling Elements
```javascript
const secondItem = document.querySelector('.child:nth-child(2)');

// Next sibling
console.log(secondItem.nextElementSibling);
secondItem.nextElementSibling.style.color = 'green';

// Previous sibling
secondItem.previousElementSibling.style.color = 'orange';
```

**Element Properties:**
- `children` - All child elements
- `firstElementChild` - First child element
- `lastElementChild` - Last child element
- `parentElement` - Parent element
- `nextElementSibling` - Next sibling element
- `previousElementSibling` - Previous sibling element

---

## 6. Traversing the DOM - Nodes

### Understanding Nodes
Nodes include elements, text (including whitespace), and comments. Elements are a specific type of node.

```javascript
const parent = document.querySelector('.parent');

// Get child nodes (includes text nodes)
console.log(parent.childNodes);

// Check node properties
console.log(parent.childNodes[0].nodeName); // #text
console.log(parent.childNodes[3].nodeName); // DIV

// First and last child nodes
console.log(parent.firstChild);
console.log(parent.lastChild);
```

### Parent and Sibling Nodes
```javascript
const child = document.querySelector('.child');

// Parent node
console.log(child.parentNode);

// Sibling nodes
const secondItem = document.querySelector('.child:nth-child(2)');
console.log(secondItem.nextSibling);      // Includes text nodes
console.log(secondItem.previousSibling);
```

**Elements vs Nodes:**
| Elements | Nodes |
|----------|-------|
| `children` | `childNodes` |
| `firstElementChild` | `firstChild` |
| `lastElementChild` | `lastChild` |
| `parentElement` | `parentNode` |
| `nextElementSibling` | `nextSibling` |
| `previousElementSibling` | `previousSibling` |

**Key Points:**
- Nodes include text, comments, and elements
- Element methods skip text/comment nodes
- Usually prefer element methods over node methods
- Text nodes include whitespace between elements

---

## 7. Creating Elements

### createElement()
```javascript
// Create an element
const div = document.createElement('div');

// Set properties
div.className = 'my-element';
div.id = 'my-element';
div.setAttribute('title', 'My Element');

// Add text content
div.innerText = 'Hello World';

// Or create text node
const text = document.createTextNode('Hello World');
div.appendChild(text);

// Add to DOM
document.body.appendChild(div);
document.querySelector('ul').appendChild(div);
```

**Key Points:**
- `createElement()` creates a new element
- Element exists in memory until added to DOM
- Use `appendChild()` to add to the page
- Can set attributes and content before adding to DOM

---

## 8. innerHTML vs createElement

### Using innerHTML
```javascript
function createListItem(item) {
  const li = document.querySelector('.items');

  li.innerHTML += `
    <li>
      ${item}
      <button class="remove-item">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </li>
  `;
}
```

### Using createElement
```javascript
function createNewItem(item) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = document.createElement('button');
  button.className = 'remove-item btn-link text-red';

  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-xmark';

  button.appendChild(icon);
  li.appendChild(button);

  document.querySelector('.items').appendChild(li);
}
```

**innerHTML vs createElement:**
| innerHTML | createElement |
|-----------|---------------|
| Simpler, less code | More code |
| Can break event listeners | Preserves event listeners |
| Re-parses entire content | Only affects new elements |
| Good for static content | Better for dynamic content |
| Security risk (XSS) | More secure |

---

## 9. Refactoring to Multiple Functions

### Clean Code Example
```javascript
function createNewItem(item) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  document.querySelector('.items').appendChild(li);
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;

  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);

  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}
```

**Best Practices:**
- Break complex functions into smaller ones
- Each function should do one thing
- Makes code more readable and reusable
- Easier to test and debug

---

## 10. Inserting Elements

### insertAdjacentElement()
```javascript
const filter = document.querySelector('.filter');
const h1 = document.createElement('h1');
h1.textContent = 'insertAdjacentElement';

// Position options: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
filter.insertAdjacentElement('beforebegin', h1);
```

### Position Reference
```html
<!-- beforebegin -->
<p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>
<!-- afterend -->
```

### insertAdjacentText()
```javascript
const item = document.querySelector('li:first-child');
item.insertAdjacentText('beforebegin', 'Text content here');
```

### insertAdjacentHTML()
```javascript
const clearBtn = document.querySelector('#clear');
clearBtn.insertAdjacentHTML('afterend', '<h2>HTML content</h2>');
```

### insertBefore()
```javascript
const ul = document.querySelector('ul');
const li = document.createElement('li');
li.textContent = 'insertBefore';

const thirdItem = document.querySelector('li:nth-child(3)');
ul.insertBefore(li, thirdItem);
```

**Insert Methods:**
| Method | Description |
|--------|-------------|
| `insertAdjacentElement()` | Insert element at specific position |
| `insertAdjacentText()` | Insert text at specific position |
| `insertAdjacentHTML()` | Insert HTML at specific position |
| `insertBefore()` | Insert before a specific element |

---

## 11. Custom insertAfter() Challenge

### The Problem
There's `insertBefore()` but no `insertAfter()` method in the DOM API.

### Solution
```javascript
function insertAfter(newEl, existingEl) {
  existingEl.parentElement.insertBefore(newEl, existingEl.nextSibling);
}

// Usage
const li = document.createElement('li');
li.textContent = 'Insert Me After!';

const firstItem = document.querySelector('li:first-child');
insertAfter(li, firstItem);
```

**How It Works:**
- Get the parent of the existing element
- Use `insertBefore()` with the existing element's next sibling
- Inserting before the next sibling = inserting after the current element

---

## 12. Replacing Elements

### replaceWith()
```javascript
const firstItem = document.querySelector('li:first-child');

const li = document.createElement('li');
li.textContent = 'Replaced First';

firstItem.replaceWith(li);
```

### outerHTML
```javascript
const secondItem = document.querySelector('li:nth-child(2)');
secondItem.outerHTML = '<li>Replaced Second</li>';
```

### Replace All Items
```javascript
const lis = document.querySelectorAll('li');

lis.forEach((item, index) => {
  item.outerHTML = index === 1
    ? '<li>Second Item</li>'
    : '<li>Item</li>';
});
```

### replaceChild()
```javascript
const header = document.querySelector('header');
const h1 = document.querySelector('header h1');

const h2 = document.createElement('h2');
h2.id = 'app-title';
h2.textContent = 'Shopping List';

header.replaceChild(h2, h1);
```

**Replace Methods:**
| Method | Description |
|--------|-------------|
| `replaceWith()` | Replace element with new element |
| `outerHTML` | Replace element with HTML string |
| `replaceChild()` | Replace child element from parent |

---

## 13. Removing Elements

### remove()
```javascript
// Remove element directly
const clearBtn = document.querySelector('#clear');
clearBtn.remove();
```

### removeChild()
```javascript
// Remove from parent
const ul = document.querySelector('ul');
const li = document.querySelector('li:first-child');

ul.removeChild(li);
```

### Remove by Position
```javascript
function removeItem(itemNumber) {
  const ul = document.querySelector('ul');
  const li = document.querySelector(`li:nth-child(${itemNumber})`);
  ul.removeChild(li);
}

// Or using array indexing
function removeItem2(itemNumber) {
  const li = document.querySelectorAll('li');
  li[itemNumber - 1].remove();
}

// Arrow function version
const removeItem3 = (itemNumber) =>
  document.querySelectorAll('li')[itemNumber - 1].remove();
```

**Remove Methods:**
| Method | Description |
|--------|-------------|
| `remove()` | Remove element directly |
| `removeChild()` | Remove child from parent |

---

## 14. Styles and Classes

### className
```javascript
const itemList = document.querySelector('.item-list');
const text = document.querySelector('p');

// Get all classes as string
console.log(itemList.className);

// Set classes (overwrites existing)
text.className = 'card dark';
```

### classList
```javascript
// Get classList (DOMTokenList - array-like)
console.log(itemList.classList);

// Loop through classes
itemList.classList.forEach((c) => console.log(c));

// Add class
text.classList.add('dark');

// Remove class
text.classList.remove('card');

// Toggle class (add if not present, remove if present)
text.classList.toggle('hidden');

// Replace class
text.classList.replace('card', 'dark');

// Check if class exists
if (text.classList.contains('dark')) {
  console.log('Has dark class');
}
```

### Inline Styles
```javascript
// Set individual styles
itemList.style.lineHeight = '3';
itemList.style.color = 'red';
itemList.style.backgroundColor = 'black';

// Style multiple items
const items = document.querySelectorAll('li');
items.forEach((item, index) => {
  item.style.color = 'red';

  if (index === 2) {
    item.style.color = 'blue';
  }
});
```

**className vs classList:**
| className | classList |
|-----------|-----------|
| Returns string | Returns DOMTokenList |
| Overwrites all classes | Modify individual classes |
| Less flexible | More flexible |
| `element.className = 'new'` | `element.classList.add('new')` |

**classList Methods:**
- `add(class)` - Add a class
- `remove(class)` - Remove a class
- `toggle(class)` - Toggle a class
- `replace(old, new)` - Replace a class
- `contains(class)` - Check if class exists

---

## Quick Reference

### Selector Methods
```javascript
// Single element
document.getElementById('id')
document.querySelector('selector')

// Multiple elements
document.querySelectorAll('selector')    // NodeList
document.getElementsByClassName('class') // HTMLCollection
document.getElementsByTagName('tag')     // HTMLCollection
```

### Traversal Properties
```javascript
// Elements only
element.children
element.firstElementChild
element.lastElementChild
element.parentElement
element.nextElementSibling
element.previousElementSibling

// All nodes (including text)
element.childNodes
element.firstChild
element.lastChild
element.parentNode
element.nextSibling
element.previousSibling
```

### Content Properties
```javascript
element.textContent  // All text including hidden
element.innerText    // Visible text only
element.innerHTML    // HTML markup
```

### Manipulation Methods
```javascript
// Create
document.createElement('div')
document.createTextNode('text')

// Insert
parent.appendChild(child)
element.insertAdjacentElement(position, element)
parent.insertBefore(newEl, existingEl)

// Replace
element.replaceWith(newElement)
parent.replaceChild(newChild, oldChild)

// Remove
element.remove()
parent.removeChild(child)
```

### Style and Class Methods
```javascript
element.className = 'class1 class2'
element.classList.add('class')
element.classList.remove('class')
element.classList.toggle('class')
element.classList.replace('old', 'new')
element.style.property = 'value'
```

---

## Best Practices

1. **Use `querySelector()` for most selections** - More flexible than older methods
2. **Prefer `classList` over `className`** - Easier to manipulate individual classes
3. **Use `createElement()` for dynamic content** - More secure than `innerHTML`
4. **Cache DOM queries** - Store in variables instead of repeated queries
5. **Use element methods over node methods** - Simpler and skips text nodes
6. **Avoid `innerHTML` for user input** - Prevents XSS attacks
7. **Use semantic method names** - Choose `textContent`, `innerText`, or `innerHTML` appropriately
8. **Batch DOM updates** - Multiple changes to elements before inserting to DOM
9. **Event delegation** - Handle events on parent instead of many children
10. **Use meaningful variable names** - Makes code more readable

---

## Common Patterns

### Creating and Inserting Elements
```javascript
// 1. Create
const element = document.createElement('div');

// 2. Configure
element.className = 'my-class';
element.textContent = 'Content';

// 3. Insert
parent.appendChild(element);
```

### Modifying Multiple Elements
```javascript
const items = document.querySelectorAll('.item');

items.forEach((item, index) => {
  // Modify each item
  item.style.color = 'red';
  item.classList.add('active');
});
```

### Conditional Styling
```javascript
const element = document.querySelector('.element');

if (condition) {
  element.classList.add('active');
} else {
  element.classList.remove('active');
}

// Or use toggle
element.classList.toggle('active', condition);
```
