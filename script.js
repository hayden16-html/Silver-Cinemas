// Find every menu container on the page
const menuContainers = document.querySelectorAll(".menu-container");

// Set up the menu functionality for each menu container
menuContainers.forEach(menuContainer => {

    // Find the button inside THIS menu container
    const menuButton = menuContainer.querySelector(".menu-button");

    // Find the menu inside THIS menu container
    const menu = menuContainer.querySelector(".menu");

    // When the button is clicked
    menuButton.addEventListener("click", function () {

        // Open or close the menu
        menu.classList.toggle("menu-open");

    });

});

// Send a selected showtime into the seat and concessions flow.
const showtimeButtons = document.querySelectorAll(".showtime-button");
const movieTitleElement = document.querySelector(".movie-text h1");
const activeDateElement = document.querySelector(".date-button.active");

showtimeButtons.forEach(showtimeButton => {
    showtimeButton.addEventListener("click", () => {
        const time = showtimeButton.querySelector("span").textContent.trim();
        const type = showtimeButton.querySelector("small").textContent.trim();
        const movieTitle = movieTitleElement ? movieTitleElement.textContent.trim() : "Silver Cinemas film";
        const date = activeDateElement ? activeDateElement.textContent.trim() : "MON 15 JUN";
        const bookingUrl = new URL("../booking.html", window.location.href);

        bookingUrl.searchParams.set("movie", movieTitle);
        bookingUrl.searchParams.set("date", date);
        bookingUrl.searchParams.set("time", time);
        bookingUrl.searchParams.set("type", type);
        window.location.href = bookingUrl.href;
    });
});