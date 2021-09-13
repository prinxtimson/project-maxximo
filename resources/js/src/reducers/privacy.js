import { PRIVACY_LOADING, SET_PRIVACY_POLICY } from "../actions/types";

const initialState = {
    loading: true,
    content: "",
};

export default (state = initialState, actions) => {
    const { type, payload } = actions;

    switch (type) {
        case SET_PRIVACY_POLICY:
            return {
                loading: false,
                content: payload,
            };
        case PRIVACY_LOADING:
            return {
                loading: true,
            };
        default:
            return state;
    }
};
