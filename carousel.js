// Keeps track of which slide is currently being displayed.
// The slideshow starts on the first slide.
let slideIndex = 1;

// Displays the first slide when the page loads.
showSlides(slideIndex);

// Automatically moves to the next slide every 5 seconds.
setInterval(function () {
    plusSlides(1);
}, 5000);

// Moves forwards or backwards through the slideshow.
// A value of 1 moves to the next slide.
// A value of -1 moves to the previous slide.
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Displays the slide selected by clicking one of the navigation dots.
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Controls which slide is currently visible.
function showSlides(n) {

    // Stores all slideshow images in an array-like collection.
    const slides = document.getElementsByClassName("mySlides");

    // Stores all of the navigation dots.
    const dots = document.getElementsByClassName("dot");

    // If the user goes past the last slide,
    // return to the first slide.
    if (n > slides.length) {
        slideIndex = 1;
    }

    // If the user goes before the first slide,
    // go to the last slide.
    if (n < 1) {
        slideIndex = slides.length;
    }

    // Hide every slide.
    // Only the current slide will be shown afterwards.
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove the active highlight from every navigation dot.
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    // Display the current slide.
    slides[slideIndex - 1].style.display = "block";

    // Highlight the dot that matches the current slide.
    dots[slideIndex - 1].classList.add("active");
}