import React from 'react'
import { getWeatherIcon } from "../utils/weatherIconMapper";

const WeatherIcon = ({ iconCode, size }) => {
  const { icon, color } = getWeatherIcon(iconCode);

  return (
    <i
      className={`wi ${icon} ${size === "big" ? "text-9xl" : "text-3xl"} ${
        size === "big" ? color : "text-white"
      }`}
    ></i>
  );
};

export default WeatherIcon;
