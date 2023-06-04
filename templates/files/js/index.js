const now = new Date();
const dateTime = document.getElementById("date-time");

const minDateTimeISO = now.toISOString().slice(0, 16);

const utcHour = now.getUTCHours();
const utcMinute = now.getUTCMinutes();

const currentUrl = window.location.href;

const successURL = `${currentUrl}requestSuccess.html`;
const failURL = `${currentUrl}requestFail.html`;

window.onload = function () {
	const element = document.querySelector(".main-container");
	element.classList.add("show");
};

flatpickr("#date-time", {
	minDate: now.toISOString().slice(0, 16),
	enableTime: true,
	disableMobile: true,
	dateFormat: "Y-m-d H:i",
	onChange: dateChange,
});

var dateCheck = false;
var txnHashCheck = false;

function dateChange(selectedDates, dateStr, instance) {
	const time = new Date(new Date().getTime() + 12 * 60000);
	const requiredTime = time.toISOString().slice(0, 16);
	const selectedDate = dateStr.replace(" ", "T");
	dateCheck = selectedDate > requiredTime;
	changeHandler();
}

function inputChange(e) {
	const txnHash = e.target.value;
	txnHashCheck = txnHash != "";
	changeHandler();
}

function changeHandler() {
	const button = document.getElementById("confirm-btn");
	const status = dateCheck && txnHashCheck;

	if (status) {
		button.disabled = false;
	} else {
		button.disabled = true;
	}
}

document.getElementById(
	"current-time-display"
).innerText = `${utcHour}:${
	utcMinute > 9 ? utcMinute : "0" + utcMinute
} ${utcHour > 11 ? "P.M." : "A.M."}`;

document.getElementById("copy-text").addEventListener("click", () => {
	navigator.clipboard.writeText(
		document.getElementById("text-copy").innerText
	);
	document.getElementById("copy").style.display = "none";
	document.getElementById("copied").style.display = "block";
});

const submitForm = () => {
	const status = true;

	// Form Submission Code here //
	// If form submission failed change status to false //

	if (status) {
		window.location.href = successURL;
	} else {
		window.location.href = failURL;
	}
};

document
	.getElementById("txn-hash")
	.addEventListener("input", inputChange);
