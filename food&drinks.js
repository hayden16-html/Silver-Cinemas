const categoryButtons = document.querySelectorAll(".category-button");
const productCategories = document.querySelectorAll(".product-category");

categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Get the category that was clicked
        const category = button.dataset.category;

        // Hide every product category
        productCategories.forEach(function(section) {
            section.style.display = "none";
        });

        // Show the selected category
        document.getElementById(category).style.display = "flex";

        // Remove active from every button
        categoryButtons.forEach(function(button) {
            button.classList.remove("active");
        });

        // Make the clicked button active
        button.classList.add("active");

    });

});