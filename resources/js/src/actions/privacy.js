const axios = window.axios;
import { setAlert } from "./alert";
import { PRIVACY_LOADING, SET_PRIVACY_POLICY } from "./types";

export const getPrivacy = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/privacy");

        dispatch({
            type: SET_PRIVACY_POLICY,
            payload: res.data,
        });
    } catch (err) {
        console.log(err.response);
    }
};

export const savePrivacy = (data) => async (dispatch) => {
    dispatch({ type: PRIVACY_LOADING });
    try {
        const res = await axios.post("/api/privacy", data);

        dispatch({
            type: SET_PRIVACY_POLICY,
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
