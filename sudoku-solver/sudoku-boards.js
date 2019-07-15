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
let easyRow1 = [0,0,8,0,6,9,0,7,2];
let easyRow2 = [7,6,0,0,0,3,9,1,0];
let easyRow3 = [0,9,4,7,2,0,3,0,0];
let easyRow4 = [0,4,0,5,0,7,0,8,3];
let easyRow5 = [8,0,5,0,0,6,7,0,4];
let easyRow6 = [6,7,0,8,0,2,0,0,9];
let easyRow7 = [4,0,0,6,3,0,0,9,1];
let easyRow8 = [0,8,6,0,5,0,2,4,0];
let easyRow9 = [9,0,1,2,7,0,8,0,0];

let easyBoard = [easyRow1,easyRow2,easyRow3,easyRow4,easyRow5,easyRow6,easyRow7,easyRow8,easyRow9]

module.exports = {
  assignedBoard,
  easyBoard
}
