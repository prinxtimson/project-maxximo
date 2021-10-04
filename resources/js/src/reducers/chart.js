import {
    CHART_ERROR,
    CLEAR_CHART,
    GET_HEALTH,
    GET_HEALTH_BY_COUNTRY,
} from "../actions/types";

const initialState = {
    loading: true,
    health: {
        history: null,
        world: null,
        country: null,
    },
    sport: null,
    food: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_HEALTH:
            return {
                ...state,
                health: payload,
                loading: false,
            };
        case CLEAR_CHART:
            return {
                loading: true,
                health: null,
                sport: null,
                food: null,
            };
        case GET_HEALTH_BY_COUNTRY:
            return {
                ...state,
                health: {
                    ...state.health,
                    country: payload,
                },
            };
        case CHART_ERROR:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
