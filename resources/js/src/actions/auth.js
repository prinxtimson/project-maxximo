const axios = window.axios;
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
    AUTH_LOADING,
} from "./types";

// Load authenticated user action
export const loadUser = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/me");

        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
        // dispatch(getNotifications());
    } catch (err) {
        console.log(err.response);

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
    dispatch({ type: AUTH_LOADING });
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ email, password });

    try {
        await axios.get(`/sanctum/csrf-cookie`);

        const res = await axios.post("/api/login", body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });

        //dispatch(loadUser());
        window.location.replace("/");
    } catch (err) {
        console.log(err.response);
        if (err.response.status == 500) {
            return dispatch(
                setAlert("Server errror, please try again.", "danger")
            );
        }

        dispatch(setAlert(err.response.data.message, "danger"));

        dispatch({ type: LOGIN_FAIL });
    }
};

// Register user action
export const registerUser = (formData) => async (dispatch) => {
    dispatch({ type: AUTH_LOADING });
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify(formData);

    try {
        const res = await axios.post("/api/register", body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });

        //dispatch(loadUser());

        window.location.replace("/");
    } catch (err) {
        console.log(err.response);
        if (err.response.status == 500) {
            return dispatch(
                setAlert("Server errror, please try again.", "danger")
            );
        }

        dispatch(setAlert(err.response.data.message, "danger"));
        dispatch({ type: REGISTER_FAIL });
    }
};

export const changePassword = (data) => async (dispatch) => {
    dispatch({ type: AUTH_LOADING });
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify(data);

    try {
        const res = await axios.post("/api/change-password", body, config);

        dispatch(setAlert(res.data.message, "success"));
        window.location.reload();
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
            const res = await axios.post("/api/forgot-password", body, config);

            dispatch(
                setAlert(
                    "An email has been sent to you, please check your email.",
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

            dispatch(setAlert(err.response.data.message, "danger"));
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
            const res = await axios.post("/api/reset-password", body, config);

            dispatch(
                setAlert(
                    "Your password had been updated successfully.",
                    "success"
                )
            );

            handleSuccess();
            window.location.replace("/login");
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

// Logout user action
export const logoutUser = () => async (dispatch) => {
    try {
        await axios.post(`/logout`);
        window.location.reload();
    } catch (error) {
        console.log(err.response);
        if (err.response.status == 500) {
            return dispatch(
                setAlert("Server errror, please try again.", "danger")
            );
        }

        dispatch(setAlert(err.response.data.message, "danger"));
    }
};
