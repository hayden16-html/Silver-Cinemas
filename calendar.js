const calendarDays = document.querySelector("#calendar-days");
const calendarMonth = document.querySelector("#calendar-month");

const previousButton = document.querySelector(".calendar-prev");
const nextButton = document.querySelector(".calendar-next");

let currentDate = new Date(2026, 5, 1);


let selectedDate = new Date(2026, 5, 15);


function createCalendar() {

    // Remove the old calendar dates
    calendarDays.innerHTML = "";


    // Get current month and year
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();


    // Display month and year
    const monthName = currentDate.toLocaleString("default", {
        month: "long"
    });

    calendarMonth.textContent = `${monthName} ${year}`;


    // Find the first day of the month
    const firstDay = new Date(year, month, 1).getDay();


    // Find how many days are in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();


    // Add blank spaces before the first day
    for (let i = 0; i < firstDay; i++) {

        const emptyDay = document.createElement("span");

        calendarDays.appendChild(emptyDay);

    }


    // Create each day
    for (let day = 1; day <= daysInMonth; day++) {

        const button = document.createElement("button");

        button.textContent = day;


        // Check if this is the selected date
        if (
            day === selectedDate.getDate() &&
            month === selectedDate.getMonth() &&
            year === selectedDate.getFullYear()
        ) {

            button.classList.add("selected");

        }


        // When a date is clicked
        button.addEventListener("click", () => {

            selectedDate = new Date(year, month, day);

            createCalendar();

            updateDateSelection();

        });


        calendarDays.appendChild(button);

    }

}


// Previous month

previousButton.addEventListener("click", () => {

    currentDate.setMonth(currentDate.getMonth() - 1);

    createCalendar();

});


// Next month

nextButton.addEventListener("click", () => {

    currentDate.setMonth(currentDate.getMonth() + 1);

    createCalendar();

});


function updateDateSelection() {

    const dateButtons =
        document.querySelectorAll(".date-button");


    dateButtons.forEach(button => {
        button.classList.remove("active");
    });


    // Find the day that was selected
    const selectedDay = selectedDate.getDate();


    // For now, update the first date button
    dateButtons[0].textContent =
        selectedDate.toLocaleDateString("en-NZ", {
            weekday: "short",
            day: "2-digit",
            month: "short"
        }).toUpperCase();


    dateButtons[0].classList.add("active");

}


// Create calendar when page loads

createCalendar();