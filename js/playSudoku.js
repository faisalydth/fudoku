const timer = document.querySelectorAll("#timer span span");

/* Init sudoku game */
let arrTimer = [0, 0, 0];
drawSudoku(sudoku);

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

/* Function to draw sudoku grid in board game */
function drawSudoku(sudoku) {
  // clearSudoku(sudoku, 7, 8);
  clearSudoku(sudoku, 3, 5);
  let lineSudoku = rearrgSudoku(sudoku);
  for (let i = 0; i < 81; i++) {
    if (lineSudoku[i] != 0) {
      cells[i].classList.add("disable");
      cells[i].innerHTML = lineSudoku[i];
    };
  };
  setInterval(runTimer, 1000);
};

/* ================================================== */

/* Function to run timer */
function runTimer() {
  if (arrTimer[2] < 59) {
    timer[2].parentElement.classList.remove("hidden");
    arrTimer[2]++;
  } else if (arrTimer[2] == 59 && arrTimer[1] < 59) {
    timer[1].parentElement.classList.remove("hidden");
    arrTimer[2] = 0;
    arrTimer[1]++;
  } else {
    timer[0].parentElement.classList.remove("hidden");
    arrTimer[2] = 0;
    arrTimer[1] = 0;
    arrTimer[0]++;
  };
  timer[0].innerHTML = arrTimer[0];
  timer[1].innerHTML = arrTimer[1];
  timer[2].innerHTML = arrTimer[2];
};