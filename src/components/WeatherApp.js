import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const Api_key = "6ae780ec702315938759f44d1011278c";

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const fetchWeather = async () => {
    if (!location) {
      setError("Please enter a location");
      return;
    }

    setError("");
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${Api_key}`
      );
      setWeather(response.data);
    } catch (err) {
      setError("Could not fetch weather data. Check your location.");
    }
  };

  return (
    <div style={{
      backgroundColor: isDarkMode ? "#0F172A" : "#F0F9FF",
      minHeight: "100vh",
      color: isDarkMode ? "white" : "#1E293B",
      fontFamily: "'Segoe UI', Arial, sans-serif",
      padding: "20px",
      transition: "all 0.3s ease",
      backgroundImage: isDarkMode 
        ? "linear-gradient(to bottom right, #0F172A, #1E293B)"
        : "linear-gradient(to bottom right, #F0F9FF, #E0F2FE)"
    }}>
      {/* Header with Glass Effect */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        backgroundColor: isDarkMode ? "rgba(30, 41, 59, 0.7)" : "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        borderRadius: "24px",
        boxShadow: isDarkMode 
          ? "0 4px 6px rgba(0, 0, 0, 0.2)"
          : "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <button style={{ background: "none", border: "none", color: isDarkMode ? "white" : "#333" }}>☰</button>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: isDarkMode ? "white" : "#333" }}>
            <span>📍</span>
            <span>{weather ? weather.city.name : "Location"}</span>
          </div>
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          backgroundColor: isDarkMode ? "#2A2A2A" : "#f0f0f0",
          padding: "10px 20px",
          borderRadius: "20px",
          width: "400px"
        }}>
          <span>🔍</span>
          <input
            style={{
              background: "none",
              border: "none",
              color: isDarkMode ? "white" : "#333",
              width: "100%",
              fontSize: "16px"
            }}
            type="text"
            placeholder="Search city..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
          />
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <button 
            onClick={toggleTheme}
            style={{ 
              background: "none", 
              border: "none", 
              color: isDarkMode ? "white" : "#333",
              fontSize: "24px"
            }}
          >
            {isDarkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: "20px" }}>
        {/* Weather Toggle Buttons with Animation */}
        <div style={{ 
          display: "flex", 
          gap: "20px", 
          marginBottom: "20px",
          transition: "all 0.3s ease"
        }}>
          <button style={{
            background: "linear-gradient(135deg, #3B82F6, #2563EB)",
            border: "none",
            padding: "12px 24px",
            borderRadius: "20px",
            color: "white",
            fontWeight: "600",
            boxShadow: "0 4px 6px rgba(37, 99, 235, 0.2)",
            transition: "transform 0.2s ease",
            cursor: "pointer"
          }}>Forecast</button>
          <button style={{
            background: isDarkMode ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)",
            border: "1px solid #3B82F6",
            padding: "12px 24px",
            borderRadius: "20px",
            color: isDarkMode ? "white" : "#3B82F6",
            fontWeight: "600",
            transition: "all 0.2s ease",
            cursor: "pointer"
          }}>Air quality</button>
        </div>

        {weather && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "24px"
          }}>
            {/* Current Weather Card with Gradient */}
            <div style={{
              background: isDarkMode 
                ? "linear-gradient(135deg, #2A4365, #1E293B)"
                : "linear-gradient(135deg, #FFFFFF, #F8FAFC)",
              borderRadius: "24px",
              padding: "30px",
              boxShadow: isDarkMode 
                ? "0 8px 16px rgba(0, 0, 0, 0.3)"
                : "0 8px 16px rgba(0, 0, 0, 0.1)",
              color: isDarkMode ? "white" : "#1E293B",
              transition: "transform 0.3s ease",
              transform: "translateY(0)",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-5px)"
              }
            }}>
              <div style={{ 
                fontSize: "72px", 
                fontWeight: "bold",
                background: isDarkMode 
                  ? "linear-gradient(135deg, #60A5FA, #3B82F6)"
                  : "linear-gradient(135deg, #3B82F6, #2563EB)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                {Math.round(weather.list[0].main.temp)}°
              </div>
              <div style={{ opacity: isDarkMode ? 0.7 : 0.8 }}>
                Real feel {Math.round(weather.list[0].main.feels_like)}°
              </div>
              <div style={{ marginTop: "20px" }}>
                <div>Wind: {weather.list[0].wind.speed} m/s</div>
                <div>Humidity: {weather.list[0].main.humidity}%</div>
                <div>Pressure: {weather.list[0].main.pressure}MB</div>
              </div>
            </div>

            {/* Weekly Forecast with Glass Effect */}
            <div style={{
              background: isDarkMode 
                ? "rgba(30, 41, 59, 0.7)"
                : "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              borderRadius: "24px",
              padding: "30px",
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "15px"
            }}>
              {weather.list.slice(0, 7).map((day, index) => (
                <div key={index} style={{ 
                  textAlign: "center",
                  padding: "15px",
                  background: isDarkMode 
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.02)",
                  borderRadius: "16px",
                  transition: "transform 0.2s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)"
                  }
                }}>
                  <div style={{ fontWeight: "500" }}>
                    {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <img 
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt={day.weather[0].description}
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div style={{ fontWeight: "600" }}>{Math.round(day.main.temp)}°</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Map Section with Enhanced Styling */}
        <div style={{
          background: isDarkMode 
            ? "rgba(30, 41, 59, 0.7)"
            : "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          borderRadius: "24px",
          padding: "30px",
          marginTop: "24px",
          boxShadow: isDarkMode 
            ? "0 8px 16px rgba(0, 0, 0, 0.3)"
            : "0 8px 16px rgba(0, 0, 0, 0.1)"
        }}>
          <h3 style={{ marginBottom: "20px" }}>Weather Map - India</h3>
          <div style={{
            position: "relative",
            width: "100%",
            height: "400px",
            backgroundColor: isDarkMode ? "#1E1E1E" : "#e0e0e0",
            borderRadius: "15px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <img 
              src="https://w7.pngwing.com/pngs/591/400/png-transparent-satellite-ry-weather-satellite-india-weather-map-india-electronics-weather-forecasting-india.png"
              alt="India Weather Map"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: isDarkMode ? 0.8 : 1,
                filter: isDarkMode ? 'brightness(1.2) contrast(1.1)' : 'none'
              }}
            />
            {weather && (
              <div style={{
                position: "absolute",
                padding: "15px",
                borderRadius: "12px",
                backgroundColor: isDarkMode ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.9)",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "5px"
              }}>
                <h4 style={{ margin: 0 }}>{weather.city.name}</h4>
                <p style={{ margin: 0, fontSize: "1.2em" }}>
                  {Math.round(weather.list[0].main.temp)}°C
                </p>
                <img 
                  src={`https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`}
                  alt="weather icon"
                  style={{ width: "50px", height: "50px" }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Other Cities */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "24px",
          marginTop: "24px"
        }}>
          {["Mumbai", "Delhi", "Bangalore", "Chennai"].map((city) => (
            <div key={city} style={{
              background: isDarkMode 
                ? "linear-gradient(135deg, #2A4365, #1E293B)"
                : "linear-gradient(135deg, #FFFFFF, #F8FAFC)",
              borderRadius: "20px",
              padding: "20px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform: "translateY(0)",
              boxShadow: isDarkMode 
                ? "0 4px 6px rgba(0, 0, 0, 0.2)"
                : "0 4px 6px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: isDarkMode 
                  ? "0 8px 16px rgba(0, 0, 0, 0.3)"
                  : "0 8px 16px rgba(0, 0, 0, 0.1)"
              }
            }} onClick={() => {
              setLocation(city);
              fetchWeather();
            }}>
              <h4 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>{city}</h4>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default WeatherApp;