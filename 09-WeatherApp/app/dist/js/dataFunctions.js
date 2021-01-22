import WEATHER_API_KEY from "./apiKey.js";

export const setSearchString = (latitude, longitude, units) => {
  return `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${WEATHER_API_KEY}`;
};

export const getWeatherData = async (searchString) => {
  const response = await fetch(searchString);
  const data = await response.json();
  return data;
};
