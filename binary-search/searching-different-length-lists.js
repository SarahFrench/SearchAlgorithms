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
function binarySearch(wordsList, wordToFind, startTime){
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
    let nanoseconds = endTime - startTime;
    let microseconds = nanoseconds / 1000;
    durations.push(microseconds);
    return wordsList[midpoint];
  } else if (wordsList[midpoint].toLowerCase() < wordToFind) {
    wordsList = wordsList.slice(midpoint, wordsList.length);
    binarySearch(wordsList, wordToFind, startTime);
  } else {
    wordsList = wordsList.slice(0,midpoint);
    binarySearch(wordsList, wordToFind, startTime);
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

let startTime = process.hrtime()[1]
console.log(startTime);
binarySearch(n, wordToFind, startTime)



startTime = process.hrtime()[1]
console.log(startTime);
binarySearch(n2, wordToFind, startTime)



startTime = process.hrtime()[1]
console.log(startTime);
binarySearch(n3, wordToFind, startTime)



startTime = process.hrtime()[1]
console.log(startTime);
binarySearch(n4, wordToFind, startTime)



startTime = process.hrtime()[1]
console.log(startTime);
binarySearch(n5, wordToFind, startTime)



startTime = process.hrtime()[1]
console.log(startTime);
binarySearch(n6, wordToFind, startTime)



console.log(listsLengths);
console.log(durations);

//Pushing data up to plot.ly website

var durationOfSearches = {
  x: listsLengths,
  y: durations,
  type: "scatter"
};
var data = [durationOfSearches];
var graphOptions = {filename: "binary-search", fileopt: "overwrite"};
plotly.plot(data, graphOptions, function (err, msg) {
    console.log(msg);
});
