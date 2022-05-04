const cells = document.querySelectorAll(".cell span");
const keyBtns = document.querySelectorAll("#key button");

const randInt = (min, max) => {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
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
		console.log(value);
		value != ""
			? activate([...cells].filter((elm) => elm.textContent == value))
			: "";
	}
};

// init cell
cells.forEach((cell) => {
	let value = randInt(-9, 9);
	value > 0
		? ((cell.textContent = value), cell.classList.add("disable"))
		: (cell.textContent = "");
});

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
					console.log();
					assignValue(
						valueToAssign > 0 && valueToAssign < 9 ? valueToAssign : ""
					);
				}
			}
		} else {
			console.log(true);
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
		} catch (error) {}
	}
});