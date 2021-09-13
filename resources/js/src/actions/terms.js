const axios = window.axios;
import { setAlert } from "./alert";
import { SET_TERMS, TERMS_LOADING } from "./types";

export const getTerms = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/terms-and-conditions");

        dispatch({
            type: SET_TERMS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err.response);
    }
};

export const saveTerms = (data) => async (dispatch) => {
    dispatch({ type: TERMS_LOADING });
    try {
        const res = await axios.post("/api/terms-and-conditions", data);

        dispatch({
            type: SET_TERMS,
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
