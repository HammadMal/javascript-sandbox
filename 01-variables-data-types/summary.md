# JavaScript Variables & Data Types - Summary

This folder covers the fundamentals of JavaScript variables, data types, and core concepts.

## Table of Contents

1. [Console](#1-console)
2. [Comments & Shortcuts](#2-comments--shortcuts)
3. [Variables](#3-variables)
4. [Data Types](#4-data-types)
5. [Stack & Heap](#5-stack--heap)
6. [Type Conversion](#6-type-conversion)
7. [Operators](#7-operators)
8. [Type Coercion](#8-type-coercion)
9. [Strings](#9-strings)
10. [Capitalize Challenge](#10-capitalize-challenge)
11. [Numbers](#11-numbers)
12. [Math Object](#12-math-object)
13. [Number Challenge](#13-number-challenge)
14. [Dates and Times](#14-dates-and-times)
15. [Date Object Methods](#15-date-object-methods)

---

## 1. Console

The console object provides access to debugging functionality.

### Basic Console Methods

```javascript
// Basic logging
console.log(100);
console.log('Hello World');
console.log(20, 'Hello', true); // Multiple values

// Error and warning
console.error('Alert');
console.warn('Warning');

// Display objects as tables
console.table({ name: 'Brad', email: 'brad@gmail.com' });

// Grouping console commands
console.group('simple');
console.log(x);
console.error('Alert');
console.warn('Warning');
console.groupEnd();

// Styled console output
const styles = 'padding: 10px; background-color: white; color: green';
console.log('%cHello World', styles);
```

---

## 2. Comments & Shortcuts

### Comment Types

```javascript
// Single line comment

/*
Multi-line comment
Multiple lines of code can be commented
*/
```

---

## 3. Variables

Variables are containers for storing data values.

### Declaration Keywords

- `var` - Old way, function-scoped (avoid in modern code)
- `let` - Block-scoped, can be reassigned
- `const` - Block-scoped, cannot be reassigned

### Examples

```javascript
let firstName = 'John';
const lastName = 'Doe';
let age = 30;

// Re-assigning let variables
age = 31;

// Declaring without assigning
let score;
score = 1;

// const cannot be reassigned
const x = 100;
// x = 200; // Error!

// But const arrays and objects can be modified
const arr = [1, 2, 3, 4];
arr.push(5); // Valid

const person = { name: 'Brad' };
person.name = 'John'; // Valid
person.email = 'brad@gmail.com'; // Valid
```

### Naming Conventions

- Only letters, numbers, underscores, and dollar signs
- Cannot start with a number

### Multi-Word Formatting

- `camelCase` - firstName (recommended for variables)
- `snake_case` - first_name
- `PascalCase` - FirstName (for classes)
- `lowercase` - firstname

### Multiple Declarations

```javascript
let a, b, c;

const d = 10, e = 20, f = 30;
```

---

## 4. Data Types

JavaScript has two categories of data types: **Primitive** and **Reference**.

### Primitive Types

```javascript
// String
const firstName = 'Sara';

// Number
const age = 30;
const temp = 98.9;

// Boolean
const hasKids = true;

// Null
const aptNumber = null;

// Undefined
let score;
const score2 = undefined;

// Symbol
const id = Symbol('id');

// BigInt
const n = 9007199254740991n;
```

### Reference Types (Objects)

```javascript
// Array
const numbers = [1, 2, 3, 4];

// Object Literal
const person = {
  name: 'Brad',
};

// Function
function sayHello() {
  console.log('Hello');
}
```

### Checking Types

```javascript
typeof 'Hello'; // 'string'
typeof 42; // 'number'
typeof true; // 'boolean'
typeof null; // 'object' (JavaScript quirk)
typeof undefined; // 'undefined'
typeof [1, 2, 3]; // 'object'
typeof {}; // 'object'
typeof function() {}; // 'function'
```

---

## 5. Stack & Heap

Understanding memory allocation in JavaScript.

### Stack (Primitive Values)

Primitive values are stored directly in the stack. When you copy a primitive, you create a new independent value.

```javascript
const name = 'John';
const age = 30;

let newName = name;
newName = 'Jonathan';

console.log(name, newName); // 'John', 'Jonathan'
```

### Heap (Reference Values)

Reference values are stored in the heap. Variables hold references (pointers) to the actual data.

```javascript
const person = {
  name: 'Brad',
  age: 40,
};

let newPerson = person;
newPerson.name = 'Bradley';

console.log(person, newPerson);
// Both: { name: 'Bradley', age: 40 }
// They point to the same object!
```

---

## 6. Type Conversion

Explicitly converting one data type to another.

### Convert to Number

```javascript
let amount = '100';

// Different ways to convert to number
amount = parseInt(amount);
amount = +amount;
amount = Number(amount);

// Convert to decimal
amount = parseFloat('99.5');
```

### Convert to String

```javascript
let num = 100;

num = num.toString();
num = String(num);
```

### Convert to Boolean

```javascript
let value = 1;
value = Boolean(value); // true
```

### NaN (Not a Number)

```javascript
Math.sqrt(-1); // NaN
1 + NaN; // NaN
undefined + undefined; // NaN
'foo' / 3; // NaN
```

---

## 7. Operators

### Arithmetic Operators

```javascript
x = 5 + 5;  // Addition
x = 5 - 5;  // Subtraction
x = 5 * 5;  // Multiplication
x = 5 / 5;  // Division
x = 7 % 5;  // Modulus (remainder)
x = 2 ** 3; // Exponent (power)

// String concatenation
x = 'Hello' + ' ' + 'World';

// Increment/Decrement
x++;
x--;
```

### Assignment Operators

```javascript
x = 10;
x += 5;  // x = x + 5
x -= 5;  // x = x - 5
x *= 5;  // x = x * 5
x /= 5;  // x = x / 5
x %= 5;  // x = x % 5
x **= 5; // x = x ** 5
```

### Comparison Operators

```javascript
// Loose equality (value only)
2 == '2';   // true
2 != '2';   // false

// Strict equality (value and type)
2 === '2';  // false
2 !== '2';  // true

// Greater than / Less than
10 > 5;     // true
10 < 5;     // false
10 >= 5;    // true
10 <= 5;    // false
```

---

## 8. Type Coercion

Automatic type conversion by JavaScript.

### Examples

```javascript
// Coerced to string (+ with string)
x = 5 + '5'; // '55'

// Coerced to number (other operators)
x = 5 * '5'; // 25

// null is coerced to 0
x = 5 + null; // 5

// true is coerced to 1
x = 5 + true; // 6

// false is coerced to 0
x = 5 + false; // 5

// undefined in math results in NaN
x = 5 + undefined; // NaN
```

---

## 9. Strings

### String Basics

```javascript
let x;
const name = 'John';
const age = 31;

// Concatenation
x = 'Hello, my name is ' + name + ' and I am ' + age + ' years old';

// Template Literals (ES6)
x = `Hello, my name is ${name} and I am ${age} years old`;
```

### String Properties & Methods

```javascript
const s = 'Hello World';

// Length
s.length; // 11

// Access character
s[0]; // 'H'
s.charAt(0); // 'H'

// Case conversion
s.toUpperCase(); // 'HELLO WORLD'
s.toLowerCase(); // 'hello world'

// Index methods
s.indexOf('d'); // 10
s.includes('Hell'); // true

// Substring extraction
s.substring(2, 5); // 'llo'
s.substring(7); // 'orld'
s.slice(-11, -6); // 'Hello'

// Trim whitespace
'  Hello  '.trim(); // 'Hello'

// Replace
s.replace('World', 'John'); // 'Hello John'

// Split into array
s.split(''); // ['H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd']

// Get primitive value
s.valueOf();
```

---

## 10. Capitalize Challenge

**Challenge:** Capitalize the first letter of a string.

### Solutions

```javascript
const myString = 'developer';

// Solution 1
const myNewString = myString.charAt(0).toUpperCase() + myString.substring(1);

// Solution 2
const myNewString = myString[0].toUpperCase() + myString.substring(1);

// Solution 3
const myNewString = `${myString[0].toUpperCase()}${myString.slice(1)}`;

console.log(myNewString); // 'Developer'
```

---

## 11. Numbers

### Number Methods

```javascript
const num = 5;

// Convert to string
num.toString(); // '5'
num.toString().length; // 1

// Fixed decimal places
num.toFixed(2); // '5.00'

// Specified total length
num.toPrecision(3); // '5.00'

// Exponential notation
num.toExponential(2); // '5.00e+0'

// Locale-specific format
num.toLocaleString('en-US'); // '5'

// Get primitive value
num.valueOf(); // 5
```

### Number Properties

```javascript
Number.MAX_VALUE; // Largest possible number
Number.MIN_VALUE; // Smallest possible number
```

---

## 12. Math Object

The Math object provides mathematical constants and functions.

### Common Math Methods

```javascript
// Square root
Math.sqrt(9); // 3

// Absolute value
Math.abs(-5); // 5

// Rounding
Math.round(4.6); // 5
Math.ceil(4.2); // 5 (round up)
Math.floor(4.9); // 4 (round down)

// Power
Math.pow(2, 3); // 8

// Min/Max
Math.min(4, 5, 3); // 3
Math.max(4, 5, 3); // 5

// Random numbers
Math.random(); // Random decimal between 0 and 1

// Random integer between 1 and 100
Math.floor(Math.random() * 100 + 1);
```

---

## 13. Number Challenge

**Challenge:** Create random numbers and perform arithmetic operations.

### Solution

```javascript
// Random number between 1 and 100
const x = Math.floor(Math.random() * 100) + 1;

// Random number between 1 and 50
const y = Math.floor(Math.random() * 50) + 1;

// Arithmetic operations
const sum = x + y;
const difference = x - y;
const product = x * y;
const quotient = x / y;
const remainder = x % y;

// Output with template literals
console.log(`${x} + ${y} = ${sum}`);
console.log(`${x} - ${y} = ${difference}`);
console.log(`${x} * ${y} = ${product}`);
console.log(`${x} / ${y} = ${quotient}`);
console.log(`${x} % ${y} = ${remainder}`);
```

---

## 14. Dates and Times

### Creating Dates

```javascript
// Current date and time
let d = new Date();

// Specific date (month is 0-based!)
d = new Date(2021, 0, 10, 12, 30, 0); // Jan 10, 2021

// From string
d = new Date('2021-07-10T12:30:00');
d = new Date('07/10/2021 12:30:00');
d = new Date('2022-07-10');

// From timestamp
d = new Date(1666962049745);
```

### Timestamps

```javascript
// Current timestamp
Date.now(); // Milliseconds since Jan 1, 1970

// Get timestamp from date
d.getTime();
d.valueOf();

// Convert to seconds
Math.floor(Date.now() / 1000);
```

---

## 15. Date Object Methods

### Getter Methods

```javascript
let d = new Date();

d.toString();        // Full date string
d.getTime();         // Timestamp in milliseconds
d.getFullYear();     // Year (e.g., 2023)
d.getMonth();        // Month (0-11)
d.getMonth() + 1;    // Month (1-12)
d.getDate();         // Day of month (1-31)
d.getDay();          // Day of week (0-6, 0 = Sunday)
d.getHours();        // Hours (0-23)
d.getMinutes();      // Minutes (0-59)
d.getSeconds();      // Seconds (0-59)
d.getMilliseconds(); // Milliseconds (0-999)
```

### Formatting Dates

```javascript
// Manual formatting
`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

// Intl.DateTimeFormat API (locale-specific)
Intl.DateTimeFormat('en-US').format(d);
Intl.DateTimeFormat('en-GB').format(d);
Intl.DateTimeFormat('default', { month: 'long' }).format(d);

// toLocaleString
d.toLocaleString('default', { month: 'short' });

d.toLocaleString('default', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZone: 'America/New_York',
});
```

---

## Key Takeaways

1. **Variables:** Use `const` by default, `let` when you need to reassign, avoid `var`
2. **Primitive vs Reference:** Primitives are copied by value, objects are copied by reference
3. **Type Conversion:** Use explicit conversion methods to avoid bugs
4. **Type Coercion:** Be aware of automatic type conversion, especially with the `+` operator
5. **Strings:** Template literals are modern and cleaner than concatenation
6. **Numbers:** Use `Math` methods for calculations and rounding
7. **Dates:** Month is 0-based (0 = January, 11 = December)
8. **Strict Equality:** Always prefer `===` over `==` to avoid type coercion issues

---

## Additional Resources

- [MDN: typeof null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null)
- [ECMA: Function Object Type](https://262.ecma-international.org/5.1/#sec-11.4.3)
- [JavaScript Date Object Quirks](https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off)
