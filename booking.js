// Read the movie and showtime details sent from the movie page.
const params = new URLSearchParams(window.location.search);
const movie = params.get("movie") || "Silver Cinemas film";
const date = params.get("date") || "MON 15 JUN";
const time = params.get("time") || "08:00 AM";
const ticketType = params.get("type") || "Regular";
const ticketPrice = ticketType === "Silver Class" ? 14 : 10;
const seatMap = document.querySelector("#seat-map");
const selectedSeatsElement = document.querySelector("#selected-seats");
const selectedFoodElement = document.querySelector("#selected-food");
const ticketTotalElement = document.querySelector("#ticket-total");
const foodTotalElement = document.querySelector("#food-total");
const bookingTotalElement = document.querySelector("#booking-total");
const continueButton = document.querySelector("#continue-button");
const concessionsPanel = document.querySelector("#concessions");
const reviewPanel = document.querySelector("#review");
const confirmationPanel = document.querySelector("#confirmation");

// These are the food and drink choices available during booking.
const concessions = [
    { id: "small-water-combo", name: "Small water combo", price: 7, category: "Combos" },
    { id: "medium-water-combo", name: "Medium water combo", price: 9, category: "Combos" },
    { id: "large-water-combo", name: "Large water combo", price: 11, category: "Combos" },
    { id: "small-drink-combo", name: "Small drink combo", price: 8, category: "Combos" },
    { id: "medium-drink-combo", name: "Medium drink combo", price: 10, category: "Combos" },
    { id: "small-popcorn", name: "Small popcorn", price: 4.5, category: "Popcorn" },
    { id: "medium-popcorn", name: "Medium popcorn", price: 5.5, category: "Popcorn" },
    { id: "small-drink", name: "Small drink", price: 3.5, category: "Drinks" },
    { id: "medium-drink", name: "Medium drink", price: 4.5, category: "Drinks" },
    { id: "nachos-with-cheese", name: "Nachos with cheese", price: 6, category: "Food" },
    { id: "chocolate", name: "Chocolate", price: 3, category: "Confectionery" }
];

// Store the seats and food quantities selected by the customer.
const selectedSeats = new Set();
const foodQuantities = Object.fromEntries(concessions.map(item => [item.id, 0]));
const occupiedSeats = new Set(["A3", "B6", "C2", "D5", "E1", "F7"]);
const currency = value => `£${value.toFixed(2)}`;

// Load food selected earlier on the Food & Drinks page.
try {
    const savedCart = JSON.parse(localStorage.getItem("silverCart") || "[]");
    savedCart.forEach(item => {
        if (foodQuantities[item.id] !== undefined) {
            foodQuantities[item.id] = Number(item.quantity) || 0;
        }
    });
} catch (error) {
    localStorage.removeItem("silverCart");
}

function renderSeats() {
    // Create the cinema seating layout and make available seats clickable.
    const rows = ["A", "B", "C", "D", "E", "F"];
    seatMap.innerHTML = rows.map(row => `
        <div class="seat-row">
            <span class="row-label">${row}</span>
            ${Array.from({ length: 8 }, (_, index) => {
                const seat = `${row}${index + 1}`;
                const isOccupied = occupiedSeats.has(seat);
                return `<button class="seat ${isOccupied ? "occupied" : "available"} ${selectedSeats.has(seat) ? "selected" : ""}" data-seat="${seat}" type="button" ${isOccupied ? "disabled" : ""} aria-label="Seat ${seat}">${index + 1}</button>`;
            }).join("")}
        </div>
    `).join("");

    seatMap.querySelectorAll(".seat.available").forEach(seatButton => {
        seatButton.addEventListener("click", () => {
            const seat = seatButton.dataset.seat;
            selectedSeats.has(seat) ? selectedSeats.delete(seat) : selectedSeats.add(seat);
            renderSeats();
            updateSummary();
        });
    });
}

function foodTotal() {
    // Add the price of each selected food and drink item.
    return concessions.reduce((total, item) => total + item.price * foodQuantities[item.id], 0);
}

function renderConcessions() {
    // Display each concession with buttons for changing its quantity.
    document.querySelector("#concession-list").innerHTML = concessions.map(item => `
        <article class="concession-card">
            <div>
                <p class="concession-category">${item.category}</p>
                <h3>${item.name}</h3>
                <strong>${currency(item.price)}</strong>
            </div>
            <div class="quantity-control" aria-label="Quantity for ${item.name}">
                <button type="button" data-action="decrease" data-id="${item.id}" aria-label="Remove one ${item.name}">-</button>
                <span id="quantity-${item.id}">0</span>
                <button type="button" data-action="increase" data-id="${item.id}" aria-label="Add one ${item.name}">+</button>
            </div>
        </article>
    `).join("");

    document.querySelectorAll(".quantity-control button").forEach(button => {
        button.addEventListener("click", () => {
            const itemId = button.dataset.id;
            const adjustment = button.dataset.action === "increase" ? 1 : -1;
            foodQuantities[itemId] = Math.max(0, foodQuantities[itemId] + adjustment);
            document.querySelector(`#quantity-${itemId}`).textContent = foodQuantities[itemId];
            updateSummary();
        });
    });
}

function updateSummary() {
    // Keep the seat list, food list, and booking prices up to date.
    const seatPrice = selectedSeats.size * ticketPrice;
    const extras = concessions.filter(item => foodQuantities[item.id] > 0);
    selectedSeatsElement.textContent = selectedSeats.size ? [...selectedSeats].sort().join(", ") : "No seats selected";
    selectedFoodElement.innerHTML = extras.length ? extras.map(item => `<span>${item.name} x${foodQuantities[item.id]}</span>`).join("") : "No extras yet";
    ticketTotalElement.textContent = currency(seatPrice);
    foodTotalElement.textContent = currency(foodTotal());
    bookingTotalElement.textContent = currency(seatPrice + foodTotal());
    continueButton.disabled = selectedSeats.size === 0;
}

function renderReview() {
    // Build the final booking details before confirmation.
    const extras = concessions.filter(item => foodQuantities[item.id] > 0);
    document.querySelector("#review-content").innerHTML = `
        <div><span>Film</span><strong>${movie}</strong></div>
        <div><span>Showtime</span><strong>${date} at ${time} · ${ticketType}</strong></div>
        <div><span>Seats</span><strong>${[...selectedSeats].sort().join(", ")}</strong></div>
        <div><span>Extras</span><strong>${extras.length ? extras.map(item => `${item.name} x${foodQuantities[item.id]}`).join(", ") : "None"}</strong></div>
        <div class="review-total"><span>Total</span><strong>${bookingTotalElement.textContent}</strong></div>
    `;
}

function showConcessions() {
    // Reveal the food and drink step after seats have been selected.
    concessionsPanel.hidden = false;
    concessionsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    continueButton.textContent = "Seats selected";
}

function showReview() {
    // Reveal the review step after the customer has chosen any extras.
    renderReview();
    reviewPanel.hidden = false;
    reviewPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function confirmBooking() {
    // Show the confirmation message for this front-end demo booking.
    reviewPanel.hidden = true;
    confirmationPanel.hidden = false;
    document.querySelector("#confirmation-details").textContent = `${movie} · ${date} at ${time}. Seats ${[...selectedSeats].sort().join(", ")} are reserved for you for ${bookingTotalElement.textContent}.`;
    confirmationPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelector("#summary-movie").textContent = movie;
document.querySelector("#summary-showtime").textContent = `${date} · ${time} · ${ticketType}`;
document.querySelector("#booking-details").textContent = `${movie} · ${date} at ${time} · ${ticketType}`;
continueButton.addEventListener("click", showConcessions);
document.querySelector("#review-button").addEventListener("click", showReview);
document.querySelector("#confirm-button").addEventListener("click", confirmBooking);
renderSeats();
renderConcessions();
updateSummary();
