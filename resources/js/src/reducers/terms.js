import { SET_TERMS, TERMS_LOADING } from "../actions/types";

const initialState = {
    loading: true,
    content: "",
};

export default (state = initialState, actions) => {
    const { type, payload } = actions;

    switch (type) {
        case SET_TERMS:
            return {
                loading: false,
                content: payload,
            };
        case TERMS_LOADING:
            return {
                loading: true,
            };
        default:
            return state;
    }
};
