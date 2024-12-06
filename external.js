
// WeatherStack API Example
document.addEventListener('DOMContentLoaded', () => {
    const weatherButton = document.getElementById('getWeather');
    const weatherDisplay = document.getElementById('weatherData');

    // Replace with your WeatherStack API key
    const API_KEY = " '1f06ceb484a08c64612f08afc12c62d3'";
    const BASE_URL = "http://api.weatherstack.com/current";

    // Function to fetch weather data
    function fetchWeather(city) {
        const url = `${BASE_URL}?access_key=${API_KEY}&query=${city}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.success === false) {
                    weatherDisplay.textContent = `Error: ${data.error.info}`;
                } else {
                    const { location, current } = data;
                    weatherDisplay.innerHTML = `
                        <h3>Weather for ${location.name}, ${location.country}</h3>
                        <p>Temperature: ${current.temperature}°C</p>
                        <p>Condition: ${current.weather_descriptions[0]}</p>
                        <p>Humidity: ${current.humidity}%</p>
                        <p>Wind Speed: ${current.wind_speed} km/h</p>
                    `;
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                weatherDisplay.textContent = "An error occurred while fetching weather data.";
            });
    }

    // Event listener for the button
    weatherButton.addEventListener('click', () => {
        const city = document.getElementById('cityInput').value;
        if (city) {
            fetchWeather(city);
        } else {
            weatherDisplay.textContent = "Please enter a city.";
        }
    });
});



// Replace with your Flickr API key and OAuth token 
const apiKey = 'fb3b34c496fba7dd9760eca1065bfc92'; // 
const oauthToken = 'YOUR_OAUTH_TOKEN'; // 
const oauthTokenSecret = 'YOUR_OAUTH_TOKEN_SECRET'; // 

// URL for uploading the photo
const uploadUrl = 'https://up.flickr.com/services/upload/';

document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the form data
    const photoFile = document.getElementById('photo').files[0];
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const tags = document.getElementById('tags').value;

    // Check if a photo file is selected
    if (!photoFile) {
        alert('Please select a photo to upload.');
        return;
    }

    // FormData object to send the photo and data
    const formData = new FormData();
    formData.append('photo', photoFile);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    formData.append('api_key', apiKey);
    formData.append('auth_token', oauthToken); // 
    formData.append('format', 'json'); // 

    // Create a function to handle the response
    const handleResponse = (response) => {
        if (response.photoid) {
            alert('Photo uploaded successfully! Photo ID: ' + response.photoid);
            // Redirect to the Flickr photo edit page
            window.location.href = `http://www.flickr.com/photos/upload/edit/?ids=${response.photoid}`;
        } else {
            alert('Error uploading photo. Please try again.');
        }
    };

    // Make the API request to upload the photo
    fetch(uploadUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(handleResponse)
    .catch(error => {
        console.error('Error uploading photo:', error);
        alert('Error uploading photo. Please try again.');
    });
});


