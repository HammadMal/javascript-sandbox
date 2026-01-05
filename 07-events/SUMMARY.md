# Section 07: Events - Summary

## 1. Event Listeners

### Adding Event Listeners
- **onclick property**: `element.onclick = function() { }`
  - Only one handler can be assigned at a time (overwrites previous)

- **addEventListener()**: `element.addEventListener('event', callback)`
  - Can attach multiple handlers to the same event
  - More flexible and modern approach
  - Can use named or anonymous functions

### Removing Event Listeners
- **removeEventListener()**: `element.removeEventListener('event', callback)`
  - Must use named function (same reference) to remove
  - Example: `setTimeout(() => btn.removeEventListener('click', handler), 5000)`

### Triggering Events Programmatically
- `element.click()` - Triggers click event from JavaScript

---

## 2. Mouse Events

Common mouse events you can listen for:

| Event | Description |
|-------|-------------|
| `click` | Single click on element |
| `dblclick` | Double click on element |
| `contextmenu` | Right-click on element |
| `mousedown` | Mouse button pressed down |
| `mouseup` | Mouse button released |
| `wheel` | Mouse wheel scrolled |
| `mouseover` | Mouse enters element |
| `mouseout` | Mouse leaves element |
| `dragstart` | Drag operation starts |
| `drag` | Element is being dragged |
| `dragend` | Drag operation ends |

**Example:**
```javascript
logo.addEventListener('click', onClick);
logo.addEventListener('dblclick', onDoubleClick);
logo.addEventListener('contextmenu', onRightClick);
```

---

## 3. Event Object

The event object (e) contains useful information about the event:

### Key Properties:
- **`target`**: The element that triggered the event
- **`currentTarget`**: The element the listener is attached to
- **`type`**: The type of event (e.g., 'click', 'keydown')
- **`timeStamp`**: Time when event was triggered

### Position Properties:
- **`clientX/Y`**: Mouse position relative to viewport
- **`offsetX/Y`**: Mouse position relative to the element
- **`pageX/Y`**: Mouse position relative to the page
- **`screenX/Y`**: Mouse position relative to the screen

### Methods:
- **`e.preventDefault()`**: Prevents default browser behavior
  - Example: Preventing link navigation or form submission

**Example:**
```javascript
function onClick(e) {
  console.log(e.target);     // Element clicked
  console.log(e.clientX);    // X position in viewport
  console.log(e.clientY);    // Y position in viewport
}

document.querySelector('a').addEventListener('click', (e) => {
  e.preventDefault();  // Prevent link from navigating
});
```

---

## 4. Keyboard Events

### Event Types:
- **`keypress`**: Key is pressed (deprecated for some keys)
- **`keydown`**: Key is pressed down
- **`keyup`**: Key is released

### Event Properties:
- **`key`**: The actual key pressed (e.g., 'Enter', 'a', 'K')
- **`keyCode`**: Numeric code of key (deprecated but still used)
- **`code`**: Physical key code (e.g., 'Digit1', 'KeyA')
- **`repeat`**: Boolean - true if key is being held down

### Modifier Keys:
- **`shiftKey`**: Boolean - true if Shift is pressed
- **`ctrlKey`**: Boolean - true if Control is pressed
- **`altKey`**: Boolean - true if Alt is pressed

**Example:**
```javascript
input.addEventListener('keydown', (e) => {
  // Check specific key
  if (e.key === 'Enter') {
    alert('Enter pressed');
  }

  // Check keyCode
  if (e.keyCode === 13) {
    alert('Enter pressed');
  }

  // Check modifier combinations
  if (e.shiftKey && e.key === 'K') {
    console.log('Shift + K pressed');
  }
});
```

---

## 5. Input Events

### Event Types:
- **`input`**: Fires on every value change (real-time)
- **`change`**: Fires when value changes and element loses focus
- **`focus`**: Element receives focus
- **`blur`**: Element loses focus

### Getting Values:
- Text inputs: `e.target.value`
- Checkboxes: `e.target.checked` (boolean)

**Example:**
```javascript
itemInput.addEventListener('input', (e) => {
  heading.textContent = e.target.value;  // Updates in real-time
});

checkbox.addEventListener('input', (e) => {
  const isChecked = e.target.checked;
  heading.textContent = isChecked ? 'Checked' : 'Not Checked';
});

itemInput.addEventListener('focus', () => {
  console.log('Input focused');
});

itemInput.addEventListener('blur', () => {
  console.log('Input blurred');
});
```

---

## 6. Form Submission

### Handling Form Submit:
- **`submit`** event fires when form is submitted
- **ALWAYS** use `e.preventDefault()` to prevent page reload

### Method 1: Direct Value Access
```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const item = document.getElementById('item-input').value;
  const priority = document.getElementById('priority-input').value;

  if (item === '' || priority === '0') {
    alert('Please fill in all fields');
    return;
  }
});
```

### Method 2: FormData Object
```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  // Get individual items (must have name attribute in HTML)
  const item = formData.get('item');
  const priority = formData.get('priority');

  // Get all entries as iterator
  const entries = formData.entries();

  // Loop through entries
  for (let entry of entries) {
    console.log(entry[0], entry[1]);  // [name, value]
  }
});
```

---

## 7. Event Bubbling

### What is Event Bubbling?
- Events "bubble up" from child to parent elements
- When child element triggers event, parent's listeners also fire
- Order: innermost element → outermost element

**Example:**
```javascript
// Clicking button triggers: button → div → form → body
button.addEventListener('click', (e) => {
  alert('Button clicked');
  e.stopPropagation();  // Stops bubbling to parent
});

div.addEventListener('click', () => {
  alert('Div clicked');
});

form.addEventListener('click', () => {
  alert('Form clicked');
});
```

### Stopping Propagation:
- **`e.stopPropagation()`**: Stops event from bubbling to parent elements

---

## 8. Event Delegation

### Concept:
- Instead of adding listeners to multiple child elements
- Add ONE listener to the parent element
- Use event bubbling to handle child element events

### Benefits:
- Better performance (fewer event listeners)
- Automatically works for dynamically added elements
- Cleaner code

**Example:**
```javascript
// Instead of this (adding listener to each item):
listItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.target.remove();
  });
});

// Do this (single listener on parent):
list.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.remove();
  }
});

// Works for multiple events:
list.addEventListener('mouseover', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.style.color = 'red';
  }
});
```

---

## 9. Window Events

### Page Load Events:
- **`load`**: Fires when entire page loads (including images, styles)
- **`DOMContentLoaded`**: Fires when DOM is ready (faster, doesn't wait for images)

```javascript
window.addEventListener('load', () => {
  console.log('Page fully loaded');
});

window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready');
});
```

### Window Interaction Events:
- **`resize`**: Window is resized
- **`scroll`**: Page is scrolled
- **`focus`**: Window/tab gains focus
- **`blur`**: Window/tab loses focus

**Examples:**
```javascript
// Resize event
window.addEventListener('resize', () => {
  console.log(`Size: ${window.innerWidth} x ${window.innerHeight}`);
});

// Scroll event
window.addEventListener('scroll', () => {
  console.log(`Scrolled: ${window.scrollX} x ${window.scrollY}`);

  if (window.scrollY > 70) {
    document.body.style.backgroundColor = 'black';
  }
});

// Focus/Blur events
window.addEventListener('focus', () => {
  console.log('Window focused');
});

window.addEventListener('blur', () => {
  console.log('Window lost focus');
});
```

---

## Key Takeaways

1. **addEventListener** is preferred over onclick property
2. Event object provides valuable information about the event
3. Use **preventDefault()** to stop default browser behavior
4. Use **stopPropagation()** to prevent event bubbling
5. **Event Delegation** is more efficient than multiple listeners
6. **FormData** object makes form handling easier
7. **DOMContentLoaded** is faster than **load** event
8. Always check **e.target** when using event delegation

---

## Common Patterns

### Pattern 1: Event Delegation for Dynamic Content
```javascript
parent.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    e.target.parentElement.remove();
  }
});
```

### Pattern 2: Form Validation
```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  // validate and process
});
```

### Pattern 3: Keyboard Shortcuts
```javascript
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    saveDocument();
  }
});
```
