// Find the food categories and products on the page.
const categoryButtons = document.querySelectorAll(".category-button");
const productCategories = document.querySelectorAll(".product-category");
// Store the prices used by the food basket.
const prices = {
    "Small water combo": 7,
    "Medium water combo": 9,
    "Large water combo": 11,
    "Small drink combo": 8,
    "Medium drink combo": 10,
    "Small popcorn": 4.5,
    "Medium popcorn": 5.5,
    "Large popcorn": 6.5,
    "Small drink": 3.5,
    "Medium drink": 4.5,
    "Nachos with cheese": 6,
    "Chocolate": 3
};

function getCart() {
    // Read the saved food basket from this browser.
    try {
        return JSON.parse(localStorage.getItem("silverCart") || "[]");
    } catch (error) {
        return [];
    }
}

function saveCart(cart) {
    // Save only products that still have a quantity.
    localStorage.setItem("silverCart", JSON.stringify(cart.filter(item => item.quantity > 0)));
}

function addToCart(name, price) {
    // Add a product to the basket or increase its quantity.
    const cart = getCart();
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: name.toLowerCase().replaceAll(" ", "-"), name, price, quantity: 1 });
    }
    saveCart(cart);
    updateCartSummary();
}

function updateCartSummary() {
    // Update the item count and total shown above the products.
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.querySelector("#food-cart-count").textContent = `${count} item${count === 1 ? "" : "s"}`;
    document.querySelector("#food-cart-total").textContent = `NZ$${total.toFixed(2)}`;
}

// Add a price and Add button to every product card.
document.querySelectorAll(".product-card").forEach(card => {
    const name = card.querySelector("h2").textContent.trim();
    const price = prices[name];
    const details = document.createElement("div");
    details.className = "product-details";
    details.innerHTML = `<span>NZ$${price.toFixed(2)}</span><button type="button" class="add-product">Add</button>`;
    details.querySelector(".add-product").addEventListener("click", () => addToCart(name, price));
    card.append(details);
});

// Create the basket summary before the product categories.
const cartSummary = document.createElement("aside");
cartSummary.className = "food-cart-summary";
cartSummary.innerHTML = `<strong>Booking extras</strong><span id="food-cart-count">0 items</span><strong id="food-cart-total">NZ$0.00</strong><a href="./booking.html">Continue</a>`;
document.querySelector(".product-section").before(cartSummary);
updateCartSummary();

// Switch between the different food categories.
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