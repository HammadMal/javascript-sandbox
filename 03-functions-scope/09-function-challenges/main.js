const getCelsius = (temp) => (temp - 32) * 5 / 9;

console.log(`The temperature is ${getCelsius(32)} \xB0C`);


//Challenge 2

const arr = [1,2,3,99,98,102];

const minmax = (arr) => {

    console.log(arr);
    console.log(Math.min(...arr), Math.max(...arr));

}
minmax(arr);

//challenge 3

(function area (length, width)  {

    let ar = length*width;

    console.log(ar);




})(2,1);