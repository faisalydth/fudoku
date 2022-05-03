const cells = document.querySelectorAll(".cell span");
const keyBtns = document.querySelectorAll("#key button");

cells.forEach((c) => {
	c.addEventListener("click", () => {
		c.id = "selected";
		let activeKey = document.querySelector("#key button.active");
		if (activeKey != null) {
			c.textContent = activeKey.textContent[0];
			c.classList.add("active");
		} else {
			[...cells]
				.filter((cell) => cell.textContent == c.textContent)
				.forEach((fc) => {
					fc.classList.toggle("active");
				});
			[...cells]
				.filter((cell) => cell.textContent != c.textContent)
				.forEach((fc) => {
					fc.classList.remove("active");
				});
		}
	});
});

keyBtns.forEach((key) => {
	key.addEventListener("click", () => {
		let selectedCell = document.querySelector(".cell span#selected");
		if (selectedCell != null) {
			selectedCell.textContent = key.textContent[0];
		}
		key.classList.toggle("active");
		[...keyBtns]
			.filter((keyBtn) => keyBtn != key)
			.forEach((k) => {
				k.classList.remove("active");
			});
		[...cells]
			.filter((cell) => cell.textContent == key.textContent[0])
			.forEach((fc) => {
				fc.classList.toggle("active");
			});
		[...cells]
			.filter((cell) => cell.textContent != key.textContent[0])
			.forEach((fc) => {
				fc.classList.remove("active");
			});
	});
});

myArray = [1, 2, 3, 4, 5, 6, 8, 10];
function partition(array, isValid) {
	return array.reduce(
		([active, inactive], elem) => {
			return isValid(elem)
				? [[...active, elem], inactive]
				: [active, [...inactive, elem]];
		},
		[[], []]
	);
}
console.log([1, 100]);
const x = partition(myArray, (e) => e < 5);
