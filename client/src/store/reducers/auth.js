import { LOGIN, LOGOUT } from "../constants/constants";


const authReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem("authenticated", JSON.stringify(action?.payload));
            return { ...state, user: action?.payload };
        case LOGOUT:
            localStorage.clear();
            return { ...state, user: null };
        default:
            return state;
    }
};

export default authReducer;