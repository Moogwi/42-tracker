// --- DOM references ---
const navButtons = document.querySelectorAll("nav button");
const sections = document.querySelectorAll("main section");
const arrivalInput = document.querySelector("#arrival");
const departureInput = document.querySelector("#departure");
const totalButton = document.querySelector("#calculate");
const daysBody = document.querySelector("#days-body");
const weekOutput = document.querySelector("#week");

// =========================================
//  NAVIGATION
// =========================================

navButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const show = button.dataset.target
        const targetSection = document.querySelector(`#${show}`);
        sections.forEach((section) => {
            section.classList.add("hidden");
        });
        targetSection.classList.remove("hidden");
    });
});

// =========================================
//  ATTENDANCE CALCULATOR
// =========================================

const days = [];

function formatMinutes(minutes) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    const result = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
    return result;
}

function timeToMinute(value) {
    const tab = value.split(":");
    const hours = Number(tab[0]);
    const minutes = Number(tab[1]);
    const total = hours * 60 + minutes;
    return total;
}

function renderTable() {
    daysBody.innerHTML = "";
    days.forEach((day) => {
       daysBody.innerHTML += `<tr><td>${day.date}</td><td>${day.arrival}</td><td>${day.departure}</td><td>${day.total}</td></tr>`
    });
}

function renderTotalDays() {
    let totalMinute = 0
    days.forEach((day) => {
        totalMinute += day.minutes;
    });
    const weekResult = formatMinutes(totalMinute)
    weekOutput.textContent = weekResult;
}

totalButton.addEventListener("click", () => {
    const arrivalValue = arrivalInput.value;
    const arrivalTotal = timeToMinute(arrivalValue);
    const departureValue = departureInput.value;
    const departureTotal = timeToMinute(departureValue);
    const timeTotal = departureTotal - arrivalTotal;
    const timeResult = formatMinutes(timeTotal);
    const today = new Date();
    const dateStr = today.toLocaleDateString("fr-FR");
    const day = {
        date: dateStr, 
        arrival: arrivalValue,
        departure: departureValue,
        total: timeResult,
        minutes: timeTotal,
    }
    days.push(day);
    console.log(days);
    renderTable();
    renderTotalDays();
});
