import { LOGIN_ERROR, LOGIN_SUCCESS, REGISTRATION_ERROR, REGISTRATION_SUCCESS, RESET_ALERTS } from "../constants/constants";

const initialState = {
    errors: {
        login: null,
        registration: null
    },
    success: {
        login: null,
        registration: null
    }
}


const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_ERROR:
            return { ...state, errors: { login: action?.payload } };
        case LOGIN_SUCCESS:
            return { ...state, success: { login: action?.payload } };
        case REGISTRATION_ERROR:
            return { ...state, errors: { registration: action?.payload } };
        case REGISTRATION_SUCCESS:
            return { ...state, success: { registration: action?.payload } };
        case RESET_ALERTS:
            return { ...state, errors: { [action?.field]: null }, success: { [action?.field]: null } };
        default:
            return state;
    }
}



export default alertReducer;