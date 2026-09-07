import React, { useState } from 'react';

function WeatherApp() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function fetchWeather() {
        if (city.trim() === '') return;
        setLoading(true);
        setError('');

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`
            );

            if (!response.ok) {
                throw new Error('City not found');
            }

            const data = await response.json();
            setWeather(data);
        } catch (err) {
            setError(err.message);
        }

        setLoading(false);
    }

    return (
        <div>
            <h1>Weather App</h1>
            <input
                type="text"
                placeholder="Enter city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeather}>Get Weather</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {weather && (
                <div>
                    <h2>{weather.name}, {weather.sys.country}</h2>
                    <p>🌡 Temperature: {weather.main.temp}°C</p>
                    <p>☁ Condition: {weather.weather[0].description}</p>
                </div>
            )}
        </div>
    );
}

export default WeatherApp;

