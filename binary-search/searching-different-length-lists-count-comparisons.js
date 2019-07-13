const fs = require('fs');
const moment = require('moment');
const plotly = require('plotly')('SarahFrench', 'c43cb3Q3gvNd0eqsXz3e');
const present = require('present');

//Getting lists of words
let words = fs.readFileSync( 'words.txt' , {encoding: 'UTF-8'});
let wordsList = words.split('\n');

// Making lists of different lengths

let n = wordsList;
let nDiv2 = wordsList.slice(0,233276);
let nDiv4 = wordsList.slice(0,116638);
let nDiv8 = wordsList.slice(0, 58319);
let nDiv16 = wordsList.slice(0, 29159);

let nTimes2 = n.concat(n);
let nTimes4 = nTimes2.concat(nTimes2);
let nTimes8 = nTimes4.concat(nTimes4);
let nTimes16 = nTimes8.concat(nTimes8);

let listsToSearch = [nDiv16, nDiv8, nDiv4, nDiv2, n, nTimes2, nTimes4, nTimes8, nTimes16 ]

let wordToFind = "zzzzzsarah"

//Adding unique wordToFind string to end of each list
listsToSearch.forEach(list => {
  list.push(wordToFind);
})

//Binary Search
function binarySearch(wordsList, wordToFind){
  let midpoint = Math.floor(wordsList.length / 2);
  // console.log("Midpoint = " + wordsList[midpoint])
  if (wordsList.length === 1 && wordsList[midpoint].toLowerCase() != wordToFind) {
    console.log('Couldn\'t find ' + wordToFind);
    return 1;
  }
  if (wordsList[midpoint].toLowerCase() === wordToFind){
    console.log('Found the word ' + wordToFind);
    return 1;
  } else if (wordsList[midpoint].toLowerCase() < wordToFind) {
    wordsList = wordsList.slice(midpoint, wordsList.length);
    return 1 + binarySearch(wordsList, wordToFind);
  } else {
    wordsList = wordsList.slice(0,midpoint);
    return 1 + binarySearch(wordsList, wordToFind);
  }
}

let listLengths = [];
let numberComparisons = [];

listsToSearch.forEach(list =>{
  listLengths.push(list.length);
  numberComparisons.push(binarySearch(list, wordToFind))
})

console.log(listLengths);
console.log(numberComparisons);


// Pushing data up to plot.ly website

var measurements = {
  x: listLengths,
  y: numberComparisons,
  type: "scatter"
};
var data = [measurements];
var graphOptions = {filename: "binary-search-counts", fileopt: "overwrite"};
plotly.plot(data, graphOptions, function (err, msg) {
    console.log(msg);
});
