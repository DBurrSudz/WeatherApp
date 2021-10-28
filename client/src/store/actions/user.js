import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, REGISTRATION_ERROR, REGISTRATION_SUCCESS, RESET_ALERTS } from "../constants/constants";
import * as api from "../../api";



/**
 * Logs in a user
 * @param {Object} formData Data submitted by form
 * @returns Dispatch function
 */
export const login = (formData) => async dispatch => {
    try {
        dispatch({ type: RESET_ALERTS, field: "login" });
        const { data } = await api.login(formData);
        dispatch({ type: LOGIN, payload: data?.data });
        dispatch({ type: LOGIN_SUCCESS, payload: data?.message });
    } catch (error) {
        dispatch({ type: LOGIN_ERROR, payload: error.response.data?.message });
    }
};

/**
 * Registers a new user
 * @param {Object} formData Data submitted by form 
 * @returns 
 */
export const register = (formData) => async dispatch => {
    try {
        dispatch({ type: RESET_ALERTS, field: "registration" });
        const { data } = await api.register(formData);
        dispatch({ type: REGISTRATION_SUCCESS, payload: data?.message });
    } catch (error) {
        dispatch({ type: REGISTRATION_ERROR, payload: error.response.data?.message });
    }
};