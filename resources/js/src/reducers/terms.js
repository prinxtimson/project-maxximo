import { SET_TERMS, TERMS_ERROR, TERMS_LOADING } from "../actions/types";

const initialState = {
    loading: true,
    content: null,
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
                ...state,
            };
        case TERMS_ERROR:
            return {
                loading: false,
                ...state,
            };
        default:
            return state;
    }
};
