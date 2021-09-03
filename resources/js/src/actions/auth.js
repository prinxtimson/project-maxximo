import axios from "axios";
import { setAlert } from "./alert";
import {
    AUTH_ERROR,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_USER,
    CLEAR_PROFILE,
} from "./types";

// Load authenticated user action
export const loadUser = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/me");

        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
        dispatch(getNotifications());
    } catch (err) {
        console.log(err.response);
        if (err.response.status == 500) {
            return dispatch(
                setAlert("Server errror, please try again.", "danger")
            );
        }

        dispatch(setAlert(err.response.data, "danger"));

        dispatch({ type: AUTH_ERROR });
    }
};

// Upload user avatar action
export const uploadAvatar = (file) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };

    try {
        const res = await axios.post("/api/users/upload", file, config);

        dispatch(loadUser());
        dispatch(getCurrentProfile());
        dispatch(setAlert(res.data.msg, "success"));
    } catch (err) {
        const { errors } = err.response.data;
        console.log(errors);

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
    }
};

//Login user action
export const loginUser = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ email, password });

    try {
        await axios.get(`${BASE_URL}/sanctum/csrf-cookie`);

        const res = await axios.post("/login", body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());
    } catch (err) {
        console.log(err.response);
        if (err.response.status == 500) {
            return dispatch(
                setAlert("Server errror, please try again.", "danger")
            );
        }

        dispatch(setAlert(err.response.data, "danger"));

        dispatch({ type: LOGIN_FAIL });
    }
};

// Register user action
export const registerUser = (formData) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify(formData);

    try {
        const res = await axios.post("/api/users", body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());
    } catch (err) {
        console.log(err.response);
        if (err.response.status == 500) {
            return dispatch(
                setAlert("Server errror, please try again.", "danger")
            );
        }

        dispatch(setAlert(err.response.data, "danger"));
        dispatch({ type: REGISTER_FAIL });
    }
};

// Request Password reset action
export const requestPasswordReset =
    (email, handleSuccess) => async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify({ email });

        try {
            const res = await axios.put("/api/forgot-password", body, config);

            dispatch(setAlert(res.data.msg, "success"));
            handleSuccess();
        } catch (err) {
            console.log(err.response);
            if (err.response.status == 500) {
                return dispatch(
                    setAlert("Server errror, please try again.", "danger")
                );
            }

            dispatch(setAlert(err.response.data, "danger"));
        }
    };

// Reset password action
export const resetPassword =
    (data, token, handleSuccess) => async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify({ ...data, token });
        try {
            const res = await axios.put("/api/reset-password", body, config);

            dispatch(
                setAlert(
                    "Your password had been updated successfully.",
                    "success"
                )
            );

            handleSuccess();
        } catch (err) {
            console.log(err.response);
            if (err.response.status == 500) {
                return dispatch(
                    setAlert("Server errror, please try again.", "danger")
                );
            }

            dispatch(setAlert(err.response.data, "danger"));
        }
    };

// Logout user action
export const logoutUser = () => async (dispatch) => {
    try {
        await axios.post(`/logout`);
        location.replace("/login");
        dispatch({ type: CLEAR_PROFILE });
        dispatch({ type: LOGOUT_USER });
    } catch (error) {
        console.log(err.response);
        if (err.response.status == 500) {
            return dispatch(
                setAlert("Server errror, please try again.", "danger")
            );
        }

        dispatch(setAlert(err.response.data, "danger"));
    }
};
