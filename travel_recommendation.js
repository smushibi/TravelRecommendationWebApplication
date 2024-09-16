document.getElementById('searchButton').addEventListener('click', performSearch);
document.getElementById('resetButton').addEventListener('click', resetSearch);

async function performSearch() {
    const searchInput = document.getElementById('searchQuery').value.trim().toLowerCase();
    const resultsDiv = document.getElementById('results');
    
    try {
        const response = await fetch('travel_recommendation_api.json');
        const data = await response.json();
        console.log(data)
        const keywords = {
            beach: ["beach", "beaches"],
            temple: ["temple", "temples"],
            country: ["country", "countries"]
        };
        
        let foundKeyword = '';
        
        for (const [key, variations] of Object.entries(keywords)) {
            if (variations.includes(searchInput)) {
                foundKeyword = key;
                break;
            }
        }
        
        if (foundKeyword) {
            displayResults(data, foundKeyword);
        } else {
            resultsDiv.innerHTML = '<h1 style="color:red">Sorry no results found. </h1>';
        }
    } catch (error) {
        resultsDiv.innerHTML = 'Error fetching data.';
        console.error('Error:', error);
    }
}

function displayResults(data, category) {
    const resultsDiv = document.getElementById('results');
    let resultsHTML = '';

    if (category === 'country') {
        data.countries.forEach(country => {
            resultsHTML += `<h2>${country.name}</h2>`;
            country.cities.forEach(city => {
                resultsHTML += `
                    <div class="result-item">
                        <img src="${city.imageUrl}" alt="${city.name}" />
                        <h3>${city.name}</h3>
                        <p>${city.description}</p>
                    </div>
                `;
            });
        });
    } else if (category === 'temple') {
        data.temples.forEach(temple => {
            resultsHTML += `
                <div class="result-item">
                    <img src="${temple.imageUrl}" alt="${temple.name}" />
                    <h3>${temple.name}</h3>
                    <p>${temple.description}</p>
                </div>
            `;
        });
    } else if (category === 'beach') {
        data.beaches.forEach(beach => {
            resultsHTML += `
                <div class="result-item">
                    <img src="${beach.imageUrl}" alt="${beach.name}" />
                    <h3>${beach.name}</h3>
                    <p>${beach.description}</p>
                </div>
            `;
        });
    }

    resultsDiv.innerHTML = resultsHTML;
}

function resetSearch() {
    document.getElementById('searchQuery').value = '';
    document.getElementById('results').innerHTML = '';
}
