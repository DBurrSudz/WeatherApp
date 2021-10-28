import { GET_FORECAST } from "../constants/constants";


const forecastReducer = (state = null, action) => {
    switch (action.type) {
        case GET_FORECAST:
            return action?.payload;
        default:
            return state;
    }
};


export default forecastReducer;