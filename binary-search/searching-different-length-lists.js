const fs = require('fs');
const moment = require('moment');
const plotly = require('plotly')('SarahFrench', 'c43cb3Q3gvNd0eqsXz3e');
const present = require('present');

//Getting list of words
let words = fs.readFileSync( 'words.txt' , {encoding: 'UTF-8'});
let wordsList = words.split('\n');

// Making lists of different lengths
let n = wordsList
let n2 = wordsList.concat(wordsList)
let n3 = n2.concat(n2)
let n4 = n3.concat(n3)
let n5 = n4.concat(n4)
let n6 = n5.concat(n5)
let n7 = n6.concat(n6)

let listsToSearch = [n, n2, n3, n4, n5, n6, n7]
let listsLengths = [];
let durations = [];
let wordToFind = "zzzzzsarah"

//Adding unique string to end of each list
listsToSearch.forEach(list => {
  list.push(wordToFind);
  listsLengths.push(list.length)
})

//Binary Search
function binarySearch(wordsList, wordToFind){
  let midpoint = Math.floor(wordsList.length / 2);
  console.log("Midpoint = " + wordsList[midpoint])
  if (wordsList.length === 1 && wordsList[midpoint].toLowerCase() != wordToFind) {
    console.log("NOT FOUND");
    return undefined;
  }
  if (wordsList[midpoint].toLowerCase() === wordToFind){
    console.log("FOUND");
    console.log(wordsList[midpoint]);
    endTime = process.hrtime()[1]
    return endTime;
  } else if (wordsList[midpoint].toLowerCase() < wordToFind) {
    wordsList = wordsList.slice(midpoint, wordsList.length);
    binarySearch(wordsList, wordToFind);
  } else {
    wordsList = wordsList.slice(0,midpoint);
    binarySearch(wordsList, wordToFind);
  }
}

// listsToSearch.forEach(list =>{
//   let startTime = present()
//   binarySearch(wordsList, wordToFind, startTime)
//   let endTime = present()
//   let seconds = endTime - startTime;
//   durations.push(seconds);
// })
let endTime = 0;

let startTime1 = process.hrtime()[1]
console.log(startTime1);
endTime = binarySearch(n, wordToFind)
console.log(endTime);
let nanoseconds = endTime - startTime1;
let microseconds = nanoseconds / 1000;
durations.push(microseconds);

startTime2 = process.hrtime()[1]
console.log(startTime2);
endTime = binarySearch(n2, wordToFind)
endTime = process.hrtime()[1]
console.log(endTime);
nanoseconds = endTime - startTime2;
microseconds = nanoseconds / 1000;
durations.push(microseconds);

startTime3 = process.hrtime()[1]
console.log(startTime3);
endTime = binarySearch(n3, wordToFind)
endTime = process.hrtime()[1]
console.log(endTime);
nanoseconds = endTime - startTime3;
microseconds = nanoseconds / 1000;
durations.push(microseconds);

startTime4 = process.hrtime()[1]
console.log(startTime4);
endTime = binarySearch(n4, wordToFind)
endTime = process.hrtime()[1]
console.log(endTime);
nanoseconds = endTime - startTime4;
microseconds = nanoseconds / 1000;
durations.push(microseconds);

startTime5 = process.hrtime()[1]
console.log(startTime5);
endTime = binarySearch(n5, wordToFind)
endTime = process.hrtime()[1]
console.log(endTime);
nanoseconds = endTime - startTime5;
microseconds = nanoseconds / 1000;
durations.push(microseconds);

startTime6 = process.hrtime()[1]
console.log(startTime6);
endTime = binarySearch(n6, wordToFind)
endTime = process.hrtime()[1]
console.log(endTime);
nanoseconds = endTime - startTime6;
microseconds = nanoseconds / 1000;
durations.push(microseconds);

startTime7 = process.hrtime()[1]
console.log(startTime7);
endTime = binarySearch(n7, wordToFind)
endTime = process.hrtime()[1]
console.log(endTime);
nanoseconds = endTime - startTime7;
microseconds = nanoseconds / 1000;
durations.push(microseconds);

console.log(listsLengths);
console.log(durations);
