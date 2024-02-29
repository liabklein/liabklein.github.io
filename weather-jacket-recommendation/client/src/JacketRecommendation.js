import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from './WeatherService';

const JacketRecommendation = () => {
    const [recommendation, setRecommendation] = useState('');
    const [needJacket, setNeedJacket] = useState('Loading...');
    const [isLoading, setIsLoading] = useState(true); // Add state to track loading status

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const weatherData = await fetchWeatherData(latitude, longitude);
                const temperature = weatherData?.main?.temp;
                const hasRain = weatherData?.rain != null;

                let jacketRecommendation = ""; // Default
                let needJacketResponse = "YES";

                if (hasRain) {
                    jacketRecommendation = "rain jacket";
                } else if (temperature > 20) {
                    jacketRecommendation = "no jacket";
                    needJacketResponse = "NO";
                } else if (temperature <= 20 && temperature > 15) {
                    jacketRecommendation = "long sleeves";
                } else if (temperature <= 15 && temperature > 10) {
                    jacketRecommendation = "light jacket";
                } else if (temperature <= 10 && temperature > 0) {
                    jacketRecommendation = "medium jacket";
                } else if (temperature <= 0) {
                    jacketRecommendation = "winter jacket";
                }

                setRecommendation(jacketRecommendation);
                setNeedJacket(needJacketResponse);
                setIsLoading(false); // Update loading status
            } catch (error) {
                console.error("Weather data fetch error:", error);
                setRecommendation("Failed to retrieve weather data.");
                setNeedJacket("ERROR");
                setIsLoading(false); // Update loading status
            }
        }, (error) => {
            console.error("Geolocation error:", error);
            setRecommendation("Geolocation error. Unable to retrieve location.");
            setNeedJacket("ERROR");
            setIsLoading(false); // Update loading status
        });
    }, []);

    return (
        <div>
            {/* Title container to keep the title fixed in position */
            <div style={{ minHeight: '64px' }}>
            <h2>Do I need a jacket?</h2>
            </div>}
            {/* Content container with conditional rendering for loading/error/jacket recommendation */}
            <div style={{ minHeight: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <p style={{ fontSize: isLoading ? '24px' : '96px', margin: '20px 0', fontWeight: 'bold' }}>{needJacket}</p>
                {!isLoading && needJacket === "YES" && (
                    <p style={{ fontSize: '24px' }}>You should wear a {recommendation}.</p>
                )}
                {!isLoading && needJacket === "ERROR" && (
                    <p style={{ fontSize: '24px', color: 'red' }}>{recommendation}</p>
                )}
            </div>
        </div>
    );
};

export default JacketRecommendation;