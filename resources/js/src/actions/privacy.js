const axios = window.axios;
import { setAlert } from "./alert";
import { PRIVACY_ERROR, PRIVACY_LOADING, SET_PRIVACY_POLICY } from "./types";

export const getPrivacy = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/content/privacy_policy");

        dispatch({
            type: SET_PRIVACY_POLICY,
            payload: res.data,
        });
    } catch (err) {
        console.log(err.response);
    }
};

export const savePrivacy = (data, id) => async (dispatch) => {
    dispatch({ type: PRIVACY_LOADING });
    try {
        const res = await axios.put(`/api/content/${id}`, data);

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
        dispatch({ type: PRIVACY_ERROR });
        dispatch(setAlert(err.response.data.message, "danger"));
    }
};
