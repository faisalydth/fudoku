const newGame = document.querySelector("#new-game button");
const timer = document.querySelectorAll("#timer span span");
const hint = document.querySelector("#btns #hint");
const hintRemaining = hint.querySelector("span");
const check = document.querySelector("#btns #check");
const checkRemaining = check.querySelector("span");

/* ================================================== */

/* Init sudoku game */
let playCount = 0;
let arrTimer = [0, 0, 0];
newGame.addEventListener("click", () => {
  if (playCount == 0) {
    drawSudoku(sudoku);
    setInterval(runTimer, 1000);
  } else {
    sudoku = initSudoku();
    let result = generateSudoku(sudoku);
    while (result == undefined) {
      result = generateSudoku(sudoku);
    };
    drawSudoku(sudoku);
    // Reset timer
    arrTimer = [0, 0, 0];
    timer[0].parentElement.classList.add("hidden");
    timer[1].parentElement.classList.add("hidden");
    timer[0].innerHTML = arrTimer[0];
    timer[1].innerHTML = arrTimer[1];
    timer[2].innerHTML = arrTimer[2];
    // Reset hint and check
    hintRemaining.innerHTML = 3;
    hintRemaining.classList.remove("disable");
    checkRemaining.innerHTML = 3;
    checkRemaining.classList.remove("disable");
  };
  popupClose[0].click();
  playCount++;
});

/* ================================================== */

/* Get help for the answer (only 3 chance in a game) */
hint.addEventListener("click", () => {
  let hintRemainLeft = hintRemaining.innerHTML;
  if (hintRemainLeft > 0) {
    deactivate();
    let result = generateSudoku(sudoku);
    while (result == undefined) {
      result = generateSudoku(sudoku);
    };
    let lineSudoku = rearrgSudoku(sudoku);
    for (let i = 0; i < cells.length; i++) {
      cells[i].classList.remove("not-valid");
      if (lineSudoku[i] != 0 && cells[i].id == "selected" && cells[i].classList.contains("disable") == false) {
        console.log(lineSudoku[i]);
        cells[i].classList.add("disable");
        cells[i].classList.add("active");
        cells[i].innerHTML = lineSudoku[i];
        for (let j = 0; j < cells.length; j++) {
          cells[j].textContent == lineSudoku[i]
            ? cells[j].classList.add("active")
            : "";
        };
        hintRemainLeft--;
        hintRemaining.innerHTML = hintRemainLeft;
      };
    };
  };
  if (hintRemainLeft == 0) {
    hintRemaining.classList.add("disable");
  };
});

/* Validate the answer before completing the game (only 3 chance in a game) */
check.addEventListener("click", () => {
  let checkRemainLeft = checkRemaining.innerHTML;
  if (checkRemainLeft > 0) {
    deactivate();
    let inputSudoku = getSudoku();
    validateSudoku(inputSudoku);
    // setTimeout(notValid, 5000);
    checkRemainLeft--;
    checkRemaining.innerHTML = checkRemainLeft;
  }
  if (checkRemainLeft == 0) {
    checkRemaining.classList.add("disable");
  };
});

function notValid() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].classList.contains("not-valid")) {
      cells[i].classList.remove("not-valid");
    };
  };
};

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
  let difficulty = document.querySelector("#difficulty").selectedOptions[0].value;
  let level;
  if (difficulty == 1) {
    level = [6, 7];
  } else if (difficulty == 2) {
    level = [3, 6];
  } else if (difficulty == 3) {
    level = [2, 3];
  };
  clearSudoku(sudoku, level[0], level[1]);
  let lineSudoku = rearrgSudoku(sudoku);
  deactivate();
  for (let i = 0; i < 81; i++) {
    cells[i].classList.remove("disable");
    cells[i].innerHTML = null;
    if (lineSudoku[i] != 0) {
      cells[i].classList.add("disable");
      cells[i].innerHTML = lineSudoku[i];
    };
  };
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