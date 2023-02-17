const rangeInput = document.querySelector(".range");
const paymentPeriod = document.querySelector(".period");
const checkInput = document.querySelector("#billing-method");
const toggleLabel = document.querySelector(".toggle");
const test = document.getElementById("year");
const views = document.querySelector(".views");
const priceElement = document.querySelector(".value");

const priceTable = new Map([
	[{ view: "0", value: 0 }, 0],
	[{ view: "10K", value: 2 }, 8],
	[{ view: "50K", value: 4 }, 12],
	[{ view: "100K", value: 6 }, 16],
	[{ view: "500K", value: 8 }, 24],
	[{ view: "1M", value: 10 }, 36],
]);

let yearly = true;
let month = 0;

toggleLabel.addEventListener("keydown", (e) => {
	if (!e.key.trim().length) {
		let event = new MouseEvent("click");
		test.dispatchEvent(event);
	}
});

rangeInput.addEventListener("input", handleColor);
checkInput.addEventListener("change", handleCheck);

function calculatePrice(year = false, monthlyPrice = 0) {
	let text;
	if (year) text = monthlyPrice * 12 * 0.75;
	else text = monthlyPrice;
	priceElement.textContent = `${new Intl.NumberFormat("en-EN", {
		style: "currency",
		currency: "USD",
	}).format(text)}`;
}

function handleCheck(e) {
	let text = !e.target.checked ? "/year" : "/month";
	yearly = !e.target.checked;
	calculatePrice(yearly, month);
	paymentPeriod.textContent = text;
}

function handleColor(e) {
	let percentage = (e.target.value * 100) / 10;
	let [{ view }, price] = [...priceTable].find(
		([key, val]) => key.value == e.target.value
	);

	month = price;

	views.textContent = `${view} PAGEVIEWS`;

	calculatePrice(yearly, price);

	document.body.style.setProperty(
		"--range-color",
		`to right,hsl(174, 77%, 80%) ${percentage}%, hsl(224, 65%, 95%) ${percentage}%`
	);
}
