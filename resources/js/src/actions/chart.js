const axios = window.axios;
import { setAlert } from "./alert";
import {
    CHART_ERROR,
    CLEAR_CHART,
    GET_FOOD,
    GET_HEALTH,
    GET_HEALTH_BY_COUNTRY,
} from "./types";

export const getHealth = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/health");
        const res2 = await axios.get("/api/health/world");
        const res3 = await axios.get("/api/health/GB");

        console.log(res3.data);

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
    } catch (error) {
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
    } catch (error) {
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
