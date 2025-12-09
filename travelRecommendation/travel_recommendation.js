const API_URL = 'travel_recommendation_api.json';

let travelData = null;

// Task 6: fetch JSON and log it
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    travelData = data;
    console.log('Travel data loaded:', data); // check DevTools console
  })
  .catch(err => console.error('Error fetching travel data:', err));

// DOM elements on the home page
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const resetBtn = document.getElementById('reset-btn');
const resultsDiv = document.getElementById('results');

// Task 7 & 8: handle Search button
function handleSearch() {
  if (!travelData || !searchInput || !resultsDiv) return;

  const keyword = searchInput.value.trim().toLowerCase();
  resultsDiv.innerHTML = '';

  if (!keyword) return;

  let items = [];

  if (keyword.includes('beach')) {
    items = travelData.beaches || [];
  } else if (keyword.includes('temple')) {
    items = travelData.temples || [];
  } else if (keyword.includes('country')) {
    // flatten cities from all countries
    const list = [];
    (travelData.countries || []).forEach(country => {
      (country.cities || []).forEach(city => list.push(city));
    });
    items = list;
  }

  if (items.length === 0) {
    resultsDiv.innerHTML =
      '<p>No results. Try "beach", "temple", or "country".</p>';
    return;
  }

  // show at least two cards
  items.slice(0, 2).forEach(item => {
    const card = document.createElement('article');
    card.className = 'card';

    card.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}">
      <h2>${item.name}</h2>
      <p>${item.description}</p>
      <p class="time"></p>
    `;

    resultsDiv.appendChild(card);
  });

  // optional Task 10: show local time (if you later add timezones)
  updateTimes();
}

// Task 9: Clear button
function handleReset() {
  if (searchInput) searchInput.value = '';
  if (resultsDiv) resultsDiv.innerHTML = '';
}

// Optional Task 10 (simple version – same time everywhere)
function updateTimes() {
  const timeElems = document.querySelectorAll('.time');
  const options = {
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  const now = new Date().toLocaleTimeString('en-US', options);
  timeElems.forEach(el => {
    el.textContent = `Current local time: ${now}`;
  });
}

// wire up buttons
if (searchBtn) searchBtn.addEventListener('click', handleSearch);
if (resetBtn) resetBtn.addEventListener('click', handleReset);

