import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND });


//Add JWT token from authentication to each request body.
API.interceptors.request.use(request => {
    if (localStorage.getItem("authenticated")) {
        const { token } = JSON.parse(localStorage.getItem("authenticated"));
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

export const login = (data) => API.post("/user/auth", data);
export const register = (data) => API.post("/user/register", data);
export const getForecast = (lat, lon) => {
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
    return axios.get(URL);
}