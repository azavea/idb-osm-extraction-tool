import {
    START_OVERPASS_REQUEST,
    FAIL_OVERPASS_REQUEST,
    COMPLETE_OVERPASS_REQUEST,
} from './actions.data';

const initialState = {
    overpass: {
        data: null,
        fetching: false,
        error: false,
    },
};

export default function dataReducer(state = initialState, { type, payload }) {
    switch (type) {
        case START_OVERPASS_REQUEST:
            return {
                ...state,
                overpass: {
                    ...state.overpass,
                    data: null,
                    fetching: true,
                    error: false,
                },
            };
        case FAIL_OVERPASS_REQUEST:
            return {
                ...state,
                overpass: {
                    ...state.overpass,
                    fetching: false,
                    error: true,
                },
            };
        case COMPLETE_OVERPASS_REQUEST:
            return {
                ...state,
                overpass: {
                    ...state.overpass,
                    fetching: false,
                    error: false,
                    data: payload,
                },
            };
        default:
            return state;
    }
}
