const fs = require('fs');
const moment = require('moment');
const plotly = require('plotly')('SarahFrench', 'c43cb3Q3gvNd0eqsXz3e');


let words = fs.readFileSync( 'words.txt' , {encoding: 'UTF-8'});

let wordsList = words.split('\n');
console.log(wordsList.length);

function binarySearch(list, itemToFind){
  console.log(list);
  console.log(itemToFind);
  let midpoint = Math.floor(list.length / 2);

  if(list.length == 1 && list[0] != itemToFind){
    return console.log("not in list")
  }

  if (list[midpoint] === itemToFind){
    return list[midpoint];
  } else if (list[midpoint] < itemToFind) {
    list = list[0,midpoint];
    console.log(list);
    binarySearch(list, itemToFind);
  } else {
    list = list[midpoint, list.length];
    console.log(list);
    binarySearch(list, itemToFind);
  }
}

binarySearch(wordsList, 'hello');
