import axios from 'axios';

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your OpenWeatherMap API Key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const fetchWeatherData = async (lat, lon) => {
    try {
        const response = await axios.get(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};

export { fetchWeatherData };