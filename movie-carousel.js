const movieCarousel = document.querySelector(".now-showing-carousel");

document.querySelector(".carousel-right").addEventListener("click", () => {

    movieCarousel.scrollBy({
        left: 240,
        behavior: "smooth"
    });

});

document.querySelector(".carousel-left").addEventListener("click", () => {

    movieCarousel.scrollBy({
        left: -240,
        behavior: "smooth"
    });

});