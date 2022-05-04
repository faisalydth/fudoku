/* Generate sudoku */
let sudoku = initSudoku();
// let iterCount = 1;
let num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
generateSudoku(sudoku);

/* ================================================== */

/* Function to init blank sudoku */
function initSudoku() {
  let sudoku = [];
  for (let i = 0; i < 9; i++)
    sudoku.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  return sudoku;
};

/* Function to generate sudoku */
function generateSudoku(sudoku) {
  // printIter();
  let x; // Row
  let y; // Column
  for (let i = 0; i < 81; i++) {
    x = Math.floor(i / 9);
    y = i % 9;
    if (sudoku[x][y] == 0) {
      shuffleArr(num);
      for (n in num) {
        let value = num[n];
        // Check if the value has not already used in this row
        if (sudoku[x].includes(value) == false) {
          let arrNumUsedColumn = numUsedColumn(sudoku, y);
          // Check if the value has not already used in this column
          if (arrNumUsedColumn.includes(value) == false) {
            let arrNumUsedBlock = numUsedBlock(sudoku, x, y);
            // Check if the value has not already used in this block
            if (arrNumUsedBlock.includes(value) == false) {
              sudoku[x][y] = value;
              if (isValidSudoku(sudoku)) {
                // printSudoku(sudoku);
                return true
              } else {
                if (generateSudoku(sudoku)) {
                  return true
                };
              };
            };
          };
        };
      };
      break;
    };
  };
  sudoku[x][y] = 0;
};

/* ================================================== */

/* Function to shuffle an array */
function shuffleArr(arr) {
  let arrId = arr.length;
  while (arrId != 0) {
    let randId = Math.floor(Math.random() * arrId);
    arrId--;
    let valSwap = arr[arrId];
    arr[arrId] = arr[randId];
    arr[randId] = valSwap;
  };
};
/* Function to collect all values that has already used in a column */
function numUsedColumn(sudoku, col) {
  let arrNumUsed = [];
  for (r in sudoku) {
    if (sudoku[r][col] != 0) {
      arrNumUsed.push(sudoku[r][col]);
    };
  };
  return arrNumUsed;
};

/* Function to collect all values that has already used in a block */
function numUsedBlock(sudoku, row, col) {
  let arrNumUsed = [];
  const rMin = Math.floor(row / 3) * 3;
  const rMax = rMin + 3
  for (let r = rMin; r < rMax; r++) {
    const cMin = Math.floor(col / 3) * 3;
    const cMax = cMin + 3
    for (let c = cMin; c < cMax; c++) {
      if (sudoku[r][c] != 0) {
        arrNumUsed.push(sudoku[r][c]);
      };
    };
  };
  return arrNumUsed;
};

/* Function to validate sudoku */
function isValidSudoku(sudoku) {
  for (let x = 0; x < sudoku.length; x++) {
    for (let y = 0; y < sudoku[x].length; y++) {
      if (sudoku[x][y] == 0) {
        return false;
      };
    };
  };
  return true;
};

/* ================================================== */

/* Function to print iteration count of generated sudoku */
function printIter() {
  console.clear();
  console.log("Iteration : " + iterCount);
  iterCount++;
}

/* Function to print generated sudoku */
function printSudoku(sudoku) {
  for (let x = 0; x < sudoku.length; x++) {
    console.log(
      sudoku[x][0] + "  " + sudoku[x][1] + "  " + sudoku[x][2] + "  " + "|" + "  " +
      sudoku[x][3] + "  " + sudoku[x][4] + "  " + sudoku[x][5] + "  " + "|" + "  " +
      sudoku[x][6] + "  " + sudoku[x][7] + "  " + sudoku[x][8] + "  "
    );
    if (x == 2 || x == 5)
      console.log("— — — — — — — — — — — — — — — —");
  };
};