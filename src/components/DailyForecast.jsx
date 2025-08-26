import React from 'react'
import WeatherIcon from "./WeatherIcon";
import { formatTemperature } from "../utils/formatTemperature";
import Humidity from "../assets/icons/Humidity";
import Wind from "../assets/icons/Wind";

const DailyForecast = ({ dailyForecast }) => {
  // Get todays text as weekday format.
  function getDay(date) {
    const day = new Date(date).toLocaleString("en-US", { weekday: "long" });
    return day;
  }

  return (
    <div className="flex justify-between items-center px-4 md:px-8 py-4 bg-sky-600/90 rounded-2xl active:translate-x-2.5 hover:translate-x-2.5 transition duration-500 md:duration-300 shadow-md">
      {/* Display day */}
      <div className="flex flex-col font-medium">
        <p>{getDay(dailyForecast.dt_txt)}</p>
      </div>

      {/* Display weather icon */}
      <div>
        <WeatherIcon iconCode={dailyForecast.weather[0].icon} size={"small"} />
      </div>

      {/* Weather details section */}
      <section className="flex flex-col">
        {/* Display weather description */}
        <div>
          <p className="font-medium">{dailyForecast.weather[0].main}</p>
        </div>

        <div className="flex gap-2 text-sm text-gray-100">
          {/* Display humidity */}
          <div className="flex items-center gap-1">
            <Humidity />
            <p>{dailyForecast.main.humidity}%</p>
          </div>

          {/* Display wind */}
          <div className="flex items-center gap-1">
            <Wind />
            <p>{(dailyForecast.wind.speed * 3.6).toFixed(1)}km/h</p>
          </div>
        </div>
      </section>

      {/* Display weather degree */}
      <div className="font-medium">
        <p>{formatTemperature(dailyForecast.main.temp)}°</p>
      </div>
    </div>
  );
};

export default DailyForecast;
