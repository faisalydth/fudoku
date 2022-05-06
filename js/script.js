const navBttn = document.querySelectorAll(".nav-bttn");
const popupClose = document.querySelectorAll(".popup-close");
const cells = document.querySelectorAll(".cell span");
const keyBtns = document.querySelectorAll("#key button");

/* Function to generate random integer */
function randInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const calculateRemainingNum = () => {
	const array = [];
	for (let index = 1; index <= 9; index++) {
		array.push([...cells].filter((elm) => elm.textContent == index).length);
	}
	const remainNum = document.querySelectorAll("#key span");
	for (let i = 0; i < remainNum.length; i++) {
		array[i] > 9
			? (remainNum[i].textContent = `+${array[i] - 9}`)
			: (remainNum[i].textContent = 9 - array[i]);
	}
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
		cells.forEach((cell) => {
			cell.classList.remove("not-valid");
		});
		value != ""
			? activate([...cells].filter((elm) => elm.textContent == value))
			: "";
		// Sudoku validation
		let cellRemaining = [...cells].filter((elm) => elm.textContent == 0).length;
		if (cellRemaining == 0) {
			deactivate();
			let inputSudoku = getSudoku();
			validateSudoku(inputSudoku);
		}
	}
	calculateRemainingNum();
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
			}
			// Check if the value is more than 1 in this column
			let columnCount = 0;
			let arrNumUsedColumn = numUsedColumn(sudoku, y);
			for (let i = 0; i < arrNumUsedColumn.length; i++) {
				arrNumUsedColumn[i] == value ? columnCount++ : null;
			}
			// Check if the value is more than 1 in this block
			let blockCount = 0;
			let arrNumUsedBlock = numUsedBlock(sudoku, x, y);
			for (let i = 0; i < arrNumUsedBlock.length; i++) {
				arrNumUsedBlock[i] == value ? blockCount++ : null;
			}
			// Validate all conditions
			rowCount > 1 || columnCount > 1 || blockCount > 1
				? (validSudoku[x][y] = -1) // Not valid
				: (validSudoku[x][y] = 1); // Valid
		} else {
			validSudoku[x][y] = 0; // Null
		}
	}
	let lineValidSudoku = rearrgSudoku(validSudoku);
	// Apply validation to board game
	for (let i = 0; i < 81; i++) {
		if (lineValidSudoku[i] == -1) {
			cells[i].classList.add("not-valid");
		}
	}

	let selectedKey = document.querySelector("#key button#selected");
	if (selectedKey) selectedKey.id = "";
}

/* Function to get sudoku input from user */
function getSudoku() {
	let inputSudoku = [];
	for (let n = 0; n < 3; n++) {
		for (let i = 0; i < 3; i++) {
			let row = [];
			for (let m = 0; m < 3; m++) {
				let c = i * 3 + m * 9 + n * 27;
				let cMax = i * 3 + m * 9 + n * 27 + 3;
				for (let j = c; j < cMax; j++) {
					let value = 0;
					if (parseInt(cells[j].innerHTML) > 0) {
						value = parseInt(cells[j].innerHTML);
					}
					row.push(value);
				}
			}
			inputSudoku.push(row);
		}
	}
	return inputSudoku;
}

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
		} else {
			if (selectedKey) {
				selectedKey.id = "";
			}
			// 	console.log(cell.textContent);
			// 	// console.log(cell.classList.contains("active"));
			// } else {
			deactivate();
			cell.id = "";
			// }
		}

		if (selectedKey && selectedKey.id != "") {
			// console.log(selectedKey.id == "");
			// selectedKey.classList.add("active");
			if (!cell.classList.contains("disable")) {
				selectedKey.classList.add("active");
				deactivate(
					[...cells].filter((elm) => elm.textContent == cell.textContent)
				);
				valueToAssign = document.querySelector(
					"#key button#selected"
				).textContent;
				assignValue(
					valueToAssign > 0 && valueToAssign < 10 ? valueToAssign : ""
				);
			}
		}
	});
});

// event for key
keyBtns.forEach((keyBtn) => {
	keyBtn.addEventListener("click", () => {
		let selectedCell = document.querySelector(".cell span#selected");
		let selectedKey = document.querySelector("#key button#selected");

		try {
			selectedKey.id = "";
		} catch (e) {
			console.error();
		} finally {
			if (!keyBtn.classList.contains("active")) {
				deactivate();
				keyBtn.textContent > 0 || keyBtn.textContent < 0
					? activate(
							[...cells]
								.filter((elm) => elm.textContent == keyBtn.textContent)
								.concat(keyBtn),
							(keyBtn.id = "selected")
					  )
					: "";
			} else {
				deactivate();
				selectedKey.id = "";
				if (selectedCell) selectedCell.id = "";
			}
			// console.log(selectedKey);
			if (selectedCell && !selectedKey) {
				assignValue(
					keyBtn.textContent > 0 || keyBtn.textContent < 10
						? keyBtn.textContent
						: ""
				);

				// keyBtn.id = "";
			}

			if (keyBtn.textContent == "") {
				if (selectedCell) {
					assignValue("");
					selectedCell.id = "";
				}
			}
		}
	});
});

// event by keydown
document.addEventListener("keydown", (key) => {
	let selectedCell = document.querySelector(".cell #selected");
	if (/^\d+$/.test(key.key) && key.key > 0) {
		if (selectedCell) {
			assignValue(key.key);
		}
		deactivate();
		activate([...cells].filter((elm) => elm.textContent == key.key));
	}

	if (key.keyCode == 8 || key.keyCode == 46) {
		deactivate();
		if (selectedCell) assignValue("");
	}
	if (key.keyCode == 27) {
		deactivate();
		try {
			document.querySelectorAll("#selected").forEach((el) => {
				el.id = "";
			});
		} catch (error) {}
	}
});

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
	document.getElementById("difficulty-list").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
	if (!event.target.matches(".dropdown-button")) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains("show")) {
				openDropdown.classList.remove("show");
			}
		}
	}
};

// POPUP
// Add click listener each navigation button to open n close popup window
navBttn.forEach((navBttn) => {
	navBttn.addEventListener("click", () => {
		const parent = navBttn.parentElement;
		const popup = parent.querySelector(".popup");
		popup.classList.remove("hidden");
	});
});
popupClose.forEach((close) => {
	close.addEventListener("click", () => {
		const parent = close.parentElement;
		parent.parentElement.classList.add("hidden");
	});
});

// DARK MODE
const darkMode = document.getElementById("dark-mode");
// Set dark by click toggle switch
darkMode.addEventListener("click", () => {
	const html = document.querySelector("html");
	darkMode.checked ? html.classList.add("dark") : html.classList.remove("dark");
});
// Set dark whenever system theme change
window
	.matchMedia("(prefers-color-scheme: dark)")
	.addEventListener("change", function (e) {
		darkMode.click();
	});
// Set dark if system theme is dark on first load
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
	darkMode.click();
}
