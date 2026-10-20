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

// Show a simple demo sign-in form when the login button is pressed.
const loginButtons = document.querySelectorAll(".login-button");

if (loginButtons.length) {
    const loginDialog = document.createElement("dialog");
    loginDialog.className = "login-dialog";
    loginDialog.innerHTML = `
        <div class="login-dialog-heading">
            <h2 id="login-dialog-title">Welcome back</h2>
            <button class="login-dialog-close" type="button" aria-label="Close">&times;</button>
        </div>
        <p class="login-dialog-intro">Sign in to your Silver Cinemas account.</p>
        <form class="login-dialog-form">
            <label for="login-email">Email address</label>
            <input id="login-email" name="email" type="email" autocomplete="email" required>
            <label for="login-password">Password</label>
            <input id="login-password" name="password" type="password" autocomplete="current-password" required>
            <button class="login-dialog-submit" type="submit">Sign in</button>
        </form>
        <p class="login-dialog-message" aria-live="polite"></p>
        <button class="login-dialog-switch" type="button">Need an account? Sign up</button>
        <p class="login-dialog-note">Demo only. Your details are not sent or saved.</p>
    `;
    document.body.append(loginDialog);

    const loginTitle = loginDialog.querySelector("#login-dialog-title");
    const loginIntro = loginDialog.querySelector(".login-dialog-intro");
    const loginForm = loginDialog.querySelector(".login-dialog-form");
    const passwordInput = loginDialog.querySelector("#login-password");
    const submitButton = loginDialog.querySelector(".login-dialog-submit");
    const message = loginDialog.querySelector(".login-dialog-message");
    const switchButton = loginDialog.querySelector(".login-dialog-switch");
    let isSignUp = false;

    loginButtons.forEach(button => {
        button.addEventListener("click", () => {
            message.textContent = "";
            loginDialog.showModal();
        });
    });

    loginDialog.querySelector(".login-dialog-close").addEventListener("click", () => loginDialog.close());
    loginDialog.addEventListener("click", event => {
        if (event.target === loginDialog) loginDialog.close();
    });

    switchButton.addEventListener("click", () => {
        isSignUp = !isSignUp;
        loginTitle.textContent = isSignUp ? "Create your account" : "Welcome back";
        loginIntro.textContent = isSignUp
            ? "Sign up for a Silver Cinemas account."
            : "Sign in to your Silver Cinemas account.";
        submitButton.textContent = isSignUp ? "Create account" : "Sign in";
        passwordInput.autocomplete = isSignUp ? "new-password" : "current-password";
        switchButton.textContent = isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up";
        message.textContent = "";
    });

    loginForm.addEventListener("submit", event => {
        event.preventDefault();
        message.textContent = isSignUp
            ? "Thanks for signing up. Account creation is a demo feature."
            : "Thanks for signing in. Login is a demo feature.";
        passwordInput.value = "";
    });
}

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