import {
    CANCEL_SUBSCRIPTION,
    SAVE_PAYMENT,
    SET_SUBSCRIPTION,
    SUBSCRIPTION_LOADING,
} from "../actions/types";

const initialState = {
    loading: true,
    subscriptions: [],
};

export default (state = initialState, actions) => {
    const { type, payload } = actions;

    switch (type) {
        case SUBSCRIPTION_LOADING:
            return {
                ...state,
                loading: true,
            };
        case SET_SUBSCRIPTION:
            return {
                ...state,
                loading: false,
                subscriptions: payload,
            };
        case SAVE_PAYMENT:
            return {
                loading: false,
                subscriptions: payload,
            };
        case CANCEL_SUBSCRIPTION:
            return {
                loading: false,
            };
        default:
            return state;
    }
};
