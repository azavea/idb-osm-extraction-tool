import {
    SELECT_GEOCODER_SEARCH_INPUT,
    SELECT_GEOCODER_COORDINATES_INPUT,
    UPDATE_GEOCODER_SEARCH_INPUT,
    CLEAR_GEOCODER_SEARCH_INPUT,
    START_GEOCODER_AUTOCOMPLETE,
    COMPLETE_GEOCODER_AUTOCOMPLETE,
    FAIL_GEOCODER_AUTOCOMPLETE,
    START_SELECT_GEOCODER_SUGGESTION,
    FAIL_SELECT_GEOCODER_SUGGESTION,
    COMPLETE_SELECT_GEOCODER_SELECTION,
    UPDATE_LATITUDE_COORDINATE,
    UPDATE_LONGITUDE_COORDINATE,
    COMPLETE_SELECT_COORDINATES_FROM_GEOCODER,
} from './actions.geocoder';

import { geocoderInputTypeEnum } from './constants';

const initialState = {
    results: {
        suggestions: null,
        coordinates: null,
        selection: null,
        error: false,
    },
    search: {
        activeInput: geocoderInputTypeEnum.search,
        searchValue: '',
        coordinates: {
            lat: '',
            lng: '',
        },
    },
};

export default function geocoderReducer(state = initialState, { type, payload }) {
    switch (type) {
        case UPDATE_LATITUDE_COORDINATE:
            return {
                ...state,
                results: {
                    ...state.results,
                    coordinates: null,
                },
                search: {
                    ...state.search,
                    searchValue: initialState.search.searchValue,
                    coordinates: {
                        ...state.search.coordinates,
                        lat: payload,
                    },
                },
            };
        case UPDATE_LONGITUDE_COORDINATE:
            return {
                ...state,
                results: {
                    ...state.results,
                    coordinates: null,
                },
                search: {
                    ...state.search,
                    searchValue: initialState.search.searchValue,
                    coordinates: {
                        ...state.search.coordinates,
                        lng: payload,
                    },
                },
            };
        case COMPLETE_SELECT_COORDINATES_FROM_GEOCODER:
            return {
                ...state,
                results: {
                    ...state.results,
                    coordinates: payload,
                },
                search: {
                    ...state.search,
                    coordinates: payload,
                },
            };
        case START_SELECT_GEOCODER_SUGGESTION:
            return state;
        case FAIL_SELECT_GEOCODER_SUGGESTION:
            return {
                ...state,
                results: {
                    ...state.results,
                    error: true,
                },
            };
        case COMPLETE_SELECT_GEOCODER_SELECTION:
            return {
                ...state,
                results: {
                    ...state.results,
                    suggestions: initialState.results.suggestions,
                    selection: payload,
                    error: false,
                },
            };
        case SELECT_GEOCODER_SEARCH_INPUT:
            return {
                ...state,
                search: {
                    ...state.search,
                    activeInput: geocoderInputTypeEnum.search,
                },
            };
        case SELECT_GEOCODER_COORDINATES_INPUT:
            return {
                ...state,
                search: {
                    ...state.search,
                    activeInput: geocoderInputTypeEnum.coordinates,
                },
            };
        case UPDATE_GEOCODER_SEARCH_INPUT:
            return {
                ...state,
                results: {
                    ...state.results,
                    selection: null,
                },
                search: {
                    ...state.search,
                    searchValue: payload,
                    coordinates: initialState.search.coordinates,
                },
            };
        case CLEAR_GEOCODER_SEARCH_INPUT:
            return {
                ...state,
                results: {
                    ...state.results,
                    selection: null,
                    suggestions: null,
                },
                search: {
                    ...state.search,
                    searchValue: initialState.search.searchValue,
                    coordinates: initialState.search.coordinates,
                },
            };
        case START_GEOCODER_AUTOCOMPLETE:
            return {
                ...state,
                results: {
                    ...state.results,
                    suggestions: null,
                    error: null,
                },
            };
        case COMPLETE_GEOCODER_AUTOCOMPLETE:
            return {
                ...state,
                results: {
                    ...state.results,
                    suggestions: payload,
                },
            };
        case FAIL_GEOCODER_AUTOCOMPLETE:
            return {
                ...state,
                results: {
                    ...state.results,
                    error: true,
                },
            };
        default:
            return state;
    }
}
