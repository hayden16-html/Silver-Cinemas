// Search the movies available on the site and open the selected title.
// Keep the movie names and aliases in one list for matching.
const movieSearchCatalog = [
    { title: "The Backrooms", aliases: ["Backrooms"], path: "Backrooms.html" },
    { title: "Disclosure Day", aliases: ["Disclosure"], path: "Disclosure-Day.html" },
    { title: "Michael", aliases: [], path: "Michael.html" },
    { title: "Minions & Monsters", aliases: ["Minions and Monsters"], path: "Minions&Monsters.html" },
    { title: "Moana (Live Action)", aliases: ["Moana", "Moana Live Action"], path: "Moana-LA.html" },
    { title: "Obsession", aliases: [], path: "Obsession.html" },
    { title: "Spider-Man: Brand New Day", aliases: ["Spider Man", "Spiderman", "Brand New Day"], path: "Spiderman-BND.html" },
    { title: "Supergirl", aliases: [], path: "Supergirl.html" },
    { title: "Toy Story 5", aliases: ["Toy Story"], path: "Toy-Story-5.html" }
];

const normalizeMovieSearch = value => value.toLowerCase().replace(/[^a-z0-9]/g, "");
// Use a different link prefix depending on the current page folder.
const searchIsOnMoviePage = window.location.pathname.includes("/movies/");
const moviePagePrefix = searchIsOnMoviePage ? "" : "movies/";

document.querySelectorAll(".search-container").forEach(container => {
    const input = container.querySelector("input");
    const clearButton = container.querySelector(".clear-button");

    if (!input) return;

    const results = document.createElement("div");
    results.className = "search-results";
    results.setAttribute("role", "listbox");
    results.hidden = true;
    container.appendChild(results);

    input.setAttribute("aria-label", "Search movies");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("autocomplete", "off");
    input.setAttribute("aria-expanded", "false");

    let activeResultIndex = -1;
    let currentMatches = [];

    // Open the matching movie page from either a suggestion or the keyboard.
    function navigateToMovie(movie) {
        window.location.href = `${moviePagePrefix}${movie.path}`;
    }

    function closeResults() {
        results.hidden = true;
        input.setAttribute("aria-expanded", "false");
        activeResultIndex = -1;
    }

    function renderResults() {
        const query = normalizeMovieSearch(input.value.trim());
        results.replaceChildren();
        activeResultIndex = -1;

        if (!query) {
            currentMatches = [];
            closeResults();
            return;
        }

        // Match titles and aliases, then show title matches before partial matches.
        currentMatches = movieSearchCatalog.filter(movie =>
            [movie.title, ...movie.aliases].some(name => normalizeMovieSearch(name).includes(query))
        ).sort((a, b) => {
            const aStarts = normalizeMovieSearch(a.title).startsWith(query);
            const bStarts = normalizeMovieSearch(b.title).startsWith(query);
            return Number(bStarts) - Number(aStarts);
        });

        if (!currentMatches.length) {
            const emptyMessage = document.createElement("div");
            emptyMessage.className = "search-no-results";
            emptyMessage.textContent = "No movies found";
            results.appendChild(emptyMessage);
        } else {
            currentMatches.forEach((movie, index) => {
                const result = document.createElement("a");
                result.className = "search-result";
                result.href = `${moviePagePrefix}${movie.path}`;
                result.setAttribute("role", "option");
                result.textContent = movie.title;
                result.addEventListener("mouseenter", () => setActiveResult(index));
                results.appendChild(result);
            });
        }

        results.hidden = false;
        input.setAttribute("aria-expanded", "true");
    }

    function setActiveResult(index) {
        const options = results.querySelectorAll(".search-result");
        options.forEach(option => option.classList.remove("active"));
        activeResultIndex = index;
        if (options[index]) {
            options[index].classList.add("active");
            input.setAttribute("aria-activedescendant", `movie-search-result-${index}`);
            options[index].id = `movie-search-result-${index}`;
        } else {
            input.removeAttribute("aria-activedescendant");
        }
    }

    input.addEventListener("input", renderResults);
    // Let visitors choose a suggestion without using the mouse.
    input.addEventListener("keydown", event => {
        if (event.key === "ArrowDown" && currentMatches.length) {
            event.preventDefault();
            setActiveResult((activeResultIndex + 1) % currentMatches.length);
        } else if (event.key === "ArrowUp" && currentMatches.length) {
            event.preventDefault();
            setActiveResult((activeResultIndex - 1 + currentMatches.length) % currentMatches.length);
        } else if (event.key === "Enter" && currentMatches.length) {
            event.preventDefault();
            navigateToMovie(currentMatches[activeResultIndex] || currentMatches[0]);
        } else if (event.key === "Escape") {
            closeResults();
        }
    });

    if (clearButton) {
        clearButton.type = "button";
        clearButton.setAttribute("aria-label", "Clear movie search");
        clearButton.addEventListener("click", () => {
            input.value = "";
            currentMatches = [];
            closeResults();
            input.focus();
        });
    }

    document.addEventListener("click", event => {
        // Close the suggestion list when the click is outside the search box.
        if (!container.contains(event.target)) closeResults();
    });
});