import {
    CHART_ERROR,
    CLEAR_CHART,
    GET_FOOD,
    GET_HEALTH,
    GET_HEALTH_BY_COUNTRY,
    GET_SPORT,
    GET_VIDEO,
} from "../actions/types";

const initialState = {
    loading: true,
    health: {
        history: null,
        world: null,
        country: null,
    },
    sport: {
        tennis: null,
    },
    food: null,
    entertainment: {
        video: null,
    },
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
                health: {
                    history: null,
                    world: null,
                    country: null,
                },
                sport: {
                    tennis: null,
                },
                food: null,
                entertainment: {
                    video: null,
                },
            };
        case GET_HEALTH_BY_COUNTRY:
            return {
                ...state,
                health: {
                    ...state.health,
                    country: payload,
                },
            };
        case GET_FOOD:
            return {
                ...state,
                loading: false,
                food: payload,
            };
        case GET_SPORT:
            return {
                ...state,
                loading: false,
                sport: {
                    ...state.sport,
                    tennis: payload,
                },
            };
        case GET_VIDEO:
            return {
                ...state,
                loading: false,
                entertainment: {
                    ...state.entertainment,
                    video: payload,
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
