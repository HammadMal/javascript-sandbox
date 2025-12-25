// const arr = [1, 2, 3, 4, 5];

// arr.push(6);
// arr.reverse();
// arr.push(0);
// console.log(arr);

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [5, 6, 7, 8, 9, 10];
let arr3 = [];

arr3 = arr3.concat(arr1)
// arr3 = arr3.concat(arr2);
// arr3 = arr3.flat();
index = arr3.indexOf(5);

arr3 = arr3.splice(0,index);

arr3 = arr3.concat(arr2);


console.log(arr3); 
