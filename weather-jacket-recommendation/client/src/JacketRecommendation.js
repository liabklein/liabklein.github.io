import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from './WeatherService';

const JacketRecommendation = () => {
    const [recommendation, setRecommendation] = useState('');
    const [needJacket, setNeedJacket] = useState('Loading...');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const weatherData = await fetchWeatherData(latitude, longitude);
            const temperature = weatherData?.main?.temp;
            const hasRain = weatherData?.rain != null;

            let jacketRecommendation = ""; // Default
            let needJacketResponse = "Error fetching weather data.";

            if (hasRain) {
                jacketRecommendation = "rain jacket";
                needJacketResponse = "YES";
            } else if (temperature > 20) {
                jacketRecommendation = "no jacket";
                needJacketResponse = "NO";
            } else if (temperature <= 20 && temperature > 15) {
                jacketRecommendation = "long sleeves";
                needJacketResponse = "YES";
            } else if (temperature <= 15 && temperature > 10) {
                jacketRecommendation = "light jacket";
                needJacketResponse = "YES";
            } else if (temperature <= 10 && temperature > 0) {
                jacketRecommendation = "medium jacket";
                needJacketResponse = "YES";
            } else if (temperature <= 0) {
                jacketRecommendation = "winter jacket";
                needJacketResponse = "YES";
            }

            setRecommendation(jacketRecommendation);
            setNeedJacket(needJacketResponse);
        }, (error) => {
            console.error("Geolocation error:", error);
            setRecommendation("Failed to retrieve location.");
            setNeedJacket("ERROR");
        });
    }, []);

    return (
        <div>
            <h2>Do I need a jacket?</h2>
            <p style={{ fontSize: '96px', margin: '20px 0', fontWeight: 'bold' }}>{needJacket}</p>
            <p style={{ fontSize: '24px' }}>{needJacket === "YES" ? `You should wear a ${recommendation}.` : ""}</p>
        </div>
    );
};

export default JacketRecommendation;