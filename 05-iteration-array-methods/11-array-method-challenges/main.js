const people = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@gmail.com',
    phone: '111-111-1111',
    age: 30,
  },
  {
    firstName: 'Jane',
    lastName: 'Poe',
    email: 'jane@gmail.com',
    phone: '222-222-2222',
    age: 25,
  },
  {
    firstName: 'Bob',
    lastName: 'Foe',
    email: 'bob@gmail.com',
    phone: '333-333-3333',
    age: 45,
  },
  {
    firstName: 'Sara',
    lastName: 'Soe',
    email: 'Sara@gmail.com',
    phone: '444-444-4444',
    age: 19,
  },
  {
    firstName: 'Jose',
    lastName: 'Koe',
    email: 'jose@gmail.com',
    phone: '555-555-5555',
    age: 23,
  },
];

const youngPeople = people.filter((object) => object.age <=25).map(object => ({
    name : object.firstName + " " + object.lastName,
    email : object.email,
}));
console.log(youngPeople);

const numbers = [2, -30, 50, 20, -12, -9, 7];

// console.log(positiveSum); // 79

const positiveSum = (numbers) => {
    let sum=0;

    for ( let i =0; i<numbers.length; i++){
        if (numbers[i] > 0){
            sum = sum + numbers[i];
        }
    }
    return sum;
}

console.log(positiveSum(numbers));


const words = ['coder', 'programmer', 'developer'];


const capitalizedWords = words.map((word) => word[0].toUpperCase() + word.slice(1, word.length));
console.log(capitalizedWords); 

