const cells = document.querySelectorAll(".cell span");
const keyBtns = document.querySelectorAll("#key button");

function activateSameCell(valValid) {
	cells.forEach((cell) => {
		cell.classList.remove("active");
		valValid(cell.textContent)
			? cell.classList.add("active")
			: cell.classList.remove("active");
	});
}
function deactivateSameCell(specified) {
	let sameCell = cells;
	if (specified != null) sameCell = specified;
	if (document.querySelector("#key button.active"))
		document.querySelector("#key button.active").classList.remove("active");
	sameCell.forEach((cell) => {
		cell.classList.remove("active");
	});
}

cells.forEach((cell) => {
	cell.addEventListener("click", () => {
		if (document.querySelector("#key button.active") != null)
			cell.textContent =
				document.querySelector("#key button.active").textContent;
		if (!cell.classList.contains("disable")) selectedCell = cell;
		cell.classList.contains("active")
			? (deactivateSameCell(), (selectedCell = undefined))
			: cell.textContent.length > 0
			? activateSameCell((e) => e == cell.textContent)
			: (deactivateSameCell(
					[...cells].filter((e) => e.textContent.length == 0)
			  ),
			  cell.classList.toggle("active"));
	});
});

keyBtns.forEach((keybtn) => {
	keybtn.addEventListener("click", () => {
		if (typeof selectedCell != "undefined")
			selectedCell.textContent = keybtn.textContent;
		for (let sibling of keybtn.parentNode.parentNode.children) {
			btn = sibling.querySelector("button");
			btn === keybtn
				? btn.classList.toggle("active")
				: btn.classList.remove("active");
		}

		!keybtn.classList.contains("active")
			? deactivateSameCell()
			: activateSameCell((e) => e == keybtn.textContent);
	});
});

document.addEventListener("keydown", (key) => {
	// check key is number and higher than 0
	typeof selectedCell !== "undefined"
		? /^\d+$/.test(key.key) && key.key > 0
			? ((selectedCell.textContent = key.key),
			  activateSameCell((e) => e == key.key))
			: key.keyCode == 8 || key.keyCode == 46
			? (selectedCell.textContent = "")
			: ""
		: "";
});
// myArray = [1, 2, 3, 4, 5, 6, 8, 10];
// function partition(array, isValid) {
// 	return array.reduce(
// 		([active, inactive], elem) => {
// 			return isValid(elem)
// 				? [[...active, elem], inactive]
// 				: [active, [...inactive, elem]];
// 		},
// 		[[], []]
// 	);
// }
// const x = partition(myArray, (e) => e < 5);
