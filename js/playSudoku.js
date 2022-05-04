/* Init sudoku game */
drawSudoku(sudoku);
let inputSudoku = getSudoku();

/* ================================================== */

/* Function to clear sudoku */
function clearSudoku(sudoku, min, max) {
  for (let r in sudoku) {
    const n = randInt(min, max); // Set remaining number in a row
    let rowIds = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    shuffleArr(rowIds);
    rowIds = rowIds.slice(0, 9 - n); // List of row indices to be cleared
    for (let i in rowIds) {
      const c = rowIds[i];
      sudoku[r][c] = 0;
    };
  };
};

/* Function to rearrange sudoku grid */
function rearrgSudoku(sudoku) {
  let lineSudoku = []
  for (let i = 0; i < 9; i++) {
    let r = Math.floor(i / 3) * 3;
    let c = i % 3 * 3;
    const cMax = i % 3 * 3 + 2;
    for (let j = 0; j < 9; j++) {
      lineSudoku.push(sudoku[r][c]);
      if (c < cMax) {
        c += 1;
      } else {
        r += 1;
        c = i % 3 * 3;
      };
    };
  };
  return lineSudoku;
};

/* Function to draw sudoku grid in UI */
function drawSudoku(sudoku) {
  clearSudoku(sudoku, 1, 4);
  let lineSudoku = rearrgSudoku(sudoku);
  for (let i = 0; i < 81; i++) {
    if (lineSudoku[i] != 0) {
      cells[i].classList.add("disable");
      cells[i].innerHTML = lineSudoku[i];
    }
  }
};

/* ================================================== */

/* Function to get sudoku input from user */
function getSudoku() {
  let inputSudoku = [];
  for (let n = 0; n < 3; n++) {
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let m = 0; m < 3; m++) {
        let c = (i * 3) + (m * 9) + (n * 27);
        let cMax = (i * 3) + (m * 9) + (n * 27) + 3;
        for (let j = c; j < cMax; j++) {
          let value = 0;
          if (parseInt(cells[j].innerHTML) > 0) {
            value = parseInt(cells[j].innerHTML);
          };
          row.push(value);
        };
      };
      inputSudoku.push(row);
    };
  };
  return inputSudoku;
};