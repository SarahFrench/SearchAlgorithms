const fs = require('fs');
const moment = require('moment');
const plotly = require('plotly')('SarahFrench', 'c43cb3Q3gvNd0eqsXz3e');


let words = fs.readFileSync( 'words.txt' , {encoding: 'UTF-8'});

let wordsList = words.split('\n');

// Linear search
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

listsToSearch.forEach(list => {
  list.push(wordToFind);
  listsLengths.push(list.length)
})

let startTime = moment(new Date());
let seconds = 0
listsToSearch[0].forEach( word => {
  if(word == wordToFind){
    console.log("Found word in list length: " + listsToSearch[0].length)
    let endTime = moment(new Date());
    seconds = endTime.diff(startTime);
  }
})
durations.push(seconds);
console.log(seconds);

startTime = moment(new Date());
seconds = 0
listsToSearch[1].forEach( word => {
  if(word == wordToFind){
    console.log("Found word in list length: " + listsToSearch[1].length)
    let endTime = moment(new Date());
    seconds = endTime.diff(startTime);
  }
})
durations.push(seconds);
console.log(seconds);

startTime = moment(new Date());
seconds = 0
listsToSearch[2].forEach( word => {
  if(word == wordToFind){
    console.log("Found word in list length: " + listsToSearch[2].length)
    let endTime = moment(new Date());
    seconds = endTime.diff(startTime);
  }
})
durations.push(seconds);
console.log(seconds);

startTime = moment(new Date());
seconds = 0
listsToSearch[3].forEach( word => {
  if(word == wordToFind){
    console.log("Found word in list length: " + listsToSearch[3].length)
    let endTime = moment(new Date());
    seconds = endTime.diff(startTime);
  }
})
durations.push(seconds);
console.log(seconds);

startTime = moment(new Date());
seconds = 0
listsToSearch[4].forEach( word => {
  if(word == wordToFind){
    console.log("Found word in list length: " + listsToSearch[4].length)
    let endTime = moment(new Date());
    seconds = endTime.diff(startTime);
  }
})
durations.push(seconds);
console.log(seconds);

startTime = moment(new Date());
seconds = 0
listsToSearch[5].forEach( word => {
  if(word == wordToFind){
    console.log("Found word in list length: " + listsToSearch[5].length)
    let endTime = moment(new Date());
    seconds = endTime.diff(startTime);
  }
})
durations.push(seconds);
console.log(seconds);


console.log(listsLengths);
console.log(durations);

var durationOfSearches = {
  x: listsLengths,
  y: durations,
  type: "scatter"
};
var data = [durationOfSearches];
var graphOptions = {filename: "linear-search", fileopt: "overwrite"};
plotly.plot(data, graphOptions, function (err, msg) {
    console.log(msg);
});
