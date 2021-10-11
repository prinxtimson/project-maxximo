const axios = window.axios;
import { setAlert } from "./alert";
import { CLEAR_ANALYTICS, SET_ANALYTICS, SET_ANALYTICS_VISIT } from "./types";

export const getAnalytics = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/analytics/visit/7");

        //const res1 = await axios.get("/api/analytics/analysis");

        console.log(res.data);
        //console.log(res1.data);

        dispatch({
            type: SET_ANALYTICS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err.response);
    }
};

export const getVisit = (days) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/analytics/visit/${days}`);

        //const res1 = await axios.get("/api/analytics/analysis");

        console.log(res.data);
        //console.log(res1.data);

        dispatch({
            type: SET_ANALYTICS_VISIT,
            payload: res.data,
        });
    } catch (err) {
        console.log(err.response);
    }
};

export const clearAnalytics = () => (dispatch) => {
    dispatch({ type: CLEAR_ANALYTICS });
};
