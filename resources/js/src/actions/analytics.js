const axios = window.axios;
import { setAlert } from "./alert";
import {
    CLEAR_ANALYTICS,
    SET_ANALYTICS,
    SET_ANALYTICS_BOUNCE,
    SET_ANALYTICS_BROWSER,
    SET_ANALYTICS_COUNTRY,
    SET_ANALYTICS_DURATION,
    SET_ANALYTICS_PAGE_VISIT,
    SET_ANALYTICS_VISIT,
} from "./types";

export const getAnalytics = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/analytics/visit/7");

        console.log(res.data);

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

        const res1 = await axios.get(`/api/analytics/user-type/${days}`);

        dispatch({
            type: SET_ANALYTICS_VISIT,
            payload: { visit: res.data, userType: res1.data },
        });
    } catch (err) {
        console.log(err.response);
    }
};

export const getPageVisit = (days) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/analytics/most/${days}`);

        dispatch({
            type: SET_ANALYTICS_PAGE_VISIT,
            payload: res.data,
        });
    } catch (err) {
        console.log(err.response);
    }
};

export const getBrowser = (days) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/analytics/browser/${days}`);

        // console.log(res1.data);

        dispatch({
            type: SET_ANALYTICS_BROWSER,
            payload: res.data,
        });
    } catch (err) {
        console.log(err.response);
    }
};

export const getDuration = (days) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/analytics/time/${days}`);

        //console.log(res.data.rows);

        dispatch({
            type: SET_ANALYTICS_DURATION,
            payload: res.data.rows,
        });
    } catch (err) {
        console.log(err.response);
    }
};

export const getCountry = (days) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/analytics/country/${days}`);

        // console.log(res1.data);

        dispatch({
            type: SET_ANALYTICS_COUNTRY,
            payload: res.data.rows,
        });
    } catch (err) {
        console.log(err.response);
    }
};

export const getBounceRate = (days) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/analytics/bounce/${days}`);

        // console.log(res1.data);

        dispatch({
            type: SET_ANALYTICS_BOUNCE,
            payload: res.data.rows,
        });
    } catch (err) {
        console.log(err.response);
    }
};

export const clearAnalytics = () => (dispatch) => {
    dispatch({ type: CLEAR_ANALYTICS });
};
