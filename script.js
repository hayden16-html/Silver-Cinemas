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