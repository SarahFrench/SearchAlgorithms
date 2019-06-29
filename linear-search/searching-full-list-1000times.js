const fs = require('fs');
const moment = require('moment');
let words = fs.readFileSync( 'words.txt' , {encoding: 'UTF-8'});

let wordsList = words.split('\n');

// Linear search

let wordToFind = "hello"
let startTime = moment(new Date());
let numberOfSearches = 1000;

for (let i = 0; i < numberOfSearches; i++){
  wordsList.forEach( word => {
    if (word === wordToFind){
      return console.log("Search number " + i + " : " + word);
    }
  })
}

let endTime = moment(new Date());
let difference = endTime.diff(startTime);
console.log(startTime);
console.log(endTime);
console.log(`Searched ${numberOfSearches} times and it took ${difference} milliseconds`);
