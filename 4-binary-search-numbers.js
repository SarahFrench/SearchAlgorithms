let array = [1,2,3,4,5,6,7];

function binarySearch(array, numberToFind){
  let midpoint = Math.floor(array.length / 2);
  if (array.length === 1 && array[midpoint] != numberToFind) {
    console.log("NOT FOUND");
    return undefined;
  }
  if (array[midpoint] === numberToFind){
    console.log("FOUND");
    console.log(array[midpoint]);
    return array[midpoint];
  } else if (array[midpoint] < numberToFind) {
    array = array.slice(midpoint, array.length);
    binarySearch(array, numberToFind);
  } else {
    array = array.slice(0,midpoint);
    binarySearch(array, numberToFind);
  }
}

binarySearch(array, 1)
