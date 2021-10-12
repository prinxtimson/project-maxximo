const axios = window.axios;
import { setAlert } from "./alert";
import {
    CHART_ERROR,
    CLEAR_CHART,
    GET_FOOD,
    GET_FOOTBALL_BY_ID,
    GET_HEALTH,
    GET_HEALTH_BY_COUNTRY,
    GET_SPORT,
    GET_VIDEO,
} from "./types";

export const getHealth = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/health");
        const res2 = await axios.get("/api/health/world");
        const res3 = await axios.get("/api/health/GB");

        dispatch({
            type: GET_HEALTH,
            payload: {
                history: res.data,
                world: res2.data,
                country: res3.data,
            },
        });
    } catch (err) {
        console.log(err.response);
        dispatch({ type: CHART_ERROR });
        if (err.response.status == 500) {
            return dispatch(
                setAlert("Server errror, please try again.", "danger")
            );
        }

        dispatch(setAlert(err.response.data.message, "danger"));
    }
};

export const getHealthByCountry = (country) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/health/${country}`);

        dispatch({
            type: GET_HEALTH_BY_COUNTRY,
            payload: res.data,
        });
    } catch (err) {
        console.log(err.response);
        dispatch({ type: CHART_ERROR });
        if (err.response.status == 500) {
            return dispatch(
                setAlert("Server errror, please try again.", "danger")
            );
        }

        dispatch(setAlert(err.response.data.message, "danger"));
    }
};

export const getFood = (food) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/food-and-drinks/${food}`);

        dispatch({
            type: GET_FOOD,
            payload: res.data,
        });
    } catch (err) {
        console.log(err.response);
        dispatch({ type: CHART_ERROR });
        if (err.response.status == 500) {
            return dispatch(
                setAlert("Server errror, please try again.", "danger")
            );
        }

        dispatch(setAlert(err.response.data.message, "danger"));
    }
};

export const getVideo = () => async (dispatch) => {
    try {
        const res = await axios.get(`/api/entertainment/video`);

        dispatch({
            type: GET_VIDEO,
            payload: res.data,
        });
    } catch (err) {
        console.log(err.response);
        dispatch({ type: CHART_ERROR });
        if (err.response.status == 500) {
            return dispatch(
                setAlert("Server errror, please try again.", "danger")
            );
        }

        dispatch(setAlert(err.response.data.message, "danger"));
    }
};

export const getSport = () => async (dispatch) => {
    try {
        const res = await axios.get(`/api/sport/tennis`);
        // const res1 = await axios.get(`/api/sport/football`);
        // const res2 = await axios.get(
        //     `/api/sport/football/${res1.data.response[0].fixture.id}`
        // );

        dispatch({
            type: GET_SPORT,
            payload: {
                tennis: res.data,
                // football: {
                //     fixtures: res1.data.response,
                //     statistics: res2.data.response,
                // },
            },
        });
    } catch (err) {
        console.log(err.response);
        dispatch({ type: CHART_ERROR });
        if (err.response.status == 500) {
            return dispatch(
                setAlert("Server errror, please try again.", "danger")
            );
        }

        dispatch(setAlert(err.response.data.message, "danger"));
    }
};

export const getFootballById = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/sport/football/${id}`);

        dispatch({
            type: GET_FOOTBALL_BY_ID,
            payload: res.data.response,
        });
    } catch (err) {
        console.log(err.response);
        dispatch({ type: CHART_ERROR });
        if (err.response.status == 500) {
            return dispatch(
                setAlert("Server errror, please try again.", "danger")
            );
        }

        dispatch(setAlert(err.response.data.message, "danger"));
    }
};

export const clearChart = () => (dispatch) => {
    dispatch({ type: CLEAR_CHART });
};
