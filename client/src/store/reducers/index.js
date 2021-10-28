import { combineReducers } from "redux";
import auth from "./auth";
import saved from "./saving";
import alert from "./alert";
import forecast from "./forecast";


const reducers = combineReducers({ auth, saved, alert, forecast });

export default reducers;