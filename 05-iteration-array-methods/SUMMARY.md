# Section 05: Iteration & Array Methods - Summary

## Overview
This section covers JavaScript loops, iteration methods, and array methods. You'll learn how to iterate over data using different loop types and work with powerful array methods for data manipulation.

---

## 01. For Loop
**Location:** [01-for-loop](01-for-loop/)

### Key Concepts
- **Syntax:** `for (initialExpression; conditionExpression; incrementExpression)`
- Basic for loop with counter variable
- Nested loops for multiplication tables
- Looping through arrays using `array.length`
- Conditional logic inside loops

### Examples
```javascript
// Basic for loop
for (let i = 0; i <= 10; i++) {
  console.log('Number ' + i);
}

// Loop through array
const names = ['Brad', 'Sam', 'Sara', 'John'];
for (let i = 0; i < names.length; i++) {
  console.log(names[i]);
}

// Nested loops
for (let i = 1; i <= 10; i++) {
  for (let j = 1; j <= 5; j++) {
    console.log(`${i} * ${j} = ${i * j}`);
  }
}
```

---

## 02. Break and Continue
**Location:** [02-break-and-continue](02-break-and-continue/)

### Key Concepts
- **`break`**: Exits the loop completely
- **`continue`**: Skips the current iteration and continues with the next one

### Examples
```javascript
// Break - stops loop at 15
for (let i = 0; i <= 20; i++) {
  if (i === 15) {
    console.log('Breaking...');
    break;
  }
  console.log(i);
}

// Continue - skips 13
for (let i = 0; i <= 20; i++) {
  if (i === 13) {
    console.log('Skipping 13...');
    continue;
  }
  console.log(i);
}
```

---

## 03. While & Do-While Loops
**Location:** [03-while-do-while](03-while-do-while/)

### Key Concepts
- **While loop**: Runs while condition is true
- **Do-while loop**: Runs at least once, then checks condition
- Nesting while loops
- Looping through arrays with while

### Examples
```javascript
// While loop
let i = 0;
while (i <= 20) {
  console.log('Number ' + i);
  i++;
}

// Do-while loop (always runs at least once)
do {
  console.log('Number ' + i);
  i++;
} while (i <= 20);

// Loop over arrays
while (i < arr.length) {
  console.log(arr[i]);
  i++;
}
```

---

## 04. FizzBuzz Challenge
**Location:** [04-fizzbuzz-challenge](04-fizzbuzz-challenge/)

### Challenge Description
Classic programming problem: Print numbers 1-100, but:
- Print "Fizz" for multiples of 3
- Print "Buzz" for multiples of 5
- Print "FizzBuzz" for multiples of both 3 and 15

### Solution Approach
```javascript
for (let i = 1; i <= 100; i++) {
  if (i % 15 === 0) {
    console.log('FizzBuzz');
  } else if (i % 3 === 0) {
    console.log('Fizz');
  } else if (i % 5 === 0) {
    console.log('Buzz');
  } else {
    console.log(i);
  }
}
```

**Note:** Check for divisibility by 15 first (most specific condition)

---

## 05. For...Of Loop
**Location:** [05-for-of-loop](05-for-of-loop/)

### Key Concepts
- Modern ES6 syntax for iterating over iterables
- Works with: arrays, strings, Maps, Sets
- Cleaner syntax than traditional for loop
- Gets the actual value (not index)

### Examples
```javascript
// Loop through arrays
const items = ['book', 'table', 'chair', 'kite'];
for (const item of items) {
  console.log(item);
}

// Loop over strings
const str = 'Hello World';
for (const letter of str) {
  console.log(letter);
}

// Loop over Maps
const map = new Map();
map.set('name', 'John');
map.set('age', 30);

for (const [key, value] of map) {
  console.log(key, value);
}

// Array of objects
const users = [{ name: 'Brad' }, { name: 'Kate' }];
for (const user of users) {
  console.log(user.name);
}
```

---

## 06. For...In Loop
**Location:** [06-for-in-loop](06-for-in-loop/)

### Key Concepts
- Used primarily for looping through object properties
- Gets the **keys/indices** (not values)
- Can be used with arrays but `for...of` is preferred

### Examples
```javascript
// Loop through objects
const colorObj = {
  color1: 'red',
  color2: 'blue',
  color3: 'orange'
};

for (const key in colorObj) {
  console.log(key, colorObj[key]);
}

// Loop through arrays (gets index)
const colorArr = ['red', 'green', 'blue'];
for (const key in colorArr) {
  console.log(colorArr[key]);
}
```

**When to use:**
- `for...in` → Objects (to get keys)
- `for...of` → Arrays (to get values)

---

## 07. forEach Method
**Location:** [07-forEach](07-forEach/)

### Key Concepts
- Array method for iterating (doesn't return a new array)
- Cleaner than traditional loops
- Takes a callback function
- Parameters: `item`, `index`, `array`
- Cannot use `break` or `continue`

### Examples
```javascript
const socials = ['Twitter', 'LinkedIn', 'Facebook'];

// Basic usage
socials.forEach(function(item) {
  console.log(item);
});

// Arrow function
socials.forEach((item) => console.log(item));

// With index and array
socials.forEach((item, index, arr) => {
  console.log(`${index} - ${item}`, arr);
});

// Named function
function logSocials(social) {
  console.log(social);
}
socials.forEach(logSocials);

// Array of objects
const socialObjs = [
  { name: 'Twitter', url: 'https://twitter.com' },
  { name: 'Facebook', url: 'https://facebook.com' }
];
socialObjs.forEach((item) => console.log(item.url));
```

---

## 08. Filter Method
**Location:** [08-filter](08-filter/)

### Key Concepts
- Creates a **new array** with elements that pass a test
- Doesn't modify the original array
- Returns array of filtered items
- Commonly used for filtering data

### Examples
```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Get even numbers
const evenNumbers = numbers.filter((number) => number % 2 === 0);

// Filter objects
const companies = [
  { name: 'Company One', category: 'Finance', start: 1981, end: 2004 },
  { name: 'Company Two', category: 'Retail', start: 1992, end: 2008 }
];

// Get retail companies
const retailCompanies = companies.filter(
  (company) => company.category === 'Retail'
);

// Multiple conditions
const earlyCompanies = companies.filter(
  (company) => company.start >= 1980 && company.end <= 2005
);

// Companies that lasted 10+ years
const longCompanies = companies.filter(
  (company) => company.end - company.start >= 10
);
```

---

## 09. Map Method
**Location:** [09-map](09-map/)

### Key Concepts
- Creates a **new array** by transforming each element
- Doesn't modify the original array
- Returns array of same length
- Great for data transformation
- Can be chained with other methods

### Examples
```javascript
const numbers = [1, 2, 3, 4, 5];

// Double all numbers
const doubledNumbers = numbers.map((number) => number * 2);

// Extract data from objects
const companies = [
  { name: 'Company One', category: 'Finance', start: 1981, end: 2004 }
];

// Get company names
const companyNames = companies.map((company) => company.name);

// Transform objects
const companyYears = companies.map((company) => ({
  name: company.name,
  length: company.end - company.start + ' years'
}));

// Chain map methods
const squareAndDouble = numbers
  .map((number) => Math.sqrt(number))
  .map((sqrt) => sqrt * 2);

// Chain filter and map
const evenDouble = numbers
  .filter((number) => number % 2 === 0)
  .map((number) => number * 2);
```

---

## 10. Reduce Method
**Location:** [10-reduce](10-reduce/)

### Key Concepts
- Reduces an array to a **single value**
- Takes accumulator and current value
- Requires an initial value (second parameter)
- Powerful for calculations, totals, aggregations

### Examples
```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Sum all numbers
const sum = numbers.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);

// Arrow function syntax
const sum2 = numbers.reduce((acc, cur) => acc + cur, 0);

// Shopping cart total
const cart = [
  { id: 1, name: 'Product 1', price: 130 },
  { id: 2, name: 'Product 2', price: 150 },
  { id: 3, name: 'Product 3', price: 200 }
];

const total = cart.reduce((acc, product) => acc + product.price, 0);
```

**Parameters:**
- `accumulator`: The accumulated result
- `currentValue`: Current element being processed
- `0`: Initial value of accumulator

---

## 11. Array Method Challenges
**Location:** [11-array-method-challenges](11-array-method-challenges/)

### Challenge 1: Filter and Map
Filter people 25 or younger, return array with name and email

```javascript
const youngPeople = people
  .filter((person) => person.age <= 25)
  .map((person) => ({
    name: person.firstName + ' ' + person.lastName,
    email: person.email
  }));
```

### Challenge 2: Filter and Reduce
Sum only positive numbers

```javascript
const numbers = [2, -30, 50, 20, -12, -9, 7];
const positiveSum = numbers
  .filter((number) => number > 0)
  .reduce((acc, cur) => acc + cur, 0);
```

### Challenge 3: Capitalize Words
Capitalize first letter of each word

```javascript
const words = ['coder', 'programmer', 'developer'];
const capitalizedWords = words.map((word) => {
  return word[0].toUpperCase() + word.slice(1);
});
```

---

## Quick Reference Comparison

| Method | Returns | Modifies Original | Use Case |
|--------|---------|------------------|----------|
| `forEach` | undefined | No | Iterate without returning |
| `filter` | New array | No | Get subset of array |
| `map` | New array | No | Transform each element |
| `reduce` | Single value | No | Aggregate/calculate |

## Loop Comparison

| Loop Type | Best For | Can Break? |
|-----------|----------|------------|
| `for` | When you need index control | Yes |
| `while` | Unknown number of iterations | Yes |
| `do...while` | Must run at least once | Yes |
| `for...of` | Iterating array values | Yes |
| `for...in` | Iterating object keys | Yes |
| `forEach` | Simple array iteration | No |

---

## Key Takeaways

1. **Traditional loops** (`for`, `while`) give you the most control
2. **`for...of`** is cleanest for iterating array values
3. **`for...in`** is best for object properties
4. **`forEach`** is great for simple iterations (no return value)
5. **`filter`** creates new array with matching elements
6. **`map`** transforms each element into new array
7. **`reduce`** aggregates array into single value
8. **Method chaining** allows combining filter, map, and reduce

---

## Practice Tips

- Start with traditional loops to understand fundamentals
- Move to array methods for cleaner, more readable code
- Use `filter` before `map` to reduce unnecessary processing
- Remember: `filter`, `map`, and `reduce` don't modify the original array
- Chain methods when performing multiple operations
- Always provide an initial value with `reduce`
