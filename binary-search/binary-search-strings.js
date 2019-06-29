const fs = require('fs');
const moment = require('moment');
const plotly = require('plotly')('SarahFrench', 'c43cb3Q3gvNd0eqsXz3e');


let words = fs.readFileSync( 'words.txt' , {encoding: 'UTF-8'});

let wordsList = words.split('\n');

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
    return wordsList[midpoint];
  } else if (wordsList[midpoint].toLowerCase() < wordToFind) {
    wordsList = wordsList.slice(midpoint, wordsList.length);
    binarySearch(wordsList, wordToFind);
  } else {
    wordsList = wordsList.slice(0,midpoint);
    binarySearch(wordsList, wordToFind);
  }
}

binarySearch(wordsList, 'abracadabra');

// console.log(wordsList.slice(1000,2000));
