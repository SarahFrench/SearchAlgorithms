const {easyBoard, assignedBoard} = require('./sudoku-boards.js');
const {isSuperset, difference, NUMBERS} = require('./functions-and-constants.js');




class Node {
  constructor(board, position) {
    this.sudoku = new Sudoku(board);
    this.position = position;
    this.possibilities = this.sudoku.findPossibleNumbersForPosition(this.position)
    if (this.checkIfPositionSolved()){
      return true
    } else if (this.checkIfPositionStuck()){
      console.log("My possibilities (" + this.possibilities + ") are empty");
      return false
    } else {
      let possibilities = this.possibilities;
      for(let i=0; i<possibilities.length; i++){

      }
    }
  }

  moveToNextSpace(){
    this.position = this.sudoku.findUnsolvedSpaceWithFewestOptions().position;
    this.possibilities = this.sudoku.findPossibleNumbersForPosition(this.position)
  }

  checkIfPositionSolved(){
    if (this.possibilities.length === 1){
      return true
    } else {
      return false
    }
  }

  checkIfPositionStuck(){
    if (this.possibilities === []){
      return true
    } else {
      return false
    }
  }

  evaluatePosition(childNode){
    if(childNode){
      this.sudoku.updateNumberAtPosition();
      return true
    } else {
      return false
    }
  }

  updatePossibilities(childsVerdict){
    if (childsVerdict){
      this.possibilities =
    }
  }


  makeChildNodes(possibilities){
    let successful_child = false;
    this.possibilities.forEach(choice => {
      console.log("Trying value " + choice + " at " + this.position);
      let resultSudoku = new Sudoku(this.sudoku.board);
      resultSudoku.updateNumberAtPosition(this.position, choice);
      nextPosition = resultSudoku.findUnsolvedSpaces()[0];
      nextPossibilities = resultSudoku.findPossibleNumbersForPosition();
      if (nextPossibilities != undefined){
        this[`${choice}`] = new Node(resultSudoku.board, nextPossibilities)
        return this[`${choice}`]
      } else {
        return false
      }
    })
  }

}

class Sudoku {
  constructor(board){
    this.board = board;
    // this.solveEasySpaces();
    this.solved = !this.remainingSpace();
    if (this.solved){
      console.log("Sudoku puzzle solved!");
    }
  }

  isSolved(){
    empty_spaces = this.remainingSpace();
    errors_present = this.anyErrors();
    if ( !empty_spaces && !errors_present ){
      return true;
    } else {
      return false;
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
    console.log("before:" + this.board[y][x]);
    this.board[y][x] = value;
    console.log("after:" + this.board[y][x]);

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
          // console.log(`put ${possibleNumbers[0]} at position ${position}`);
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

  findUnsolvedSpaceWithFewestOptions(){
    let unsolvedSpaces = this.findUnsolvedSpaces()
    let fewestPossibilities = {position: [], number: 9}
    unsolvedSpaces.forEach( space => {
      let numberPossibilities = this.findPossibleNumbersForPosition(space).length
      if (numberPossibilities < fewestPossibilities.number && numberPossibilities > 0){
        fewestPossibilities.number = numberPossibilities
        fewestPossibilities.position = space
      }
    })
    return fewestPossibilities
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

let mySudoku = new Sudoku (assignedBoard)
mySudoku.updateNumberAtPosition([0,0], 3)
mySudoku.updateNumberAtPosition([1,0], 6)
mySudoku.updateNumberAtPosition([2,0], 5)
mySudoku.updateNumberAtPosition([3,0], 4)
mySudoku.updateNumberAtPosition([4,0], 7)
mySudoku.solveEasySpaces()
mySudoku.printBoard()
// console.log(mySudoku.findUnsolvedSpaceWithFewestOptions())

console.log(mySudoku.findPossibleNumbersForPosition([7,0]))

// let tree = new Node(mySudoku.board)
// console.log();
// console.log(tree);
//
// // mySudoku.board.forEach( row => {
//   console.log(row);
// })
//
// console.log();
// console.log(mySudoku.findUnsolvedSpaces()[0]);
//
// console.log(mySudoku.findNumbersAffectingPosition(4));
