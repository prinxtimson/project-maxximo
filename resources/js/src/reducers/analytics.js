import {
    ANALYTICS_ERROR,
    CLEAR_ANALYTICS,
    SET_ANALYTICS,
    SET_ANALYTICS_PAGE_VISIT,
    SET_ANALYTICS_VISIT,
} from "../actions/types";

const initialState = {
    loading: true,
    visit: [],
    page: [],
    userType: [],
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
        case SET_ANALYTICS_PAGE_VISIT:
            return {
                ...state,
                page: payload,
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
                loading: true,
            };
        default:
            return state;
    }
};
