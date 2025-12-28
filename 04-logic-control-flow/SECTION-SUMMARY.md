# Section 04: Logic & Control Flow - Study Summary

## 1. If Statements
**File:** [01-if-statements/script.js](01-if-statements/script.js)

### Key Concepts
- Basic syntax: `if (condition) { ... }`
- If-else structure for binary conditions
- Comparison operators: `>=`, `<=`, `===`, `!==`, `>`, `<`
- **Block scope**: variables declared with `const`/`let` inside if blocks are scoped to that block
- Shorthand syntax (single line) - use with caution for readability

### Example
```javascript
const x = 10;
const y = 5;

if (x >= y) {
  console.log(`${x} is greater than or equal to ${y}`);
}

if (x === y) {
  console.log(`${x} is equal to ${y}`);
} else {
  console.log(`${x} is NOT equal to ${y}`);
}
```

---

## 2. Else-If & Nesting
**File:** [02-else-if-nesting/script.js](02-else-if-nesting/script.js)

### Key Concepts
- Else-if chains: `if { ... } else if { ... } else { ... }`
- Nested if statements: place if statements inside other if blocks
- Can combine with logical operators (`&&`, `||`) for complex conditions

### Example
```javascript
const hour = 14;

if (hour < 12) {
  console.log('Good Morning');

  if (hour === 6) {
    console.log('Wake Up!');
  }
} else if (hour < 18) {
  console.log('Good Afternoon');
} else {
  console.log('Good Night');

  if (hour >= 20) {
    console.log('zzzzzzzz');
  }
}
```

---

## 3. Switch Statements
**File:** [03-switches/script.js](03-switches/script.js)

### Key Concepts
- Used for multiple discrete value checks
- **Immediate value evaluation**: Match exact values (e.g., months, specific numbers)
- **Range evaluation**: Use `switch(true)` with case conditions for ranges
- Must use `break` to prevent fall-through
- `default` case for unmatched values
- Alternative to long if-else chains

### Example - Immediate Value
```javascript
switch (month) {
  case 1:
    console.log('It is January');
    break;
  case 2:
    console.log('It is February');
    break;
  default:
    console.log('It is not Jan or Feb');
}
```

### Example - Range Evaluation
```javascript
switch (true) {
  case hour < 12:
    console.log('Good Morning');
    break;
  case hour < 18:
    console.log('Good Afternoon');
    break;
  default:
    console.log('Good Night');
}
```

---

## 4. Truthy & Falsy Values
**File:** [05-truthy-falsy/script.js](05-truthy-falsy/script.js)

### Falsy Values (6 total)
```javascript
false
0
"" or '' (empty string)
null
undefined
NaN
```

### Truthy Values
Everything else that is not falsy:
```javascript
true
'0' (0 in a string)
' ' (space in a string)
'false' (false in a string)
[] (empty array)
{} (empty object)
function () {} (empty function)
```

### Important Caveats

#### Problem with `0`
`0` is falsy but might be a valid value:
```javascript
const children = 0;

// WRONG - treats 0 as no value
if (children) {
  console.log(`You have ${children} children`);
} else {
  console.log('Please enter number of children'); // This runs!
}

// CORRECT
if (!isNaN(children)) {
  console.log(`You have ${children} children`);
}
```

#### Problem with Empty Arrays
Empty arrays are truthy:
```javascript
const posts = [];

// WRONG - always true even when empty
if (posts) {
  console.log('List Posts'); // This runs!
}

// CORRECT
if (posts.length > 0) {
  console.log('List Posts');
}
```

#### Problem with Empty Objects
Empty objects are truthy:
```javascript
const user = {};

// WRONG - always true even when no properties
if (user) {
  console.log('List User'); // This runs!
}

// CORRECT
if (Object.keys(user).length > 0) {
  console.log('List User');
}
```

### Loose vs Strict Equality
```javascript
// Loose Equality (==) - allows type coercion
console.log(false == 0);           // true
console.log('' == 0);              // true
console.log(null == undefined);    // true

// Strict Equality (===) - no type coercion
console.log(false === 0);          // false
console.log('' === 0);             // false
console.log(null === undefined);   // false
```

---

## 5. Logical Operators
**File:** [06-logical-operators/script.js](06-logical-operators/script.js)

### `&&` (AND Operator)
- Returns **first falsy value** OR **last value** if all truthy
- All conditions must be true for overall true

```javascript
console.log(10 && 20);           // 20 (last value)
console.log(10 && 20 && 30);     // 30 (last value)
console.log(10 && 0 && 30);      // 0 (first falsy)
console.log(10 && '' && 0);      // '' (first falsy)

// Short-circuit evaluation
const posts = ['Post One', 'Post Two'];
posts.length > 0 && console.log(posts[0]); // Executes console.log
```

### `||` (OR Operator)
- Returns **first truthy value** OR **last value** if all falsy
- Only one condition needs to be true

```javascript
console.log(10 || 20);                    // 10 (first truthy)
console.log(0 || 20);                     // 20 (first truthy)
console.log(0 || null || '' || undefined); // undefined (last value)

// Useful for default values (old way)
const name = username || 'Guest';
```

### `??` (Nullish Coalescing Operator)
- Returns right side **only when left is `null` or `undefined`**
- Different from `||` which checks for any falsy value

```javascript
console.log(10 ?? 20);       // 10
console.log(null ?? 20);     // 20
console.log(undefined ?? 30); // 30
console.log(0 ?? 30);        // 0 (not 30!)
console.log('' ?? 30);       // '' (not 30!)
```

---

## 6. Logical Assignment Operators
**File:** [07-logical-assignment/script.js](07-logical-assignment/script.js)

Modern shorthand operators for conditional assignment.

### `||=` (Logical OR Assignment)
Assign if left side is **falsy**:

```javascript
let a = null;

// Traditional way
if (!a) {
  a = 10;
}

// Or this way
a = a || 10;

// Modern way
a ||= 10;

console.log(a); // 10
```

### `&&=` (Logical AND Assignment)
Assign if left side is **truthy**:

```javascript
let b = 10;

// Traditional way
if (b) {
  b = 20;
}

// Or this way
b = b && 20;

// Modern way
b &&= 20;

console.log(b); // 20
```

### `??=` (Nullish Coalescing Assignment)
Assign if left side is **`null` or `undefined`**:

```javascript
let c = null;

// Traditional way
if (c === null || c === undefined) {
  c = 20;
}

// Or this way
c = c ?? 20;

// Modern way
c ??= 20;

console.log(c); // 20
```

---

## 7. Ternary Operator
**File:** [08-ternary-operator/script.js](08-ternary-operator/script.js)

### Basic Syntax
```javascript
condition ? valueIfTrue : valueIfFalse
```

### Simple Example
```javascript
const age = 17;

// Using if-else
if (age >= 18) {
  console.log('You can vote!');
} else {
  console.log('You can not vote');
}

// Using ternary
age >= 18 ? console.log('You can vote!') : console.log('You can not vote');
```

### Assigning to Variables
```javascript
const canVote = age >= 18 ? true : false;
const message = age >= 18 ? 'You can vote!' : 'You can not vote';
```

### Multiple Statements (Comma Operator)
```javascript
const auth = true;

const redirect = auth
  ? (alert('Welcome to the dashboard'), '/dashboard')
  : (alert('Access Denied'), '/login');
```

### Ternary with No Else
```javascript
// Using ternary with null
auth ? console.log('Welcome') : null;

// Better - use && operator instead
auth && console.log('Welcome');
```

---

## 8. Calculator Challenge
**File:** [04-calculator-challenge/04-calculator-challenge.md](04-calculator-challenge/04-calculator-challenge.md)

### Challenge
Create a `calculator` function that takes `num1`, `num2`, and `operator` (`+`, `-`, `*`, `/`).

### Solution
```javascript
function calculator(num1, num2, operator) {
  let result;

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num1 / num2;
      break;
    default:
      result = 'Invalid operator';
  }

  return result;
}

calculator(5, 2, '+');  // 7
calculator(5, 2, '-');  // 3
calculator(5, 2, '*');  // 10
calculator(5, 2, '/');  // 2.5
calculator(5, 2, '&');  // 'Invalid operator'
```

---

## Key Takeaways

### Best Practices
1. **Always use strict equality (`===`)** to avoid type coercion bugs
2. **Be aware of truthy/falsy edge cases**:
   - `0` is falsy but might be valid
   - `[]` and `{}` are truthy even when empty
3. **Choose the right control structure**:
   - If-else: for simple binary or sequential checks
   - Switch: for multiple discrete values or `switch(true)` for ranges
   - Ternary: for simple conditional assignments
4. **Use modern operators** for cleaner code:
   - `??` instead of `||` when you want to preserve `0` and `''`
   - `||=`, `&&=`, `??=` for conditional assignments

### Common Patterns
- **Default values**: `const value = input ?? 'default'`
- **Short-circuit execution**: `condition && executeFunction()`
- **Validation**: Check `.length` for arrays, `Object.keys().length` for objects
- **Safe number checking**: `!isNaN(value)` instead of truthy check
