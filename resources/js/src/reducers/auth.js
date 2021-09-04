import {
    ACCOUNT_DELETED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_USER,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_LOADING,
} from "../actions/types";

const initialState = {
    isAuthenticated: null,
    loading: true,
    user: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case AUTH_LOADING:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_USER:
        case ACCOUNT_DELETED:
            return {
                ...state,
                token: null,
                isAuthenticated: null,
                loading: false,
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                ...payload,
            };
        default:
            return state;
    }
};
