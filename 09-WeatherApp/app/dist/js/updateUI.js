const HUMIDITY_ID = "humidity-text";
const WIND_ID = "wind-text";
export const FEELS_ID = "feels-degrees";

const updateCityAndDate = (cityText) => {
  const cityEl = document.getElementById("city");
  const dateEl = document.getElementById("date");
  const today = new Date().toString().split(" ");
  const dateText = `${today[0]} ${today[4]}`;
  cityEl.textContent = cityText;
  dateEl.textContent = dateText;
  //console.log(today);
};

export const updateDegrees = (
  degree,
  degreeElId = "degrees",
  typeElId = "degree-type"
) => {
  const degreeEl = document.getElementById(degreeElId);
  const typeEl = document.getElementById(typeElId);
  const type = typeEl.dataset.degreeType.toUpperCase();
  degreeEl.textContent = degree;
  typeEl.textContent = type;
};

const updateWeatherDescription = (desc) => {
  document.getElementById("weather-description").textContent = desc;
};

const updateIcon = (iconId) => {
  const iconPath = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
  const iconEl = document.getElementById("header-icon");
  iconEl.setAttribute("src", iconPath);
};

export const updateExtraInfo = (elId, value) => {
  document.getElementById(elId).textContent = value;
};

export const updateUI = (weatherData) => {
  const degrees = Math.round(+weatherData.main.temp);
  const { icon, description } = weatherData.weather[0];
  const { feels_like: feels, humidity } = weatherData.main;
  const wind = weatherData.wind.speed;
  updateCityAndDate(weatherData.name);
  updateDegrees(degrees);
  updateIcon(icon);
  updateWeatherDescription(description);
  updateExtraInfo(HUMIDITY_ID, humidity);
  updateExtraInfo(FEELS_ID, feels);
  updateExtraInfo(WIND_ID, wind);
};
