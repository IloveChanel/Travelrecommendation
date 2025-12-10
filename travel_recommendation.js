
// travel_recommendation.js

let travelData = null;

document.addEventListener("DOMContentLoaded", () => {
    // Load JSON data
    loadTravelData();

    const searchBtn = document.getElementById("searchBtn");
    const clearBtn = document.getElementById("clearBtn");

    if (searchBtn) {
        searchBtn.addEventListener("click", handleSearch);
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", clearResults);
    }
});

// Task 6: Fetch data from JSON
async function loadTravelData() {
    try {
        const response = await fetch("travel_recommendation_api.json");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        travelData = await response.json();
        console.log("Travel data loaded:", travelData);
    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}

// Task 7 & 8: Handle keyword search
function handleSearch() {
    const input = document.getElementById("searchInput");
    const resultsContainer = document.getElementById("results");

    if (!input || !resultsContainer) return;

    const keyword = input.value.trim().toLowerCase();

    if (!keyword) {
        resultsContainer.innerHTML = "<p>Please enter a keyword.</p>";
        return;
    }

    if (!travelData) {
        resultsContainer.innerHTML = "<p>Data not loaded yet. Try again in a moment.</p>";
        return;
    }

    let matches = [];

    // Accept variations: beach/beaches, temple/temples, country/countries
    if (keyword.includes("beach")) {
        matches = travelData.beaches || [];
    } else if (keyword.includes("temple")) {
        matches = travelData.temples || [];
    } else if (keyword.includes("country")) {
        // For countries, show all cities inside countries
        (travelData.countries || []).forEach(country => {
            if (country.cities && Array.isArray(country.cities)) {
                matches = matches.concat(country.cities);
            }
        });
    } else {
        resultsContainer.innerHTML =
            "<p>No results. Try keywords like <strong>beach</strong>, <strong>temple</strong>, or <strong>country</strong>.</p>";
        return;
    }

    renderResults(matches);
}

// Task 8: Display recommendations
function renderResults(list) {
    const resultsContainer = document.getElementById("results");
    if (!resultsContainer) return;

    if (!list || list.length === 0) {
        resultsContainer.innerHTML = "<p>No recommendations found.</p>";
        return;
    }

    const cards = list
        .map(item => {
            const time = getLocalTimeForPlace(item.name); // Optional Task 10
            return `
                <article class="card">
                    <img src="${item.imageUrl}" alt="${item.name}" />
                    <h2>${item.name}</h2>
                    <p>${item.description}</p>
                    ${
                        time
                            ? `<p class="card-time">Local time: ${time}</p>`
                            : ""
                    }
                    <a href="#" class="card-visit">Visit</a>
                </article>
            `;
        })
        .join("");

    resultsContainer.innerHTML = cards;
}

// Task 9: Clear button logic
function clearResults() {
    const resultsContainer = document.getElementById("results");
    const input = document.getElementById("searchInput");

    if (resultsContainer) {
        resultsContainer.innerHTML = "";
    }
    if (input) {
        input.value = "";
    }
}

// Task 10 (optional): Show local time in country
function getLocalTimeForPlace(placeName) {
    if (!placeName) return null;

    const lower = placeName.toLowerCase();
    let timeZone = null;

    if (lower.includes("australia")) {
        timeZone = "Australia/Sydney";
    } else if (lower.includes("japan")) {
        timeZone = "Asia/Tokyo";
    } else if (lower.includes("brazil")) {
        timeZone = "America/Sao_Paulo";
    } else if (lower.includes("cambodia")) {
        timeZone = "Asia/Phnom_Penh";
    } else if (lower.includes("india")) {
        timeZone = "Asia/Kolkata";
    } else if (lower.includes("french polynesia")) {
        timeZone = "Pacific/Tahiti";
    }

    if (!timeZone) {
        return null;
    }

    const options = {
        timeZone: timeZone,
        hour12: true,
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    };

    return new Date().toLocaleTimeString("en-US", options);
}
