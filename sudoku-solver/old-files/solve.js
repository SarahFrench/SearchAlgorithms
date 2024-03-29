const {easyBoard, assignedBoard} = require('./sudoku-boards.js');
const {isSuperset, difference, NUMBERS} = require('./functions-and-constants.js');

class Node {
  constructor(board) {
    this.sudoku = new Sudoku(board);
    this.position = this.sudoku.findUnsolvedSpaces()[0]
    this.possibilities = this.sudoku.findPossibleNumbersForPosition(this.position)
    if (this.possibilities.length > 0){
      this.makeChildNodes(this.possibilities);
    }
  }

  makeChildNodes(possibilities){
    this.possibilities.forEach(choice => {
      let resultSudoku = new Sudoku(this.sudoku.board)
      resultSudoku.updateNumberAtPosition(this.position, choice)
      if (!resultSudoku.anyErrors()){
        if (!resultSudoku.remainingSpace()){
          console.log("Sudoku puzzle solved!");
          return resultSudoku.sudoku;
        } else {
          this[`${choice}`] = new Node(resultSudoku.board)
          return this[choice]
        }
      } else {
        console.log(`ERROR DETECTED after adding ${choice} in position [${this.position}]`);
        return this.sudoku;
      }
    })
  }

}

class Sudoku {
  constructor(board){
    this.board = board;
    this.solveEasySpaces();
    this.solved = !this.remainingSpace();
    if (this.solved){
      console.log("Sudoku puzzle solved!");
    }
  }

  column(position){
    let column = [];
    this.board.forEach( row => {
      column.push(row[position]);
    });
    return column;
  }

  row(position){
    return this.board[position]
  }

  remainingSpace(){
    let verdict = false;
    this.board.forEach( row => {
      verdict = (row.includes(0) ? true : verdict);
    });
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
      if ([0,1,2].includes(y)){return [6,0];}
      else if ([3,4,5].includes(y)){return [6,3];}
      else if ([6,7,8].includes(y)){return [6,6];}
    }
  }

  findNumbersInThreeByThree([x,y]){
    let position = this.identifyThreeByThreeSquare([x,y]);
    x = position[0];
    y = position[1];
    let top = this.row(y).slice(x, x+3);
    let middle = this.row(y+1).slice(x, x+3);
    let bottom = this.row(y+2).slice(x, x+3);
    let numbers = top.concat(middle).concat(bottom);
    return this.uniqueNumbers(numbers)
  }

  findNumbersAffectingPosition([x,y]){
    let rowNumbers = this.row(y);
    let columnNumbers = this.column(x);
    let numbers = rowNumbers.concat(columnNumbers);
    let threeByThreeNumbers = this.findNumbersInThreeByThree([x,y]);
    numbers = numbers.concat(threeByThreeNumbers);
    return this.uniqueNumbers(numbers)
  }

  findPossibleNumbersForPosition([x,y]){
    if (this.findNumberAtPosition([x,y]) === 0){
      let precludedNumbers = new Set(this.findNumbersAffectingPosition([x,y]));
      let possibleNumbers = difference(NUMBERS, precludedNumbers);
      return possibleNumbers = Array.from(possibleNumbers);
    } else {
      return [];
    }
  }

  uniqueNumbers(number_array){
    let uniqueNumbers = number_array.filter( x => typeof x === 'number');
    uniqueNumbers = [...new Set(uniqueNumbers)].sort();
    return uniqueNumbers;
  }

  solveEasySpaces(){
    // Finds easy to solve spaces and keeps trying to solve these until they run out
    let shouldLoopContinue = true;

    while (shouldLoopContinue){
      let changes = [];
      let unsolvedSpaces = this.findUnsolvedSpaces()
      unsolvedSpaces.forEach( position => {
        let possibleNumbers = this.findPossibleNumbersForPosition(position);
        if (possibleNumbers.length === 1){
          this.updateNumberAtPosition(position, possibleNumbers[0]);
          changes.push(true);
        } else {
          changes.push(false);
        }
      })
      if (!changes.includes(true)){
        shouldLoopContinue = false;
      }
    }
  }

  findUnsolvedSpaces(){
    let unsolved = [];
    this.board.forEach( function(row, y){
      row.forEach( function(space, x){
        if (space === 0){
          unsolved.push([x,y]);
        }
      })
    })
    return unsolved;
  }

  anyErrors(){
    let accumulator = [];
    this.board.forEach( row => {
      let numberFrequencies = {'1':0, '2':0, '3':0, '4':0, '5':0, '6':0, '7':0, '8':0, '9':0}

      row.forEach( number => {
        if (number){
          numberFrequencies[`${number}`] += 1;
        }
      })
      numberFrequencies = Object.values(numberFrequencies);
      let checkingFrequencies = numberFrequencies.map( frequency => frequency > 1)
      if (checkingFrequencies.includes(true)){
        accumulator.push(true);
      }
    })
    return accumulator.includes(true) ? true : false ;
  }

  printBoard(){
    this.board.forEach( row => {
      console.log(row);
    })
  }
}

mySudoku.board.forEach( row => {
  console.log(row);
})

console.log(mySudoku.findUnsolvedSpaces());

