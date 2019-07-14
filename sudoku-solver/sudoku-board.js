let row1 = [undefined,undefined,undefined,undefined,undefined,2,1,undefined,undefined];
let row2 = [undefined,undefined,4,undefined,undefined,8,7,undefined,undefined];
let row3 = [undefined,2,undefined,3,undefined,undefined,9,undefined,undefined];
let row4 = [6,undefined,2,undefined,undefined,3,undefined,4,undefined];
let row5 = [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined];
let row6 = [undefined,5,undefined,6,undefined,undefined,3,undefined,1];
let row7 = [undefined,undefined,3,undefined,undefined,5,undefined,8,undefined];
let row8 = [undefined,undefined,8,2,undefined,undefined,5,undefined,undefined];
let row9 = [undefined,undefined,9,7,undefined,undefined,undefined,undefined,undefined];

let board = [row1,row2,row3,row4,row5,row6,row7,row8,row9]

class Sudoku {
  constructor(board){
    this.board = board
  }

  column(position){
    position -= 1;
    let column = [];
    this.board.forEach( row => {
      column.push(row[position]);
    })
    return column;
  }

  row(position){
    position -= 1;
    return this.board[position]
  }

  findNumberAtPosition([x,y]){
    // x = column, y = row
    x -= 1;
    return this.row(y)[x];
  }

  identifyThreeByThreeSquare([x,y]){
    //defined by top left coordinate
    if([1,2,3].includes(x)){
      if ([1,2,3].includes(y)){ return [1,1]}
      else if ([4,5,6].includes(y)){ return [1,4]}
      else if ([7,8,9].includes(y)){ return [1,7]}
    }
    else if([4,5,6].includes(x)){
      if ([1,2,3].includes(y)){ return [4,1]}
      else if ([4,5,6].includes(y)){ return [4,4]}
      else if ([7,8,9].includes(y)){ return [4,7]}
    }
    else if([7,8,9].includes(x)){
      if ([1,2,3].includes(y)){ return [7,1]}
      else if ([4,5,6].includes(y)){ return [7,4]}
      else if ([7,8,9].includes(y)){ return [7,7]}
    }
  }

  findNumbersInThreeByThree([x,y]){
    x -= 1
    let top = this.row(y).slice(x, x+3)
    let middle = this.row(y+1).slice(x, x+3)
    let bottom = this.row(y+2).slice(x, x+3)
    let numbers = top.concat(middle).concat(bottom)
    return this.uniqueNumbers(numbers)
  }

  findNumbersAffectingPosition([x,y]){
    let row = this.row(x);
    let column = this.column(x);
    let numbers = row.concat(column);
    return this.uniqueNumbers(numbers)
  }

  uniqueNumbers(number_array){
    let uniqueNumbers = number_array.filter( x => typeof x === 'number')
    uniqueNumbers = [...new Set(uniqueNumbers)].sort();
    return uniqueNumbers;
  }
}

let mySudoku = new Sudoku(board);

console.log(mySudoku.findNumberAtPosition([1,1]));
let threeByThree = mySudoku.identifyThreeByThreeSquare([1,1]);
console.log(threeByThree);
console.log(mySudoku.findNumbersInThreeByThree(threeByThree));
