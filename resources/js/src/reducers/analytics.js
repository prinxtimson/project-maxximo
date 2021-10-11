import {
    ANALYTICS_ERROR,
    CLEAR_ANALYTICS,
    SET_ANALYTICS,
    SET_ANALYTICS_VISIT,
} from "../actions/types";

const initialState = {
    loading: true,
    visit: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, actions) => {
    const { type, payload } = actions;

    switch (type) {
        case SET_ANALYTICS_VISIT:
        case SET_ANALYTICS:
            return {
                ...state,
                visit: payload,
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
                loading: true,
            };
        default:
            return state;
    }
};
