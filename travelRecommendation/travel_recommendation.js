// Travel Recommendation JavaScript
let travelData = null;

// Fallback image for when images fail to load
const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22%3E%3Crect fill=%22%23ddd%22 width=%22300%22 height=%22200%22/%3E%3Ctext fill=%22%23999%22 font-family=%22Arial%22 font-size=%2218%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImage not available%3C/text%3E%3C/svg%3E";

// Load data from JSON file
async function loadTravelData() {
    try {
        const response = await fetch('travel_recommendation_api.json');
        travelData = await response.json();
        console.log('Travel data loaded successfully');
    } catch (error) {
        console.error('Error loading travel data:', error);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadTravelData();
    
    const searchBtn = document.getElementById('searchBtn');
    const resetBtn = document.getElementById('resetBtn');
    const searchInput = document.getElementById('searchInput');
    
    searchBtn.addEventListener('click', performSearch);
    resetBtn.addEventListener('click', resetSearch);
    
    // Allow Enter key to trigger search
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});

// Perform search based on user input
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
        displayMessage('Please enter a search term');
        return;
    }
    
    if (!travelData) {
        displayMessage('Loading data, please try again...');
        return;
    }
    
    const results = searchRecommendations(query);
    displayResults(results);
}

// Search through all recommendations
function searchRecommendations(query) {
    const results = [];
    
    // Normalize query for better matching
    const normalizedQuery = query.toLowerCase();
    
    // Search countries and cities
    if (matchesKeyword(normalizedQuery, ['country', 'countries', 'city', 'cities'])) {
        travelData.countries.forEach(country => {
            country.cities.forEach(city => {
                results.push({
                    type: 'city',
                    ...city
                });
            });
        });
    }
    
    // Search temples
    if (matchesKeyword(normalizedQuery, ['temple', 'temples'])) {
        travelData.temples.forEach(temple => {
            results.push({
                type: 'temple',
                ...temple
            });
        });
    }
    
    // Search beaches
    if (matchesKeyword(normalizedQuery, ['beach', 'beaches'])) {
        travelData.beaches.forEach(beach => {
            results.push({
                type: 'beach',
                ...beach
            });
        });
    }
    
    // If no category matches, search by name in all categories
    if (results.length === 0) {
        // Search in countries/cities
        travelData.countries.forEach(country => {
            country.cities.forEach(city => {
                if (city.name.toLowerCase().includes(normalizedQuery) || 
                    city.description.toLowerCase().includes(normalizedQuery)) {
                    results.push({
                        type: 'city',
                        ...city
                    });
                }
            });
        });
        
        // Search in temples
        travelData.temples.forEach(temple => {
            if (temple.name.toLowerCase().includes(normalizedQuery) || 
                temple.description.toLowerCase().includes(normalizedQuery)) {
                results.push({
                    type: 'temple',
                    ...temple
                });
            }
        });
        
        // Search in beaches
        travelData.beaches.forEach(beach => {
            if (beach.name.toLowerCase().includes(normalizedQuery) || 
                beach.description.toLowerCase().includes(normalizedQuery)) {
                results.push({
                    type: 'beach',
                    ...beach
                });
            }
        });
    }
    
    return results;
}

// Helper function to match keywords
function matchesKeyword(query, keywords) {
    return keywords.some(keyword => query.includes(keyword));
}

// Display search results
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">No recommendations found. Try searching for "beaches", "temples", or "countries".</div>';
        return;
    }
    
    let html = '';
    results.forEach(result => {
        html += `
            <div class="result-card">
                <img src="${result.imageUrl}" alt="${result.name}" onerror="this.src='${FALLBACK_IMAGE}'">
                <div class="result-card-content">
                    <h3>${result.name}</h3>
                    <p>${result.description}</p>
                    <button class="visit-btn" onclick="window.open('https://www.google.com/search?q=${encodeURIComponent(result.name)}', '_blank')">Visit</button>
                </div>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = html;
}

// Display a message to the user
function displayMessage(message) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = `<div class="no-results">${message}</div>`;
}

// Reset search and clear results
function resetSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('results').innerHTML = '';
}
