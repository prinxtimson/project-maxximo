import {
    ANALYTICS_ERROR,
    CLEAR_ANALYTICS,
    SET_ANALYTICS,
    SET_ANALYTICS_BOUNCE,
    SET_ANALYTICS_BROWSER,
    SET_ANALYTICS_COUNTRY,
    SET_ANALYTICS_DURATION,
    SET_ANALYTICS_PAGE_VISIT,
    SET_ANALYTICS_VISIT,
} from "../actions/types";

const initialState = {
    loading: true,
    visit: [],
    page: [],
    userType: [],
    browser: [],
    country: [],
    duration: [],
    bounce: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, actions) => {
    const { type, payload } = actions;

    switch (type) {
        case SET_ANALYTICS_VISIT:
        case SET_ANALYTICS:
            return {
                ...state,
                ...payload,
                loading: false,
            };
        case SET_ANALYTICS_BROWSER:
            return {
                ...state,
                browser: payload,
                loading: false,
            };
        case SET_ANALYTICS_BOUNCE:
            return {
                ...state,
                bounce: payload,
                loading: false,
            };
        case SET_ANALYTICS_PAGE_VISIT:
            return {
                ...state,
                page: payload,
                loading: false,
            };
        case SET_ANALYTICS_DURATION:
            return {
                ...state,
                duration: payload,
                loading: false,
            };
        case SET_ANALYTICS_COUNTRY:
            return {
                ...state,
                country: payload,
                loading: false,
            };
        case ANALYTICS_ERROR:
            return {
                ...state,
                loading: false,
            };
        case CLEAR_ANALYTICS:
            return {
                visit: [],
                page: [],
                userType: [],
                browser: [],
                country: [],
                duration: [],
                bounce: [],
                loading: true,
            };
        default:
            return state;
    }
};
