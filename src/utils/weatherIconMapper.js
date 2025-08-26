const iconMap = {
  "01d": { icon: "wi-day-sunny", color: "text-yellow-400" },
  "01n": { icon: "wi-night-clear", color: "text-gray-700" },
  "02d": { icon: "wi-day-cloudy", color: "text-gray-400" },
  "02n": { icon: "wi-night-alt-cloudy", color: "text-gray-600" },
  "03d": { icon: "wi-cloud", color: "text-gray-500" },
  "03n": { icon: "wi-cloud", color: "text-gray-600" },
  "04d": { icon: "wi-cloudy", color: "text-gray-600" },
  "04n": { icon: "wi-cloudy", color: "text-gray-700" },
  "09d": { icon: "wi-showers", color: "text-blue-500" },
  "09n": { icon: "wi-showers", color: "text-blue-700" },
  "10d": { icon: "wi-day-rain", color: "text-blue-400" },
  "10n": { icon: "wi-night-alt-rain", color: "text-blue-600" },
  "11d": { icon: "wi-thunderstorm", color: "text-yellow-600" },
  "11n": { icon: "wi-thunderstorm", color: "text-yellow-800" },
  "13d": { icon: "wi-snow", color: "text-blue-200" },
  "13n": { icon: "wi-snow", color: "text-blue-400" },
  "50d": { icon: "wi-fog", color: "text-gray-400" },
  "50n": { icon: "wi-fog", color: "text-gray-600" },
};

export function getWeatherIcon(iconCode) {
  return iconMap[iconCode] || { icon: "wi-na", color: "text-gray-500" };
}
