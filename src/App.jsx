import LocationButton from "./components/LocationButton";
import SearchBar from "./components/SearchBar";
import { useEffect, useState } from "react";
import {
  getAirPollution,
  getWeatherByCity,
  getWeatherByCoordinates,
  getWeatherForecast,
} from "./services/weatherApi";
import { formatDate } from "./utils/formatDate";
import WeatherIcon from "./components/WeatherIcon";
import { formatTemperature } from "./utils/formatTemperature";
import { formatTime } from "./utils/formatTime";
import HourlyForecast from "./components/HourlyForecast";
import { formatPollution } from "./utils/formatPollution";
import DailyForecast from "./components/DailyForecast";
import Temperature from "./assets/icons/Temperature";
import Humidity from "./assets/icons/Humidity";
import Wind from "./assets/icons/Wind";
import Pressure from "./assets/icons/Pressure";
import AirPollution from "./assets/icons/AirPollution";
import Sunset from "./assets/icons/Sunset";
import Sunrise from "./assets/icons/Sunrise";
import Loader from "./components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [city, setCity] = useState("istanbul");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [icon, setIcon] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [pollution, setPollution] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch weather data
  const fetchData = async () => {
    try {
      setLoading(true);

      const data = await getWeatherByCity(city);
      setWeather(data);
      setIcon(data.weather[0].icon);
      setLat(data.coord.lat);
      setLon(data.coord.lon);

      const forecastData = await getWeatherForecast(
        data.coord.lat,
        data.coord.lon
      );
      setForecast(forecastData);

      const airData = await getAirPollution(data.coord.lat, data.coord.lon);
      setPollution(airData.list[0].main.aqi);
    } catch (error) {
      // Show error message with toaster
      if (error.response?.status === 404) {
        toast.error(
          "We couldn't find a city with this name. Please enter a valid city name.",
          {
            position: "top-center",
            autoClose: 3000,
          }
        );
      } else {
        toast.error("An error occured. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [city]);

  // Fetch weather data by coordinates for location button
  const fetchDataByCoords = async (lat, lon) => {
    try {
      setLoading(true);

      const weatherData = await getWeatherByCoordinates(lat, lon);
      setWeather(weatherData);
      setIcon(weatherData.weather[0].icon);

      const forecastData = await getWeatherForecast(lat, lon);
      setForecast(forecastData);

      const airData = await getAirPollution(lat, lon);
      setPollution(airData.list[0].main.aqi);
    } catch (error) {
      // Show error message with toaster
      toast.error("An error occured. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch data whenever lat and lon coordinates changes
  useEffect(() => {
    if (lat && lon) {
      fetchDataByCoords(lat, lon);
    }
  }, [lat, lon]);

  // Array that has todays hourly weather forecast
  const todaysWeather = forecast?.list?.filter((weather) => {
    const today = new Date();
    const weatherDate = new Date(weather.dt_txt);
    return (
      weatherDate.getDate() === today.getDate() &&
      weatherDate.getMonth() === today.getMonth() &&
      weatherDate.getFullYear() === today.getFullYear()
    );
  });

  // Array that has daily weather forecast
  const dailyWeather = forecast?.list?.filter((weather) => {
    const weatherDate = new Date(weather.dt_txt);
    const today = new Date();
    return (
      weatherDate.getHours() === 12 && weatherDate.getDate() !== today.getDate()
    );
  });

  return (
    <>
      {/* Toast container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 99999 }}
      />

      {/* Display loading screen while fetching data, show main div afterwards */}
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full min-h-screen font-roboto flex flex-col md:flex-row">
          {/* Left div when displayed in big screen, top part if it's small screen  */}
          <div className="w-full min-h-screen md:w-[40%] xl:w-[30%] flex flex-col bg-white text-gray-800 pt-6 px-4">
            {/* Header */}
            <header className="flex justify-between items-center mb-8">
              <LocationButton setLat={setLat} setLon={setLon} />
              <SearchBar setCity={setCity} />
            </header>

            <div>
              {/* Display location */}
              {weather ? (
                <div className="flex items-center text-lg">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                        stroke="currentColor"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                      <path
                        d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                        stroke="currentColor"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>

                  <p>
                    {weather.name}, {weather.sys.country}
                  </p>
                </div>
              ) : (
                ""
              )}

              {/* Display todays date */}
              <div>
                <p>Today {formatDate(new Date())}</p>
              </div>
            </div>

            {/* Main information about current weather */}
            <div className="flex flex-col pt-32 md:pt-6 items-center justify-center">
              {/* Display weather icon */}
              <div className="flex justify-center mt-20">
                <WeatherIcon iconCode={icon} size={"big"} />
              </div>

              {/* Display degree of weather */}
              <div className="flex justify-center mt-8 text-4xl font-light">
                <p>{weather ? formatTemperature(weather.main.temp) : ""}°C</p>
              </div>

              {/* Display weathers description */}
              <div className="flex justify-center text-xl mt-2">
                <p>{weather ? weather.weather[0].main : ""}</p>
              </div>
            </div>
          </div>

          {/* Right div when displayed in big screen, bottom part if it's small screen */}
          <div className="w-full md:w-[60%] xl:w-[70%] bg-linear-to-t from-sky-500 to-indigo-500 grid grid-cols-1 xl:[grid-template-columns:2fr_2fr_4fr] gap-6 text-white py-6 px-4 md:px-8">
            {/* Weather details section  */}
            <section className="md:row-span-1 md:col-span-1 xl:row-span-1 xl:col-span-2">
              <h2 className="text-lg md:text-xl font-medium mb-2">
                Weather Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Display feels like degree */}
                <div className="weather-details-card">
                  <div className="flex items-center">
                    <Temperature />
                    <p className="text-lg font-medium">Feels like</p>
                  </div>

                  <p className="text-gray-100">
                    {weather ? formatTemperature(weather.main.feels_like) : ""}
                    °C
                  </p>
                </div>

                {/* Display humidity */}
                <div className="weather-details-card">
                  <div className="flex items-center gap-1">
                    <Humidity />
                    <p className="text-lg font-medium">Humidity</p>
                  </div>

                  <p className="text-gray-100">
                    {weather ? weather.main.humidity : ""}%
                  </p>
                </div>

                {/* Display wind */}
                <div className="weather-details-card">
                  <div className="flex items-center gap-1">
                    <Wind />
                    <p className="text-lg font-medium">Wind</p>
                  </div>

                  <p className="text-gray-100">
                    {weather ? (weather.wind.speed * 3.6).toFixed(1) : ""} km/h
                  </p>
                </div>

                {/* Display pressure */}
                <div className="weather-details-card">
                  <div className="flex items-center gap-1">
                    <Pressure />
                    <p className="text-lg font-medium">Pressure</p>
                  </div>

                  <p className="text-gray-100">
                    {weather ? weather.main.pressure : ""} hPa
                  </p>
                </div>

                {/* Display air pollution index */}
                <div className="weather-details-card">
                  <div className="flex items-center gap-1">
                    <AirPollution />
                    <p className="text-lg font-medium">Air Pollution</p>
                  </div>

                  <p className="text-gray-100">
                    {pollution}: {formatPollution(pollution)}
                  </p>
                </div>

                {/* Display sun rise and set times  */}
                <div className="weather-details-card">
                  <p className="text-lg font-medium">Sun</p>

                  <div className="flex items-center gap-1">
                    <Sunrise />
                    <p className="text-gray-100">
                      Rise: {weather ? formatTime(weather.sys.sunrise) : ""}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Sunset />
                    <p className="text-gray-100">
                      Set: {weather ? formatTime(weather.sys.sunset) : ""}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Today's forecast section  */}
            <section className="md:col-span-1 md:row-span-2 xl:col-span-2 xl:row-span-1 xl:row-start-2">
              <h2 className="text-lg md:text-xl font-medium mb-2">
                Today's Hourly Forecast
              </h2>

              {weather ? (
                <div className="flex gap-4 md:gap-6 overflow-x-auto py-2">
                  {todaysWeather?.map((hourlyWeather, index) => (
                    <div key={index}>
                      <HourlyForecast hourlyWeather={hourlyWeather} />
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </section>

            {/* Daily weather forecast section */}
            <section className="md:col-span-1 md:row-span-3 xl:col-span-1 xl:row-span-2 xl:row-start-1 xl:col-start-3 flex flex-col">
              <h2 className="text-lg md:text-xl font-medium mb-1">
                Daily Weather Forecast
              </h2>

              {weather ? (
                <div className="flex flex-col gap-4">
                  {dailyWeather?.map((dailyForecast, index) => (
                    <div key={index}>
                      <DailyForecast dailyForecast={dailyForecast} />
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
