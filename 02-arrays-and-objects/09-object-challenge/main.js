//step1

const library = [
    {
        title: "First",
        author : "Random1",
        status :  {
            own : true,
            reading : false,
            read : false
        }
    },
    {
        title: "Second",
        author : "Random2",
        status  : {
            own : true,
            reading : false,
            read : false
        }
    },

    {
        title: "Third",
        author : "Random3s",
        status : {
            own : true,
            reading : false,
            read : false
        }

    }
]

library[0].status.read = true;
library[1].status.read = true;
library[2].status.read = true;

// library[0].title = "FirstBook";

// const {title : firstBook}  = library[0];
// console.log(firstBook)

// title = "FirstBook"

const libjson = JSON.stringify(library);
console.log(libjson);



// console.log(library[0].firstBook);