import { GET_FORECAST } from "../constants/constants";
import * as api from "../../api";



const getForecast = (lat, lon) => {
    return async dispatch => {
        try {
            const { data } = await api.getForecast(lat, lon);
            dispatch({ type: GET_FORECAST, payload: data });
        } catch (error) {

        }
    }
}

export default getForecast;