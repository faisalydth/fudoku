const cells = document.querySelectorAll(".cell span");
const keyBtns = document.querySelectorAll("#key button");

/* Function to generate random integer */
function randInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const activate = (elm) => {
	if (elm.length) {
		elm.forEach((e) => {
			e.classList.add("active");
		});
	} else {
		elm.classList.add("active");
	}
};

const deactivate = (elm) => {
	if (elm) {
		elm.forEach((e) => {
			e.classList.remove("active");
		});
	} else {
		document.querySelectorAll(".active").forEach((e) => {
			e.classList.remove("active");
		});
	}
};

const assignValue = (value) => {
	const selectedCell = document.querySelector(".cell #selected");
	if (selectedCell && !selectedCell.classList.contains("disable")) {
		selectedCell.textContent = value;
		value != ""
			? activate([...cells].filter((elm) => elm.textContent == value))
			: "";
		// Sudoku validation
		let cellRemaining = [...cells].filter((elm) => elm.textContent == 0).length;
		if (cellRemaining == 0) {
			deactivate();
			let inputSudoku = getSudoku();
			validateSudoku(inputSudoku);
		};
	};
};

/* ================================================== */

/* Function to validate sudoku */
function validateSudoku(sudoku) {
	let validSudoku = initSudoku();
	for (let i = 0; i < 81; i++) {
		let x = Math.floor(i / 9); // Row
		let y = i % 9; // Column
		if (sudoku[x][y] != 0) {
			let value = sudoku[x][y];
			// Check if the value is more than 1 in this row
			let rowCount = 0;
			for (let i = 0; i < sudoku[x].length; i++) {
				sudoku[x][i] == value ? rowCount++ : null;
			};
			// Check if the value is more than 1 in this column
			let columnCount = 0;
			let arrNumUsedColumn = numUsedColumn(sudoku, y);
			for (let i = 0; i < arrNumUsedColumn.length; i++) {
				arrNumUsedColumn[i] == value ? columnCount++ : null;
			};
			// Check if the value is more than 1 in this block
			let blockCount = 0;
			let arrNumUsedBlock = numUsedBlock(sudoku, x, y);
			for (let i = 0; i < arrNumUsedBlock.length; i++) {
				arrNumUsedBlock[i] == value ? blockCount++ : null;
			};
			// Validate all conditions
			(rowCount > 1 || columnCount > 1 || blockCount > 1)
				? validSudoku[x][y] = -1 // Not valid
				: validSudoku[x][y] = 1; // Valid
		} else {
			validSudoku[x][y] = 0; // Null
		};
	};
	let lineValidSudoku = rearrgSudoku(validSudoku);
	// Apply validation to board game
	for (let i = 0; i < 81; i++) {
		if (lineValidSudoku[i] == -1) {
			if (cells[i].classList.contains("disable") == false) {
				cells[i].classList.add("not-valid");
			};
		};
	};
};

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

/* ================================================== */

// event for cell
cells.forEach((cell) => {
	cell.addEventListener("click", () => {
		try {
			document.querySelector(".cell span#selected").id = "";
		} catch (e) {
			console.error();
		} finally {
			cell.id = "selected";
		}

		let selectedKey = document.querySelector("#key button#selected");
		if (!cell.classList.contains("active")) {
			if (cell.textContent.length > 0) {
				deactivate();
				activate(
					[...cells].filter((elm) => elm.textContent == cell.textContent)
				);
			} else {
				deactivate(
					[...cells].filter((elm) => elm.textContent == cell.textContent)
				);
				activate(cell);
			}

			if (selectedKey) {
				// selectedKey.classList.add("active");
				if (!cell.classList.contains("disable")) {
					valueToAssign = document.querySelector(
						"#key button#selected"
					).textContent;
					// console.log();
					assignValue(
						valueToAssign > 0 && valueToAssign < 9 ? valueToAssign : ""
					);
				}
			}
		} else {
			// console.log(true);
			deactivate();
		}

		if (selectedKey && !selectedKey.classList.contains("active"))
			selectedKey.id = "";
	});
});

// event for key
keyBtns.forEach((keyBtn) => {
	keyBtn.addEventListener("click", () => {
		let selectedCell = document.querySelector(".cell span#selected");
		if (selectedCell) {
			assignValue(
				keyBtn.textContent > 0 || keyBtn.textContent < 0
					? keyBtn.textContent
					: ""
			);
		}
		try {
			document.querySelector("#key button#selected").id = "";
		} catch (e) {
			console.error();
		} finally {
			if (!keyBtn.classList.contains("active")) {
				deactivate();
				activate(
					[...cells]
						.filter((elm) => elm.textContent == keyBtn.textContent)
						.concat(keyBtn)
				);
				keyBtn.id = "selected";
			} else {
				deactivate();
			}
		}
	});
});

// event by keydown
document.addEventListener("keydown", (key) => {
	let selectedCell = document.querySelector(".cell #selected");
	if (/^\d+$/.test(key.key) && key.key > 0) {
		deactivate();
		activate([...cells].filter((elm) => elm.textContent == key.key));
		if (selectedCell) {
			assignValue(key.key);
		}
	}

	if (key.keyCode == 8 || key.keyCode == 46) {
		if (selectedCell) assignValue("");
	}
	if (key.keyCode == 27) {
		deactivate();
		try {
			document.querySelectorAll("#selected").forEach((el) => {
				el.id = "";
			});
		} catch (error) { }
	}
});