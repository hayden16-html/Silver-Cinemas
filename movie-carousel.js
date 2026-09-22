// Find every carousel wrapper on the page
const wrappers = document.querySelectorAll(".carousel-wrapper");

// Loop through each carousel individually
wrappers.forEach(wrapper => {

    // Find the carousel inside this wrapper
    const carousel = wrapper.querySelector(".now-showing-carousel");

    // Find all of the movie cards inside this carousel
    const cards = wrapper.querySelectorAll(".movie-card, .coming-soon-card");

    // Find the left and right buttons for this carousel
    const leftButton = wrapper.querySelector(".carousel-left");
    const rightButton = wrapper.querySelector(".carousel-right");


    // -------------------------------------------------------
    // Function: Find which card is currently closest
    // to the left side of the carousel
    // -------------------------------------------------------
    function getCurrentCardIndex() {

        // Current horizontal scroll position
        const carouselLeft = carousel.scrollLeft;

        // Variables used to remember the closest card
        let closestIndex = 0;
        let closestDistance = Infinity;

        // Check every card
        cards.forEach((card, index) => {

            // Calculate how far this card is from the current scroll position
            const distance = Math.abs(card.offsetLeft - carouselLeft);

            // If this card is closer than the previous closest,
            // remember it
            if (distance < closestDistance) {

                closestDistance = distance;
                closestIndex = index;

            }

        });

        // Return the index of the closest card
        return closestIndex;

    }


    // -------------------------------------------------------
    // RIGHT BUTTON
    // -------------------------------------------------------
    rightButton.addEventListener("click", () => {

        // Find which card is currently visible
        const currentIndex = getCurrentCardIndex();

        // Only scroll if there is another card to the right
        if (currentIndex < cards.length - 1) {

            cards[currentIndex + 1].scrollIntoView({

                behavior: "smooth",
                inline: "start",
                block: "nearest"

            });

        }

    });


    // -------------------------------------------------------
    // LEFT BUTTON
    // -------------------------------------------------------
    leftButton.addEventListener("click", () => {

        // Find which card is currently visible
        const currentIndex = getCurrentCardIndex();

        // Only scroll if there is another card to the left
        if (currentIndex > 0) {

            cards[currentIndex - 1].scrollIntoView({

                behavior: "smooth",
                inline: "start",
                block: "nearest"

            });

        }

    });

});