import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import notification from "./notification";
import privacy from "./privacy";
import terms from "./terms";
import subscription from "./subscription";
import chart from "./chart";

export default combineReducers({
    alert,
    auth,
    profile,
    notification,
    privacy,
    terms,
    subscription,
    chart,
});
