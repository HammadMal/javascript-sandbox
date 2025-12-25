# Functions & Scope - Summary

## 1. Function Basics

### Defining and Invoking Functions
```javascript
// Define a function
function sayHello() {
  console.log('Hello World');
}

// Invoke/call the function
sayHello();
```

### Parameters and Return Values
```javascript
// Function with parameters
function add(num1, num2) {
  return num1 + num2;
}

// Arguments are the actual values passed
const result = add(5, 10); // 15
```

**Key Points:**
- Parameters: variables in function definition
- Arguments: actual values passed when calling
- `return` statement exits the function and returns a value
- Code after `return` never executes

---

## 2. Parameters & Arguments

### Default Parameters
```javascript
function registerUser(user = 'Bot') {
  return user + ' is registered';
}

registerUser(); // "Bot is registered"
```

### Rest Parameters
```javascript
function sum(...numbers) {
  let total = 0;
  for (const num of numbers) {
    total += num;
  }
  return total;
}

sum(1, 2, 3, 4, 5); // 15
```

### Objects as Parameters
```javascript
function loginUser(user) {
  return `User ${user.name} with ID ${user.id} logged in`;
}

loginUser({ id: 1, name: 'John' });
```

### Arrays as Parameters
```javascript
function getRandom(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
```

---

## 3. Global & Function Scope

### Global Scope
```javascript
const x = 100; // Global variable

function run() {
  console.log(x); // Can access global vars
}

run();
```

### Function Scope
```javascript
function add() {
  const y = 50; // Function scoped
  console.log(y);
}

console.log(y); // Error: y is not defined
```

### Variable Shadowing
```javascript
const x = 100;

function add() {
  const x = 1; // Shadows global x
  console.log(x); // 1
}
```

**Key Points:**
- Global variables accessible everywhere
- Function variables only accessible within function
- Inner scope can shadow outer scope variables
- `window` object contains global variables

---

## 4. Block Scope

### let & const are Block Scoped
```javascript
if (true) {
  const y = 200;
  console.log(y); // 200
}

console.log(y); // Error: y is not defined
```

### var is NOT Block Scoped
```javascript
if (true) {
  var c = 700;
}

console.log(c); // 700 (accessible outside block!)
```

### var IS Function Scoped
```javascript
function run() {
  var d = 100;
}

console.log(d); // Error: d is not defined
```

**Key Points:**
- `const` and `let`: block scoped (if, for, while, etc.)
- `var`: function scoped, NOT block scoped
- `var` variables attach to `window` object
- Always prefer `const` and `let` over `var`

---

## 5. Nested Scope (Lexical Scoping)

```javascript
function first() {
  const x = 100;

  function second() {
    const y = 200;
    console.log(x + y); // Can access parent scope
  }

  second();
  // console.log(y); // Error: cannot access child scope
}
```

### Block Nesting
```javascript
if (true) {
  const x = 100;

  if (x === 100) {
    const y = 200;
    console.log(x + y); // 300
  }

  // console.log(y); // Error
}
```

**Key Points:**
- Inner functions can access outer function variables
- Outer functions CANNOT access inner function variables
- Scope chain: looks up parent scopes until found
- Same applies to nested blocks

---

## 6. Function Declarations vs Expressions

### Function Declaration
```javascript
// Can call before declaration (hoisted)
console.log(addDollarSign(100));

function addDollarSign(value) {
  return '$' + value;
}
```

### Function Expression
```javascript
// Cannot call before assignment
const addPlusSign = function(value) {
  return '+' + value;
};

console.log(addPlusSign(200));
```

**Key Differences:**
- **Declaration**: Hoisted (can use before defined)
- **Expression**: Not hoisted (must define first)
- **Expression**: Can be anonymous
- **Declaration**: Always has a name

---

## 7. Arrow Functions

### Basic Syntax
```javascript
// Regular function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => {
  return a + b;
};
```

### Implicit Return
```javascript
// Single expression - no braces needed
const subtract = (a, b) => a - b;
```

### Single Parameter
```javascript
// Can omit parentheses with single param
const double = a => a * 2;
```

### Returning Objects
```javascript
// Must wrap object in parentheses
const createObj = () => ({ name: 'Brad' });
```

### Arrow Functions in Callbacks
```javascript
numbers.forEach(n => console.log(n));
```

**Key Points:**
- More concise syntax
- Implicit return for single expressions
- Different `this` binding (covered later)
- Great for callbacks and short functions

---

## 8. IIFE (Immediately Invoked Function Expression)

### Basic Syntax
```javascript
(function() {
  const user = 'John';
  console.log(user);
})();
```

### With Parameters
```javascript
(function(name) {
  console.log('Hello ' + name);
})('Shawn');
```

### Named IIFE
```javascript
(function hello() {
  console.log('Hello');
})();
```

**Key Points:**
- Runs immediately upon definition
- Creates its own scope (encapsulation)
- Prevents global namespace pollution
- Useful for initialization code
- Can only call recursively if named

---

## 9. Function Challenges - Key Examples

### Celsius Converter (Arrow Function)
```javascript
const getCelsius = f => ((f - 32) * 5) / 9;
console.log(`The temp is ${getCelsius(35)} °C`);
```

### Min/Max Function
```javascript
function minMax(arr) {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  return { min, max };
}

console.log(minMax([2, 31, 4, 5, 6]));
```

### IIFE for Area Calculation
```javascript
((length, width) => {
  const area = length * width;
  console.log(`Area is ${area}`);
})(20, 10);
```

---

## 10. Execution Context

### Two Phases

**1. Creation Phase:**
- Memory allocated for variables and functions
- Variables initialized as `undefined`
- Functions fully hoisted

**2. Execution Phase:**
- Code runs line by line
- Variables assigned actual values
- Functions executed when called

### Example
```javascript
const x = 100;
const y = 50;

function getSum(n1, n2) {
  const sum = n1 + n2;
  return sum;
}

const sum1 = getSum(x, y);
```

**What Happens:**
1. Global execution context created
2. Memory for `x`, `y`, `getSum`, `sum1`
3. Code executes, values assigned
4. Function creates new execution context when called

---

## 11. Call Stack

### How It Works
```javascript
function first() {
  console.log('first...');
  second();
}

function second() {
  console.log('second...');
  third();
}

function third() {
  console.log('third...');
}

first();
```

**Call Stack Order:**
1. `first()` pushed to stack
2. `second()` pushed to stack
3. `third()` pushed to stack
4. `third()` completes, popped off
5. `second()` completes, popped off
6. `first()` completes, popped off

**Key Points:**
- LIFO (Last In, First Out)
- Each function call creates execution context
- Stack grows with nested calls
- Stack overflow occurs with too many calls (infinite recursion)
- Use browser DevTools to visualize

---

## Quick Reference

### Scope Hierarchy
```
Global Scope
  └─ Function Scope
      └─ Block Scope
          └─ Nested Block Scope
```

### Variable Scope Quick Guide
| Keyword | Block Scope | Function Scope | Hoisted |
|---------|-------------|----------------|---------|
| `const` | Yes         | Yes            | No      |
| `let`   | Yes         | Yes            | No      |
| `var`   | No          | Yes            | Yes     |

### Function Types Summary
| Type | Syntax | Hoisted | Use Case |
|------|--------|---------|----------|
| Declaration | `function name() {}` | Yes | General purpose |
| Expression | `const name = function() {}` | No | Assign to variable |
| Arrow | `const name = () => {}` | No | Short functions, callbacks |
| IIFE | `(function() {})()` | N/A | Immediate execution |

---

## Best Practices

1. Use `const` and `let`, avoid `var`
2. Keep functions small and focused
3. Use arrow functions for callbacks
4. Prefer function declarations for main functions
5. Use descriptive function names
6. Limit global variables
7. Understand scope before debugging
8. Use IIFE for initialization code
9. Default parameters for optional args
10. Rest parameters for variable arguments
