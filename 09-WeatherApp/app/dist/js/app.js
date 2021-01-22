import WEATHER_API_KEY from "./apiKey.js";
import getUserPosition from "./userPosition.js";
import {
  updateUI,
  updateDegrees,
  updateExtraInfo,
  FEELS_ID,
} from "./updateUI.js";
import { getWeatherData, setSearchString } from "./dataFunctions.js";
import { switchDegreesType } from "./helperFunctions.js";

const degreeTypeSwitchEl = document.querySelector(".app__degrees");

const hasGeolaction = async (locationObj) => {
  const { latitude, longitude } = locationObj.coords;
  const searchString = setSearchString(latitude, longitude, "metric");
  const weatherData = await getWeatherData(searchString);
  console.log(weatherData);
  updateUI(weatherData);
};

const errorFunc = () => {
  alert("Unable to retrieve your location");
};

getUserPosition(hasGeolaction, errorFunc);

const switchDegreesTypeHandler = () => {
  switchDegreesType("degrees", "degree-type");
  switchDegreesType("feels-degrees", "feels-degree-type");
};

degreeTypeSwitchEl.addEventListener("click", switchDegreesTypeHandler);
