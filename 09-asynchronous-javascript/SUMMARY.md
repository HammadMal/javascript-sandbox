# Asynchronous JavaScript - Complete Summary

## Table of Contents
1. [Introduction to Asynchronous Programming](#introduction)
2. [setTimeout & clearTimeout](#1-settimeout--cleartimeout)
3. [setInterval & clearInterval](#2-setinterval--clearinterval)
4. [Callbacks](#3-callbacks)
5. [AJAX with XMLHttpRequest](#4-ajax-with-xmlhttprequest)
6. [Practical Challenge - Joke Generator](#5-practical-challenge---joke-generator)
7. [Callback Hell](#6-callback-hell)
8. [Promises](#7-promises)
9. [Callback to Promise Conversion](#8-callback-to-promise-conversion)
10. [Promise Chaining](#9-promise-chaining)
11. [Promises vs Callback Hell](#10-promises-vs-callback-hell)
12. [Promise.all()](#11-promiseall)
13. [Quick Reference Guide](#quick-reference-guide)

---

## Introduction

**Asynchronous Programming** allows JavaScript to perform long-running operations without blocking the main thread. This is crucial for:
- Making HTTP requests
- Reading files
- Timers and delays
- User interactions
- Database operations

JavaScript is **single-threaded** but uses the **Event Loop** to handle async operations efficiently.

---

## 1. setTimeout & clearTimeout

### What is setTimeout?
`setTimeout()` executes a callback function after a specified delay (in milliseconds).

### Syntax
```javascript
setTimeout(callback, delayInMs, param1, param2, ...)
```

### Examples

#### Basic Usage with Anonymous Function
```javascript
setTimeout(function () {
  console.log('Hello from callback');
}, 2000); // Executes after 2 seconds
```

#### Using Named Functions
```javascript
setTimeout(changeText, 3000);

function changeText() {
  document.querySelector('h1').textContent = 'Hello from callback';
}
```

### clearTimeout
Cancel a scheduled timeout before it executes.

```javascript
const timerId = setTimeout(changeText, 3000);

document.querySelector('#cancel').addEventListener('click', () => {
  clearTimeout(timerId);
  console.log('Timer Cancelled');
});
```

### Key Points
- Returns a unique timer ID
- Executes only once (not repeating)
- Minimum delay is ~4ms in browsers
- Delay is not guaranteed (depends on call stack)
- Use `clearTimeout()` to cancel pending timeouts

### Use Cases
- Delayed notifications
- Debouncing user input
- Automatic logout after inactivity
- Delayed UI updates

---

## 2. setInterval & clearInterval

### What is setInterval?
`setInterval()` repeatedly executes a callback function at specified intervals.

### Syntax
```javascript
setInterval(callback, intervalInMs, param1, param2, ...)
```

### Examples

#### Basic Interval with Parameters
```javascript
const intervalID = setInterval(myCallback, 1000, 'Hello');

function myCallback(a) {
  console.log(a, Date.now());
}
```

#### Random Color Changer
```javascript
let intervalID;

function startChange() {
  if (!intervalID) {
    intervalID = setInterval(changeRandomColor, 1000);
  }
}

function changeRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  document.body.style.backgroundColor = `#${randomColor}`;
}

function stopChange() {
  clearInterval(intervalID);
}

document.getElementById('start').addEventListener('click', startChange);
document.getElementById('stop').addEventListener('click', stopChange);
```

### Key Points
- Returns an interval ID
- Executes repeatedly until cleared
- Check if interval exists before creating new ones (prevents duplicates)
- Always store the interval ID for later cleanup
- Use `clearInterval()` to stop execution

### Use Cases
- Live clocks and timers
- Real-time data polling
- Animations and transitions
- Auto-refresh content
- Progress bars

### setTimeout vs setInterval

| Feature | setTimeout | setInterval |
|---------|-----------|-------------|
| Execution | Once | Repeated |
| Use Case | Delayed action | Periodic updates |
| Cancel Method | clearTimeout() | clearInterval() |

---

## 3. Callbacks

### What is a Callback?
A **callback** is a function passed as an argument to another function, to be executed after an asynchronous operation completes.

### Why Callbacks?
JavaScript executes code line by line. Without callbacks, fast operations might complete before slow ones, causing timing issues.

### Example Problem (Without Callback)
```javascript
const posts = [
  { title: 'Post One', body: 'This is post one' },
  { title: 'Post Two', body: 'This is post two' },
];

function createPost(post) {
  setTimeout(() => {
    posts.push(post);
  }, 2000);
}

function getPosts() {
  setTimeout(() => {
    posts.forEach(function (post) {
      const div = document.createElement('div');
      div.innerHTML = `<strong>${post.title}</strong> - ${post.body}`;
      document.querySelector('#posts').appendChild(div);
    });
  }, 1000);
}

createPost({ title: 'Post Three', body: 'This is post' });
getPosts(); // Won't show Post Three! getPosts runs before createPost finishes
```

### Solution (With Callback)
```javascript
function createPost(post, cb) {
  setTimeout(() => {
    posts.push(post);
    cb(); // Execute callback after post is created
  }, 2000);
}

createPost({ title: 'Post Three', body: 'This is post' }, getPosts);
// Now getPosts executes AFTER createPost completes
```

### Key Points
- Ensures proper execution order
- Handles asynchronous timing issues
- Foundation for understanding Promises
- Can lead to "callback hell" when nested

### Common Callback Patterns
```javascript
// Event listeners
button.addEventListener('click', callback);

// Array methods
array.forEach(callback);
array.map(callback);
array.filter(callback);

// Async operations
setTimeout(callback, 1000);
fs.readFile('file.txt', callback);
```

---

## 4. AJAX with XMLHttpRequest

### What is AJAX?
**AJAX** (Asynchronous JavaScript And XML) allows web pages to update asynchronously by exchanging data with a server without reloading the page.

### XMLHttpRequest (XHR)
The traditional way to make HTTP requests in JavaScript.

### XHR Lifecycle

#### readyState Values
| Value | State | Description |
|-------|-------|-------------|
| 0 | UNSENT | Request not initialized |
| 1 | OPENED | Server connection established |
| 2 | HEADERS_RECEIVED | Request received |
| 3 | LOADING | Processing request |
| 4 | DONE | Request finished, response ready |

### Basic XHR Example
```javascript
const xhr = new XMLHttpRequest();

// 1. Specify method and endpoint/URL
xhr.open('GET', 'https://api.github.com/users/bradtraversy/repos');

// 2. Set up event handler
xhr.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    const data = JSON.parse(this.responseText);

    data.forEach((repo) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${repo.name}</strong> - ${repo.description}`;
      document.querySelector('#results').appendChild(li);
    });
  }
};

// 3. Send request
xhr.send();
```

### Loading Local JSON
```javascript
xhr.open('GET', './movies.json');
```

### HTTP Status Codes
- **200**: OK - Success
- **404**: Not Found
- **500**: Internal Server Error
- **403**: Forbidden

### Key Points
- Create XHR object: `new XMLHttpRequest()`
- Open connection: `xhr.open(method, url)`
- Handle response: `xhr.onreadystatechange`
- Send request: `xhr.send()`
- Always check `readyState === 4` and `status === 200`
- Parse JSON with `JSON.parse(xhr.responseText)`

### XHR Properties
```javascript
xhr.readyState    // Current state (0-4)
xhr.status        // HTTP status code (200, 404, etc.)
xhr.statusText    // Status text ('OK', 'Not Found')
xhr.responseText  // Response as string
xhr.responseXML   // Response as XML document
```

---

## 5. Practical Challenge - Joke Generator

### Project: Chuck Norris Joke Generator
A real-world application using XHR to fetch jokes from an API.

### Complete Implementation
```javascript
const jokeEl = document.getElementById('joke');
const jokeBtn = document.getElementById('joke-btn');
jokeBtn.addEventListener('click', generateJoke);

function generateJoke() {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://api.chucknorris.io/jokes/random');

  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        jokeEl.innerHTML = JSON.parse(this.responseText).value;
      } else {
        jokeEl.innerHTML = 'Something went wrong (Not Funny)';
      }
    }
  };

  xhr.send();
}

// Load joke on page load
document.addEventListener('DOMContentLoaded', generateJoke);
```

### Key Features
- Button click event listener
- Error handling with status checks
- DOM manipulation with fetched data
- Initial load with `DOMContentLoaded`
- User feedback for errors

### What You Learned
- API integration
- Error handling
- Event-driven programming
- Practical DOM updates
- User experience considerations

---

## 6. Callback Hell

### What is Callback Hell?
**Callback Hell** (or "Pyramid of Doom") occurs when callbacks are nested inside callbacks, making code hard to read and maintain.

### The Problem
```javascript
function getData(endpoint, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', endpoint);

  xhr.onreadystatechange = function () {
    if ((this.readyState === 4) & (this.status === 200)) {
      cb(JSON.parse(this.responseText));
    }
  };

  setTimeout(() => {
    xhr.send();
  }, Math.floor(Math.random() * 3000) + 1000);
}

// CALLBACK HELL - Hard to read!
getData('./movies.json', (data) => {
  console.log(data);
  getData('./actors.json', (data) => {
    console.log(data);
    getData('./directors.json', (data) => {
      console.log(data);
    });
  });
});
```

### Issues with Callback Hell
1. **Readability**: Hard to follow the logic flow
2. **Maintainability**: Difficult to modify or debug
3. **Error Handling**: Complex error propagation
4. **Code Structure**: Deep nesting creates "pyramid" shape
5. **Scalability**: Adding more operations becomes messy

### Visual Structure
```
getData(url1, (data) => {          // Level 1
  getData(url2, (data) => {        // Level 2
    getData(url3, (data) => {      // Level 3
      getData(url4, (data) => {    // Level 4
        // Getting worse!
      });
    });
  });
});
```

### Solution Preview
This problem is solved with **Promises** and **async/await** (covered in later sections).

---

## 7. Promises

### What is a Promise?
A **Promise** is an object representing the eventual completion or failure of an asynchronous operation.

### Promise States
1. **Pending**: Initial state, operation ongoing
2. **Fulfilled**: Operation completed successfully (resolved)
3. **Rejected**: Operation failed (rejected)

### Creating a Promise
```javascript
const promise = new Promise((resolve, reject) => {
  // Do some async task
  setTimeout(() => {
    console.log('Async task complete');
    resolve(); // Mark as fulfilled
  }, 1000);
});
```

### Consuming a Promise
```javascript
promise.then(() => {
  console.log('Promise consumed..');
});
```

### Promise with Data
```javascript
const getUser = new Promise((resolve, reject) => {
  setTimeout(() => {
    let error = false;

    if (!error) {
      resolve({ name: 'John', age: 30 }); // Pass data
    } else {
      reject('Error: Something went wrong'); // Pass error
    }
  }, 1000);
});
```

### Complete Promise Handling
```javascript
getUser
  .then((user) => console.log(user))           // Handle success
  .catch((error) => console.log(error))        // Handle error
  .finally(() => console.log('Promise done')); // Always runs
```

### Promise Methods

#### .then(onFulfilled)
Handles successful resolution. Returns a new promise.

#### .catch(onRejected)
Handles rejection (errors). Returns a new promise.

#### .finally(onFinally)
Executes regardless of outcome. Used for cleanup.

### Key Points
- Promises are **non-blocking** (code continues executing)
- More readable than callbacks
- Better error handling with `.catch()`
- Can be chained for sequential operations
- Modern replacement for callback-based async code

### Promise vs Callbacks

| Feature | Callbacks | Promises |
|---------|-----------|----------|
| Syntax | Nested | Chained |
| Error Handling | Error-first callbacks | .catch() |
| Readability | Poor (pyramid) | Better (flat) |
| Composition | Difficult | Easy |

### Example: Synchronous vs Asynchronous
```javascript
console.log('Start'); // 1st

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('Async task'); // 3rd
    resolve();
  }, 1000);
});

console.log('End'); // 2nd (doesn't wait for promise!)

// Output:
// Start
// End
// Async task (after 1 second)
```

---

## 8. Callback to Promise Conversion

### Refactoring Strategy
Convert callback-based async functions to return Promises for cleaner code.

### Before: Callback Approach
```javascript
const posts = [
  { title: 'Post One', body: 'This is post one' },
  { title: 'Post Two', body: 'This is post two' },
];

function createPost(post, callback) {
  setTimeout(() => {
    posts.push(post);
    callback();
  }, 2000);
}

function getPosts() {
  setTimeout(() => {
    posts.forEach(function (post) {
      const div = document.createElement('div');
      div.innerHTML = `<strong>${post.title}</strong> - ${post.body}`;
      document.querySelector('#posts').appendChild(div);
    });
  }, 1000);
}

// Using callbacks
createPost({ title: 'Post Three', body: 'This is post' }, getPosts);
```

### After: Promise Approach
```javascript
function createPost(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let error = false;

      if (!error) {
        posts.push(post);
        resolve(); // Success
      } else {
        reject('Something went wrong'); // Failure
      }
    }, 2000);
  });
}

function showError(error) {
  const h3 = document.createElement('h3');
  h3.innerHTML = `<strong>${error}</strong>`;
  document.getElementById('posts').appendChild(h3);
}

// Using promises - much cleaner!
createPost({ title: 'Post Three', body: 'This is post' })
  .then(() => {
    getPosts();
  })
  .catch(showError);
```

### Conversion Steps
1. Remove callback parameter
2. Return `new Promise((resolve, reject) => {...})`
3. Call `resolve(data)` on success
4. Call `reject(error)` on failure
5. Use `.then()` and `.catch()` to consume

### Benefits of Conversion
- Cleaner error handling
- Better code organization
- Easier to chain operations
- Industry standard approach
- Preparation for async/await

---

## 9. Promise Chaining

### What is Promise Chaining?
Linking multiple `.then()` calls to perform sequential asynchronous operations.

### Basic Chaining
```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    let error = false;

    if (!error) {
      resolve({ name: 'John', age: 30 });
    } else {
      reject('Error: Something went wrong');
    }
  }, 1000);
});

promise
  .then((user) => {
    console.log(user); // { name: 'John', age: 30 }
    return user.name;  // Return value for next .then()
  })
  .then((name) => {
    console.log(name); // 'John'
    return name.length; // Return value for next .then()
  })
  .then((nameLength) => {
    console.log(nameLength); // 4
  })
  .catch((error) => {
    console.log(error);
  });
```

### Key Concept: Return Values
**Whatever you return from a `.then()` is passed to the next `.then()` as an argument.**

```javascript
promise
  .then((data) => {
    return processData(data); // This value goes to next .then()
  })
  .then((processedData) => {
    return validateData(processedData); // This value goes to next .then()
  })
  .then((validatedData) => {
    console.log(validatedData);
  });
```

### Error Handling in Chains
Errors skip to the nearest `.catch()`:

```javascript
promise
  .then((user) => {
    console.log(user);
    return user.name;
  })
  .then((name) => {
    console.log(name);
    return name.length;
  })
  .then((nameLength) => {
    console.log(nameLength);
  })
  .catch((error) => {
    console.log(error); // Catches ANY error in the chain
    return 123; // Can return value from catch
  })
  .then((x) => {
    console.log('This will run no matter what', x); // Continues after catch
  });
```

### Chain Behavior
1. If any `.then()` throws error → jumps to `.catch()`
2. Can continue chain after `.catch()` (error recovery)
3. Each `.then()` returns a new Promise
4. Can return Promises from `.then()` for nested async operations

### Practical Example: Sequential API Calls
Instead of callback hell, use promise chaining:

```javascript
fetchUser(userId)
  .then((user) => {
    console.log('User:', user);
    return fetchPosts(user.id); // Return promise
  })
  .then((posts) => {
    console.log('Posts:', posts);
    return fetchComments(posts[0].id); // Return promise
  })
  .then((comments) => {
    console.log('Comments:', comments);
  })
  .catch((error) => {
    console.log('Error:', error);
  });
```

### Rules for Promise Chaining
1. Always return values from `.then()` to pass to next
2. Return promises for async operations
3. Use one `.catch()` at the end for all errors
4. Each `.then()` should do one thing (single responsibility)

---

## 10. Promises vs Callback Hell

### Direct Comparison
Refactoring the callback hell example using Promises.

### Callback Hell Version
```javascript
function getData(endpoint, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', endpoint);

  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        cb(JSON.parse(this.responseText));
      }
    }
  };

  setTimeout(() => {
    xhr.send();
  }, Math.floor(Math.random() * 3000) + 1000);
}

// Nested callbacks - hard to read
getData('./movies.json', (data) => {
  console.log(data);
  getData('./actors.json', (data) => {
    console.log(data);
    getData('./directors.json', (data) => {
      console.log(data);
    });
  });
});
```

### Promise Version
```javascript
function getData(endpoint) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', endpoint);

    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject('Something went wrong');
        }
      }
    };

    setTimeout(() => {
      xhr.send();
    }, Math.floor(Math.random() * 3000) + 1000);
  });
}

// Flat promise chain - easy to read!
getData('./movies.json')
  .then((movies) => {
    console.log(movies);
    return getData('./actors.json'); // Return next promise
  })
  .then((actors) => {
    console.log(actors);
    return getData('./directors.json'); // Return next promise
  })
  .then((directors) => {
    console.log(directors);
  })
  .catch((error) => console.log(error)); // Single error handler
```

### Key Improvements

#### 1. Code Structure
**Callbacks**: Nested, pyramid-shaped
**Promises**: Flat, linear

#### 2. Error Handling
**Callbacks**: Need error handling at each level
**Promises**: Single `.catch()` handles all errors

#### 3. Readability
**Callbacks**: Hard to follow logic flow
**Promises**: Clear sequential flow

#### 4. Maintainability
**Callbacks**: Difficult to modify
**Promises**: Easy to add/remove steps

### Visual Comparison

#### Callback Hell Structure
```
getData(url1, (data1) => {
  // Do something
  getData(url2, (data2) => {
    // Do something
    getData(url3, (data3) => {
      // Do something
      getData(url4, (data4) => {
        // Getting deeper...
      });
    });
  });
});
```

#### Promise Chain Structure
```
getData(url1)
  .then((data1) => {
    // Do something
    return getData(url2);
  })
  .then((data2) => {
    // Do something
    return getData(url3);
  })
  .then((data3) => {
    // Do something
    return getData(url4);
  })
  .then((data4) => {
    // Easy to extend!
  })
  .catch(handleError);
```

### Why Promises Win
1. **Flat structure** - no nesting
2. **Centralized error handling** - one catch
3. **Easier to debug** - clear stack traces
4. **Better composition** - easy to combine
5. **Industry standard** - modern JavaScript

---

## 11. Promise.all()

### What is Promise.all()?
`Promise.all()` executes multiple promises in **parallel** and waits for all to complete.

### Syntax
```javascript
Promise.all([promise1, promise2, promise3])
  .then((results) => {
    // results is an array of all promise results
  })
  .catch((error) => {
    // If ANY promise fails
  });
```

### Complete Example
```javascript
function getData(endpoint) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', endpoint);

    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject('Something went wrong');
        }
      }
    };

    setTimeout(() => {
      xhr.send();
    }, Math.floor(Math.random() * 3000) + 1000);
  });
}

// Create promise instances
const moviesPromise = getData('./movies.json');
const actorsPromise = getData('./actors.json');
const directorsPromise = getData('./directors.json');

const dummyPromise = new Promise((resolve, reject) => {
  resolve('Hello World');
});

// Execute all promises in parallel
Promise.all([moviesPromise, actorsPromise, directorsPromise, dummyPromise])
  .then((data) => {
    // Returns an array of results in same order
    console.log(data);
    // data[0] = movies
    // data[1] = actors
    // data[2] = directors
    // data[3] = 'Hello World'
  })
  .catch((error) => console.log(error));
```

### How It Works
1. Takes array of promises as input
2. Executes all promises simultaneously
3. Waits for ALL to complete
4. Returns array of results in original order
5. If ANY promise fails, entire operation fails

### Promise.all() Behavior

#### Success Scenario
All promises resolve → `.then()` receives array of all results

```javascript
Promise.all([promise1, promise2, promise3])
  .then(([result1, result2, result3]) => {
    // All succeeded!
  });
```

#### Failure Scenario
ANY promise rejects → `.catch()` receives first error

```javascript
Promise.all([promise1, promise2, promise3])
  .catch((error) => {
    // One or more failed
  });
```

### Destructuring Results
```javascript
Promise.all([getMovies(), getActors(), getDirectors()])
  .then(([movies, actors, directors]) => {
    console.log('Movies:', movies);
    console.log('Actors:', actors);
    console.log('Directors:', directors);
  });
```

### Promise.all() vs Sequential Promises

#### Sequential (Slow)
```javascript
getData('./movies.json')
  .then((movies) => {
    return getData('./actors.json');
  })
  .then((actors) => {
    return getData('./directors.json');
  })
  .then((directors) => {
    // Total time: 3 + 2 + 4 = 9 seconds
  });
```

#### Parallel (Fast)
```javascript
Promise.all([
  getData('./movies.json'),    // 3 seconds
  getData('./actors.json'),    // 2 seconds
  getData('./directors.json')  // 4 seconds
])
  .then(([movies, actors, directors]) => {
    // Total time: max(3, 2, 4) = 4 seconds
  });
```

### When to Use Promise.all()
- Multiple **independent** API calls
- Loading multiple resources simultaneously
- Batch operations
- When you need all results before proceeding
- Performance optimization (parallel > sequential)

### When NOT to Use Promise.all()
- When promises depend on each other (use chaining)
- When you want to continue even if some fail (use `Promise.allSettled()`)
- When you only need the first result (use `Promise.race()`)

### Other Promise Methods

#### Promise.allSettled()
Waits for all promises, never rejects
```javascript
Promise.allSettled([promise1, promise2, promise3])
  .then((results) => {
    // results[i] = { status: 'fulfilled', value: ... }
    // or { status: 'rejected', reason: ... }
  });
```

#### Promise.race()
Returns first promise to settle (resolve or reject)
```javascript
Promise.race([promise1, promise2, promise3])
  .then((firstResult) => {
    // Fastest promise wins
  });
```

#### Promise.any()
Returns first promise to resolve (ignores rejections)
```javascript
Promise.any([promise1, promise2, promise3])
  .then((firstSuccess) => {
    // First successful result
  });
```

---

## Quick Reference Guide

### Async Patterns Evolution

```
Callbacks → Promises → Async/Await
```

### When to Use What

| Use Case | Best Approach |
|----------|---------------|
| Simple delay | `setTimeout()` |
| Repeated action | `setInterval()` |
| Single async operation | Promise |
| Sequential dependent operations | Promise chaining |
| Parallel independent operations | `Promise.all()` |
| HTTP requests | Fetch API (Promises) |

### Promise Cheat Sheet

#### Creating a Promise
```javascript
const promise = new Promise((resolve, reject) => {
  if (success) {
    resolve(data);
  } else {
    reject(error);
  }
});
```

#### Consuming a Promise
```javascript
promise
  .then(data => { /* handle success */ })
  .catch(error => { /* handle error */ })
  .finally(() => { /* cleanup */ });
```

#### Chaining Promises
```javascript
promise
  .then(result1 => {
    return nextPromise(result1);
  })
  .then(result2 => {
    return anotherPromise(result2);
  })
  .catch(error => {
    // Handles all errors
  });
```

#### Multiple Promises
```javascript
Promise.all([p1, p2, p3])        // All must succeed
Promise.allSettled([p1, p2, p3]) // Wait for all (never fails)
Promise.race([p1, p2, p3])       // First to finish
Promise.any([p1, p2, p3])        // First to succeed
```

### Common Patterns

#### API Request Pattern
```javascript
function fetchData(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject(`Error: ${this.status}`);
        }
      }
    };

    xhr.send();
  });
}

fetchData('/api/users')
  .then(users => console.log(users))
  .catch(error => console.error(error));
```

#### Timeout Pattern
```javascript
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(2000).then(() => console.log('After 2 seconds'));
```

#### Retry Pattern
```javascript
function retry(fn, retries = 3) {
  return fn().catch(error => {
    if (retries > 0) {
      return retry(fn, retries - 1);
    }
    throw error;
  });
}
```

### Error Handling Best Practices

#### Always Handle Errors
```javascript
// ❌ Bad - unhandled rejection
promise.then(data => console.log(data));

// ✅ Good - errors handled
promise
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

#### Centralized Error Handling
```javascript
promise1
  .then(result1 => promise2(result1))
  .then(result2 => promise3(result2))
  .then(result3 => promise4(result3))
  .catch(error => {
    // One catch for entire chain
    console.error('Error in chain:', error);
  });
```

### Performance Tips

1. **Use parallel operations when possible**
   ```javascript
   // Slow (sequential)
   const data1 = await fetch(url1);
   const data2 = await fetch(url2);

   // Fast (parallel)
   const [data1, data2] = await Promise.all([
     fetch(url1),
     fetch(url2)
   ]);
   ```

2. **Cancel unnecessary operations**
   ```javascript
   const timerId = setTimeout(fn, 1000);
   clearTimeout(timerId); // Cancel if needed
   ```

3. **Clean up intervals**
   ```javascript
   const intervalId = setInterval(fn, 1000);
   clearInterval(intervalId); // Always clean up
   ```

### Common Mistakes to Avoid

#### 1. Forgetting to Return in Chains
```javascript
// ❌ Wrong - doesn't wait for promise
promise1
  .then(() => {
    promise2(); // Missing return!
  })
  .then(() => {
    // Runs immediately, doesn't wait for promise2
  });

// ✅ Correct
promise1
  .then(() => {
    return promise2(); // Returns promise
  })
  .then(() => {
    // Waits for promise2
  });
```

#### 2. Creating Callback Hell with Promises
```javascript
// ❌ Wrong - nested promises
promise1.then(() => {
  promise2.then(() => {
    promise3.then(() => {
      // Still callback hell!
    });
  });
});

// ✅ Correct - flat chain
promise1
  .then(() => promise2)
  .then(() => promise3)
  .then(() => { /* Done */ });
```

#### 3. Not Handling Errors
```javascript
// ❌ Wrong - no error handling
getData()
  .then(data => processData(data))
  .then(result => showResult(result));

// ✅ Correct - error handled
getData()
  .then(data => processData(data))
  .then(result => showResult(result))
  .catch(error => handleError(error));
```

---

## Summary

### Key Takeaways

1. **Asynchronous JavaScript** is essential for non-blocking operations
2. **setTimeout/setInterval** for timing and delays
3. **Callbacks** ensure proper execution order but can lead to callback hell
4. **XMLHttpRequest** is the traditional way to make HTTP requests
5. **Promises** provide cleaner async code with better error handling
6. **Promise chaining** creates readable sequential operations
7. **Promise.all()** executes multiple promises in parallel efficiently

### Evolution of Async Code

```javascript
// Level 1: Callbacks
getData(url, (data) => {
  processData(data, (result) => {
    // Callback hell
  });
});

// Level 2: Promises
getData(url)
  .then(data => processData(data))
  .then(result => console.log(result))
  .catch(error => console.error(error));

// Level 3: Async/Await (not covered yet)
async function fetchData() {
  try {
    const data = await getData(url);
    const result = await processData(data);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
```

### What's Next?

After mastering these concepts, you should learn:
- **Fetch API** - Modern replacement for XMLHttpRequest
- **Async/Await** - Syntactic sugar for Promises
- **Error handling strategies** - Try/catch with async/await
- **Promise combinators** - Advanced Promise methods
- **Observables** - For reactive programming (RxJS)

---

## Practice Exercises

### Exercise 1: Create Your Own Promise
Create a promise that simulates fetching user data and resolves after 2 seconds.

### Exercise 2: Promise Chain
Chain three promises that simulate: login → fetch profile → fetch posts

### Exercise 3: Promise.all()
Fetch data from 3 different endpoints simultaneously and display when all complete.

### Exercise 4: Error Handling
Create a promise chain with proper error handling at each step.

### Exercise 5: Convert Callback to Promise
Take a callback-based function and convert it to return a Promise.

---

## Additional Resources

- MDN Web Docs: Promises
- JavaScript.info: Async programming
- You Don't Know JS: Async & Performance
- Web APIs: XMLHttpRequest vs Fetch

---

**End of Summary** | Last Updated: 2026-01-11
