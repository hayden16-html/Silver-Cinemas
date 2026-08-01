const wrappers = document.querySelectorAll(".carousel-wrapper");

wrappers.forEach(wrapper => {

    const carousel = wrapper.querySelector(".now-showing-carousel");
    const leftButton = wrapper.querySelector(".carousel-left");
    const rightButton = wrapper.querySelector(".carousel-right");

    rightButton.addEventListener("click", () => {

        carousel.scrollBy({
            left: 260,
            behavior: "smooth"
        });

    });

    leftButton.addEventListener("click", () => {

        carousel.scrollBy({
            left: -260,
            behavior: "smooth"
        });

    });

});