const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');

  function resetForm() {
    document.getElementById("searchDestination").value = "";
    document.getElementById("result").innerHTML = "";
}

function searchTravel() {
    const input = document.getElementById('searchDestination').value.toLowerCase().trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        const recommendation = [];
        
        data.countries.forEach(country => {
            country.cities.forEach(city => {
                recommendation.push({
                    name: city.name, 
                    imageUrl: city.imageUrl, 
                    description: city.description, 
                    countryName: country.name,
                    category: 'country'
                });
            });
      });

        data.temples.forEach(temple => {
                recommendation.push({
                    name: temple.name, 
                    imageUrl: temple.imageUrl, 
                    description: temple.description, 
                    countryName: temple.name.split(', ').pop().trim(),
                    category: 'temple'
                });
            });
            
            data.beaches.forEach(beach => {
                    recommendation.push({
                        name: beach.name, 
                        imageUrl: beach.imageUrl, 
                        description: beach.description, 
                        countryName: beach.name,
                        category: 'beach'
                    });
                });       
     
                const matches = recommendation.filter(item => {
                    if (input === 'beach' || input === 'beaches') return item.category === 'beach';
                    if (input === 'temple' || input === 'temples') return item.category === 'temple';
                    if (input === 'country' || input === 'countries') return item.category === 'country';
          
                    return item.name.toLowerCase().includes(input) ||
                           item.countryName.toLowerCase().includes(input);
                  });

                  if (matches.length > 0) {
                    matches.forEach(item => {
                      resultDiv.innerHTML += `

                        <div class="recommendation">
                          <img src="${item.imageUrl}" alt="${item.name}">
                          <h3>${item.name}</h3>
                          <p>${item.description}</p>
                        </div>
                      `;
                    });
                  } else {
                    resultDiv.innerHTML = 'Destination not found.';
                  }
                })
                

                    .catch(error => {
                        console.error('Error:', error);
                        resultDiv.innerHTML = 'An error occurred while fetching data.';
                      });
          }

    btnSearch.addEventListener('click', searchTravel);

    btnReset.addEventListener('click', resetForm);
