const buttons = document.querySelectorAll("nav button");
const sections = document.querySelectorAll("main section");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        //read target
        const show = button.dataset.target
        const targetSection = document.querySelector(`#${show}`);
        // hide sections 
        sections.forEach((section) => {
            section.classList.add("hidden");
        });
        //show the right section
        targetSection.classList.remove("hidden");
    });
});

const totalButton = document.querySelector("#calculate");

totalButton.addEventListener("click", () => {
    //code calcul
    const arrivalValue = document.querySelector("#arrival").value;
    const arrivalTab = arrivalValue.split(":");
    const arrivalHour = Number(arrivalTab[0]);
    const arrivalMinute = Number(arrivalTab[1]);
    const arrivalTotal = arrivalHour * 60 + arrivalMinute;
    //faire la mm avec la valeur de départ
    const departureValue = document.querySelector("#departure").value;
    const departureTab = departureValue.split(":");
    const departureHour = Number(departureTab[0]);
    const departureMinute = Number(departureTab[1]);
    const departureTotal = departureHour * 60 + departureMinute;
    // soustraire les 2
    const timeTotal = departureTotal - arrivalTotal;
    const timeHour = Math.floor(timeTotal / 60);
    const timeMinute = timeTotal % 60;
    const timeResult = `${String(timeHour).padStart(2, "0")}:${String(timeMinute).padStart(2, "0")}`;
    document.querySelector("#result").textContent = timeResult;
});
