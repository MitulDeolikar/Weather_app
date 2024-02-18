import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';

const WeatherApp = () => {
    let api_key = "68ab34891a3a49caeeeea7407bbc2c8b";
    const [wicon, setWicon] = useState(cloud_icon);
    const [data, setData] = useState(null);
    const [location, setLocation] = useState("Pune");

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") return 0;
    
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
        let response = await fetch(url);
        let jsonData = await response.json();
        setData(jsonData);
    
        const humidity = document.getElementsByClassName("humidity-percentage");
        const wind = document.getElementsByClassName("wind-rate");
        const temp = document.getElementsByClassName("weather-temp");
    
        if (data && data.main && data.main.humidity !== undefined) {
            humidity[0].innerHTML = data.main.humidity + " %";
        } else {
            humidity[0].innerHTML = "N/A"; // Or set to some default value
        }
    
        if (data && data.wind && data.wind.speed !== undefined) {
            wind[0].innerHTML = Math.round(data.wind.speed) + " kph";
        } else {
            wind[0].innerHTML = "N/A"; // Or set to some default value
        }
    
        if (data && data.main && data.main.temp !== undefined) {
            temp[0].innerHTML = Math.round(data.main.temp) + "&deg;C";
        } else {
            temp[0].innerHTML = "N/A"; // Or set to some default value
        }
    
        if (data && data.cod === 200) {
            setLocation(data.name);
            if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n")
                     setWicon(clear_icon)
                 else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n")
                     setWicon(cloud_icon)
                 else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n")
                     setWicon(drizzle_icon)
                 else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n")
                     setWicon(drizzle_icon)
                 else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n")
                     setWicon(rain_icon)
                 else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n")
                     setWicon(rain_icon)
                 else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n")
                     setWicon(snow_icon)
                 }
         else {
            setLocation("Location Not Found");
            setWicon(clear_icon); // You can set a default icon for this case
        }
    };
    

    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder='Search for a location' />
                <div className="search-icon" onClick={() => { search() }}>
                    <img src={search_icon} alt="Search" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="Weather" />
            </div>
            <div className="weather-temp">24&deg;C</div>
            <div className="weather-location">{location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percentage">32%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">10 kph</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
