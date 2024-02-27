import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from './WeatherService';

const JacketRecommendation = () => {
    const [recommendation, setRecommendation] = useState('Loading recommendation...');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const weatherData = await fetchWeatherData(latitude, longitude);
            const temperature = weatherData?.main?.temp;
            const hasRain = weatherData?.rain != null;

            let jacketRecommendation = "no jacket"; // Default

            if (hasRain) jacketRecommendation = "a rain jacket";
            else if (temperature > 20) jacketRecommendation = "no jacket";
            else if (temperature <= 20 && temperature > 15) jacketRecommendation = "long sleeves";
            else if (temperature <= 15 && temperature > 10) jacketRecommendation = "a light jacket";
            else if (temperature <= 10 && temperature > 0) jacketRecommendation = "a medium jacket";
            else if (temperature <= 0) jacketRecommendation = "a winter jacket";

            setRecommendation(`You should wear ${jacketRecommendation}.`);
        }, (error) => {
            console.error("Geolocation error:", error);
            setRecommendation("Failed to retrieve location.");
        });
    }, []);

    return (
        <div>
            <h2>Jacket Recommendation</h2>
            <p>{recommendation}</p>
        </div>
    );
};

export default JacketRecommendation;
