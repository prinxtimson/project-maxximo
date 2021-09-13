const axios = window.axios;
import { setAlert } from "./alert";
import { SET_TERMS, TERMS_ERROR, TERMS_LOADING } from "./types";

export const getTerms = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/content/terms_and_conditions");

        dispatch({
            type: SET_TERMS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err.response);
    }
};

export const saveTerms = (data, id) => async (dispatch) => {
    dispatch({ type: TERMS_LOADING });
    try {
        const res = await axios.put(`/api/content/${id}`, data);

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
        dispatch({ type: TERMS_ERROR });
        dispatch(setAlert(err.response.data.message, "danger"));
    }
};
