const axios = window.axios;
import { setAlert } from "./alert";
import {
    CANCEL_SUBSCRIPTION,
    SAVE_PAYMENT,
    SET_SUBSCRIPTION,
    SUBSCRIPTION_LOADING,
} from "./types";

export const getSubscription = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/subscription");

        dispatch({
            type: SET_SUBSCRIPTION,
            payload: res.data,
        });
    } catch (err) {
        console.log(err.response);

        if (err.response.status == 500) {
            return dispatch(
                setAlert("Server errror, please try again.", "danger")
            );
        }

        dispatch(setAlert(err.response.data.message, "danger"));
    }
};

export const savePayment = (data, history) => async (dispatch) => {
    dispatch({ type: SUBSCRIPTION_LOADING });
    try {
        const res = await axios.post("/api/subscription/save-payment", data);

        dispatch(setAlert("payment successful", "success"));

        dispatch({
            type: SAVE_PAYMENT,
        });

        history.replace("/dashboard");
    } catch (err) {
        console.log(err.response);
        //dispatch({ type: PRIVACY_ERROR });
        if (err.response.status == 500) {
            return dispatch(
                setAlert("Server errror, please try again.", "danger")
            );
        }

        dispatch(setAlert(err.response.data.message, "danger"));
    }
};

export const cancelSubscription = (data, id) => async (dispatch) => {
    dispatch({ type: SUBSCRIPTION_LOADING });
    try {
        await axios.post(`/api/subscription/${id}/cancel`, data);

        dispatch(setAlert("Subscription canceled successful", "success"));

        dispatch({
            type: CANCEL_SUBSCRIPTION,
        });
    } catch (err) {
        console.log(err.response);
        //dispatch({ type: PRIVACY_ERROR });
        if (err.response.status == 500) {
            return dispatch(
                setAlert("Server errror, please try again.", "danger")
            );
        }

        dispatch(setAlert(err.response.data.message, "danger"));
    }
};

export const updateSubscription = (data, id) => async (dispatch) => {
    dispatch({ type: SUBSCRIPTION_LOADING });
    try {
        await axios.put(`/api/subscription/${id}`, data);

        dispatch(setAlert("Subscription updated successful", "success"));

        dispatch({
            type: SAVE_PAYMENT,
        });
    } catch (err) {
        console.log(err.response);
        //dispatch({ type: PRIVACY_ERROR });
        if (err.response.status == 500) {
            return dispatch(
                setAlert("Server errror, please try again.", "danger")
            );
        }

        dispatch(setAlert(err.response.data.message, "danger"));
    }
};
