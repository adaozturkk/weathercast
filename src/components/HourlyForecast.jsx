import React from 'react'
import WeatherIcon from "./WeatherIcon";
import { formatTemperature } from "../utils/formatTemperature";

const HourlyForecast = ({ hourlyWeather }) => {
  return (
    <div className="flex flex-col p-4 rounded-2xl items-center bg-sky-400/30 shadow-md active:bg-sky-400/70 hover:bg-sky-400/70 transition duration-500 md:duration-300">
      {/* Display hour */}
      <p>
        {new Date(hourlyWeather.dt_txt).getHours()}:
        {new Date(hourlyWeather.dt_txt).getMinutes()}0
      </p>

      {/* Display weather icon */}
      <div className="mt-2 mb-1">
        <WeatherIcon iconCode={hourlyWeather.weather[0].icon} size={"small"} />
      </div>

      {/* Display degree */}
      <p className="font-medium">
        {formatTemperature(hourlyWeather.main.temp)}°
      </p>
    </div>
  );
};

export default HourlyForecast;
