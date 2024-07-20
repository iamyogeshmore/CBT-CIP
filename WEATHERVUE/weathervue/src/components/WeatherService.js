import axios from "axios";

const API_KEY = "49133d88f1cb654a07afb21dcb8bba9b";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherByCity = (city) => {
  return axios.get(
    `${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`
  );
};

export default getWeatherByCity;
