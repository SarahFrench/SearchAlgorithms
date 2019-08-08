// assigned Sudoku
let assignedRow1 = [0,0,0,0,0,2,1,0,0];
let assignedRow2 = [0,0,4,0,0,8,7,0,0];
let assignedRow3 = [0,2,0,3,0,0,9,0,0];
let assignedRow4 = [6,0,2,0,0,3,0,4,0];
let assignedRow5 = [0,0,0,0,0,0,0,0,0];
let assignedRow6 = [0,5,0,6,0,0,3,0,1];
let assignedRow7 = [0,0,3,0,0,5,0,8,0];
let assignedRow8 = [0,0,8,2,0,0,5,0,0];
let assignedRow9 = [0,0,9,7,0,0,0,0,0];

let assignedBoard = [assignedRow1,assignedRow2,assignedRow3,assignedRow4,assignedRow5,assignedRow6,assignedRow7,assignedRow8,assignedRow9]


// very easy Sudoku
let easyRow1 = [8,7,6,9,0,0,0,0,0];
let easyRow2 = [0,1,0,0,0,6,0,0,0];
let easyRow3 = [0,4,0,3,0,5,8,0,0];
let easyRow4 = [4,0,0,0,0,0,2,1,0];
let easyRow5 = [0,9,0,5,0,0,0,0,0];
let easyRow6 = [0,5,0,0,4,0,3,0,6];
let easyRow7 = [0,2,9,0,0,0,0,0,8];
let easyRow8 = [0,0,4,6,9,0,1,7,3];
let easyRow9 = [0,0,0,0,0,1,0,0,4];

let easyBoard = [easyRow1,easyRow2,easyRow3,easyRow4,easyRow5,easyRow6,easyRow7,easyRow8,easyRow9]


// another Sudoku
let anotherRow1 = [8,0,0,0,0,0,0,0,0];
let anotherRow2 = [0,0,3,6,0,0,0,0,0];
let anotherRow3 = [0,7,0,0,9,0,2,0,0];
let anotherRow4 = [0,5,0,0,0,7,0,0,0];
let anotherRow5 = [0,0,0,0,4,5,7,0,0];
let anotherRow6 = [0,0,0,1,0,0,0,3,0];
let anotherRow7 = [0,0,1,0,0,0,0,6,8];
let anotherRow8 = [0,0,8,5,0,0,0,1,0];
let anotherRow9 = [0,9,0,0,0,0,4,0,0];

let anotherBoard = [anotherRow1,anotherRow2,anotherRow3,anotherRow4,anotherRow5,anotherRow6,anotherRow7,anotherRow8,anotherRow9];

module.exports = {
  assignedBoard,
  easyBoard,
  anotherBoard
}
