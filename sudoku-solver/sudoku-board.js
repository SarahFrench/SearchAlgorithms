let row1 = [0,0,0,0,0,2,1,0,0];
let row2 = [0,0,4,0,0,8,7,0,0];
let row3 = [0,2,0,3,0,0,9,0,0];
let row4 = [6,0,2,0,0,3,0,4,0];
let row5 = [0,0,0,0,0,0,0,0,0];
let row6 = [0,5,0,6,0,0,3,0,1];
let row7 = [0,0,3,0,0,5,0,8,0];
let row8 = [0,0,8,2,0,0,5,0,0];
let row9 = [0,0,9,7,0,0,0,0,0];

let board = [row1,row2,row3,row4,row5,row6,row7,row8,row9]

function isSuperset(set, subset) {
    for (var elem of subset) {
        if (!set.has(elem)) {
            return false;
        }
    }
    return true;
}

function difference(setA, setB) {
    var _difference = new Set(setA);
    for (var elem of setB) {
        _difference.delete(elem);
    }
    return _difference;
}

const NUMBERS = new Set([1,2,3,4,5,6,7,8,9]);

class Sudoku {
  constructor(board){
    this.board = board
  }

  column(position){
    let column = [];
    this.board.forEach( row => {
      column.push(row[position]);
    })
    return column;
  }

  row(position){
    return this.board[position]
  }

  remainingSpace(){
    let verdict = false;
    this.board.forEach( row => {
      verdict = (row.includes(0) ? true : verdict)
    })
    return verdict
  }

  findNumberAtPosition([x,y]){
    // x = column, y = row
    return this.row(y)[x];
  }

  updateNumberAtPosition([x,y], value){
    // x = column, y = row
    this.board[y][x] = value;
  }

  identifyThreeByThreeSquare([x,y]){
    //defined by top left coordinate
    if([0,1,2].includes(x)){
      if ([0,1,2].includes(y)){return [0,0];}
      else if ([3,4,5].includes(y)){return [0,3];}
      else if ([6,7,8].includes(y)){return [0,6];}
    }
    else if([3,4,5].includes(x)){
      if ([0,1,2].includes(y)){return [3,0];}
      else if ([3,4,5].includes(y)){return [3,3];}
      else if ([6,7,8].includes(y)){return [3,6];}
    }
    else if([6,7,8].includes(x)){
      if ([0,1,2].includes(y)){return [6,1];}
      else if ([3,4,5].includes(y)){return [6,3];}
      else if ([6,7,8].includes(y)){return [6,6];}
    }
  }

  findNumbersInThreeByThree([x,y]){
    let position = this.identifyThreeByThreeSquare([x,y])
    x = position[0];
    y = position[1];
    let top = this.row(y).slice(x, x+3)
    let middle = this.row(y+1).slice(x, x+3)
    let bottom = this.row(y+2).slice(x, x+3)
    let numbers = top.concat(middle).concat(bottom)
    return this.uniqueNumbers(numbers)
  }

  findNumbersAffectingPosition([x,y]){
    let rowNumbers = this.row(y);
    let columnNumbers = this.column(x);
    let numbers = rowNumbers.concat(columnNumbers);
    let threeByThreeNumbers = this.findNumbersInThreeByThree([x,y]);
    numbers = numbers.concat(threeByThreeNumbers)
    return this.uniqueNumbers(numbers)
  }

  uniqueNumbers(number_array){
    let uniqueNumbers = number_array.filter( x => typeof x === 'number')
    uniqueNumbers = [...new Set(uniqueNumbers)].sort();
    return uniqueNumbers;
  }

  solveEasySpaces(){
    // Finds easy to solve spaces and keeps trying to solve these until they run out
    let shouldLoopContinue = true;
    while (shouldLoopContinue){
      let changes = [];
      for (let x = 0; x < 9; x++){
        for (let y = 0; y < 9; y++){
          let precludedNumbers = new Set(this.findNumbersAffectingPosition([x,y]));
          let possibleNumbers = difference(NUMBERS, precludedNumbers)
          possibleNumbers = Array.from(possibleNumbers)
          if (possibleNumbers.length === 1 && this.findNumberAtPosition([x,y]) === 0){
            console.log("Put number " + possibleNumbers[0] + " at position x:" + x + " y:" + y);
            this.updateNumberAtPosition([x,y], possibleNumbers[0] )
            changes.push(true);
          } else {
            changes.push(false);
          }
        }
      }
      if (!changes.includes(true)){
        shouldLoopContinue = false;
      }
    }
  }
}

let mySudoku = new Sudoku(board);


mySudoku.solveEasySpaces()


mySudoku.board.forEach( row => {
  console.log(row);
})
