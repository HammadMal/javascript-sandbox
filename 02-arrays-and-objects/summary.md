# Arrays and Objects - Summary

## Arrays

### Creating Arrays

**Array Literal (Most Common)**
```javascript
const numbers = [12, 45, 33, 29, 39];
const mixed = [12, 'Hello', true, null]; // Can hold different types
```

**Array Constructor**
```javascript
const fruits = new Array('apple', 'grape', 'orange');
```

### Accessing Array Elements

```javascript
const value = numbers[0]; // Access by index (0-based)
const length = numbers.length; // Get array length
```

### Modifying Arrays

```javascript
fruits[2] = 'pear'; // Change element at index 2
fruits.length = 2; // Truncate array
fruits[fruits.length] = 'blueberry'; // Add to end using length
```

### Array Methods

**Adding/Removing Elements**
- `push()` - Add to end
- `pop()` - Remove from end
- `unshift()` - Add to beginning
- `shift()` - Remove from beginning

```javascript
arr.push(100);    // Adds 100 to end
arr.pop();        // Removes last element
arr.unshift(99);  // Adds 99 to beginning
arr.shift();      // Removes first element
```

**Searching**
- `includes()` - Check if element exists (returns boolean)
- `indexOf()` - Get index of first match (returns -1 if not found)

```javascript
arr.includes(445);  // false
arr.indexOf(28);    // returns index or -1
```

**Extracting & Manipulating**
- `slice(start, end)` - Returns selected elements (doesn't modify original, end index not included)
- `splice(start, count)` - Removes elements (modifies original)
- `reverse()` - Reverses array order (modifies original)

```javascript
arr.slice(1, 4);    // Returns elements from index 1 to 3
arr.splice(1, 4);   // Removes 4 elements starting at index 1
arr.splice(4, 1);   // Removes 1 element at index 4
```

**Converting to String**
- `toString()` - Convert to comma-separated string
- `join()` - Convert to string with custom separator

```javascript
arr.toString();  // "28,38,44,29,109"
arr.join();      // Same as toString()
arr.join('-');   // "28-38-44-29-109"
```

**Method Chaining**
```javascript
const result = arr.slice(1, 4).reverse().toString().charAt(0);
```

### Nested Arrays

```javascript
const fruits = ['apple', 'pear', 'orange'];
const berries = ['strawberry', 'blueberry', 'raspberry'];

// Nesting arrays
fruits.push(berries);
fruits[3][1]; // Access 'blueberry'

// Create nested array variable
const allFruits = [fruits, berries];
allFruits[1][2]; // Access 'raspberry'
```

### Combining Arrays

**concat()**
```javascript
const combined = fruits.concat(berries);
```

**Spread Operator (...)**
```javascript
const combined = [...fruits, ...berries];
```

**flat()**
```javascript
const arr = [1, 2, [3, 4, 5], 6, [7, 8]];
const flattened = arr.flat(); // [1, 2, 3, 4, 5, 6, 7, 8]
```

### Static Array Methods

```javascript
Array.isArray(fruits);           // Check if variable is an array
Array.from('12345');             // Create array from iterable: ['1','2','3','4','5']
Array.of(a, b, c);               // Create array from values
```

### Array Destructuring

```javascript
const numbers = [23, 67, 33, 49, 52];

const [first, second, ...rest] = numbers;
// first = 23
// second = 67
// rest = [33, 49, 52]
```

---

## Objects

### Creating Objects

**Object Literal (Most Common)**
```javascript
const person = {
  name: 'John Doe',
  age: 30,
  isAdmin: true,
  address: {
    street: '123 Main st',
    city: 'Boston',
    state: 'MA',
  },
  hobbies: ['music', 'sports'],
};
```

**Object Constructor**
```javascript
const todo = new Object();
todo.id = 1;
todo.name = 'Buy Milk';
todo.completed = false;
```

### Accessing Properties

**Dot Notation**
```javascript
person.name;              // 'John Doe'
person.address.state;     // 'MA'
person.hobbies[0];        // 'music'
```

**Bracket Notation**
```javascript
person['age'];            // 30
person['first name'];     // For keys with spaces
```

### Modifying Objects

**Update Properties**
```javascript
person.name = 'Jane Doe';
person['isAdmin'] = false;
```

**Add New Properties**
```javascript
person.hasChildren = true;
```

**Delete Properties**
```javascript
delete person.age;
```

**Add Methods**
```javascript
person.greet = function () {
  console.log(`Hello, my name is ${this.name}`);
};
person.greet();
```

### Multi-word Keys

```javascript
const person2 = {
  'first name': 'Brad',
  'last name': 'Traversy',
};

person2['first name']; // Must use bracket notation
```

### Nested Objects

```javascript
const person = {
  address: {
    coords: {
      lat: 42.9384,
      lng: -71.3232,
    },
  },
};

person.address.coords.lat; // 42.9384
```

### Combining Objects

**Spread Operator**
```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const obj3 = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }
```

**Object.assign()**
```javascript
const obj4 = Object.assign({}, obj1, obj2); // Same as spread
```

### Array of Objects

```javascript
const todos = [
  { id: 1, name: 'Buy Milk' },
  { id: 2, name: 'Pickup kids from school' },
  { id: 3, name: 'Take out trash' },
];

todos[1].name; // 'Pickup kids from school'
```

### Object Methods

```javascript
const todo = { id: 1, name: 'Buy Milk', completed: false };

Object.keys(todo);              // ['id', 'name', 'completed']
Object.values(todo);            // [1, 'Buy Milk', false]
Object.entries(todo);           // [['id', 1], ['name', 'Buy Milk'], ['completed', false]]
Object.keys(todo).length;       // 3 (get object length)
todo.hasOwnProperty('age');     // false
```

### Property Shorthand

```javascript
const firstName = 'John';
const lastName = 'Doe';
const age = 30;

// If variable names match property names
const person = {
  firstName,  // Same as firstName: firstName
  lastName,   // Same as lastName: lastName
  age,        // Same as age: age
};
```

### Object Destructuring

**Basic Destructuring**
```javascript
const todo = {
  id: 1,
  title: 'Take out trash',
  user: {
    name: 'John',
  },
};

const { id, title } = todo;
// id = 1
// title = 'Take out trash'
```

**Renaming Properties**
```javascript
const { id: todoId, title } = todo;
// todoId = 1 (renamed from id)
```

**Nested Destructuring**
```javascript
const { user: { name } } = todo;
// name = 'John'
```

---

## JSON (JavaScript Object Notation)

### What is JSON?
- Text-based data format
- Used for storing and exchanging data
- Similar to JavaScript objects but stricter (keys must be in quotes)

### Converting Objects to JSON

**JSON.stringify()**
```javascript
const post = {
  id: 1,
  title: 'Post One',
  body: 'This is the body',
};

const str = JSON.stringify(post);
// str = '{"id":1,"title":"Post One","body":"This is the body"}'
```

### Converting JSON to Objects

**JSON.parse()**
```javascript
const obj = JSON.parse(str);
// obj = { id: 1, title: 'Post One', body: 'This is the body' }
```

### JSON with Arrays

```javascript
const posts = [
  { id: 1, title: 'Post One', body: 'This is the body' },
  { id: 2, title: 'Post Two', body: 'This is the body' },
];

const str2 = JSON.stringify(posts);
const obj1 = JSON.parse(str2);

obj1[0].title; // 'Post One'
```

---

## Key Differences: Arrays vs Objects

| Feature | Arrays | Objects |
|---------|--------|---------|
| Index | Numerical (0, 1, 2...) | String keys (name, age, etc.) |
| Order | Maintains order | No guaranteed order |
| Access | `arr[0]` | `obj.key` or `obj['key']` |
| Length | `arr.length` | `Object.keys(obj).length` |
| Use Case | Ordered lists | Key-value pairs |

---

## Common Patterns

### Rest/Spread Operator
```javascript
// Spread: Expands array/object
const combined = [...arr1, ...arr2];
const merged = { ...obj1, ...obj2 };

// Rest: Collects remaining elements
const [first, ...rest] = numbers;
```

### Immutability
- `slice()`, `concat()`, spread - Don't modify original
- `splice()`, `push()`, `pop()`, `reverse()` - Modify original

### When to Use What
- Use **arrays** for ordered collections
- Use **objects** for named properties and key-value pairs
- Use **array of objects** for structured data (like database records)
