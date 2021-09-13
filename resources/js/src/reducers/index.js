import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import notification from "./notification";
import privacy from "./privacy";
import terms from "./terms";

export default combineReducers({
    alert,
    auth,
    profile,
    notification,
    privacy,
    terms,
});
