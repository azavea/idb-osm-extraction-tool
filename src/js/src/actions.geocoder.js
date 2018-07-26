import { suggest, geocode, filterSuggestions } from './utils';

import { guyanaBBox } from './constants';

export const START_GEOCODER_AUTOCOMPLETE = 'START_GEOCODER_AUTOCOMPLETE';
export const FAIL_GEOCODER_AUTOCOMPLETE = 'FAIL_GEOCODER_AUTOCOMPLETE';
export const COMPLETE_GEOCODER_AUTOCOMPLETE = 'COMPLETE_GEOCODER_AUTOCOMPLETE';

export const SELECT_GEOCODER_SEARCH_INPUT = 'SELECT_GEOCODER_SEARCH_INPUT';
export const SELECT_GEOCODER_COORDINATES_INPUT = 'SELECT_GEOCODER_COORDINATES_INPUT';
export const UPDATE_GEOCODER_SEARCH_INPUT = 'UPDATE_GEOCODER_SEARCH_INPUT';
export const CLEAR_GEOCODER_SEARCH_INPUT = 'CLEAR_GEOCODER_SEARCH_INPUT';

export const START_SELECT_GEOCODER_SUGGESTION = 'START_SELECT_GEOCODER_SUGGESTION';
export const FAIL_SELECT_GEOCODER_SUGGESTION = 'FAIL_SELECT_GEOCODER_SUGGESTION';
export const COMPLETE_SELECT_GEOCODER_SELECTION = 'COMPLETE_SELECT_GEOCODER_SUGGESTION';

export function selectGeocoderSearchInput() {
    return {
        type: SELECT_GEOCODER_SEARCH_INPUT,
    };
}

export function selectGeocoderCoordinatesInput() {
    return {
        type: SELECT_GEOCODER_COORDINATES_INPUT,
    };
}

function startGeocoderAutocomplete() {
    return {
        type: START_GEOCODER_AUTOCOMPLETE,
    };
}

function completeGeocoderAutocomplete(payload) {
    return {
        type: COMPLETE_GEOCODER_AUTOCOMPLETE,
        payload,
    };
}

function failGeocoderAutocomplete(e) {
    window.console.warn(e);

    return {
        type: FAIL_GEOCODER_AUTOCOMPLETE,
    };
}

export function updateGeocoderSearchInput(payload) {
    return (dispatch) => {
        dispatch(startGeocoderAutocomplete());

        dispatch({
            type: UPDATE_GEOCODER_SEARCH_INPUT,
            payload,
        });

        return payload ?
            suggest
                .text(payload)
                .within(guyanaBBox)
                .run((error, { suggestions }) => {
                    if (error) {
                        return dispatch(failGeocoderAutocomplete(error));
                    }

                    const guyanaSuggestions = filterSuggestions(suggestions);

                    return dispatch(completeGeocoderAutocomplete(guyanaSuggestions));
                }) :
            null;
    };
}

export function clearGeocoderSearchInput() {
    return {
        type: CLEAR_GEOCODER_SEARCH_INPUT,
    };
}

function startSelectGeocoderSuggestion() {
    return {
        type: START_SELECT_GEOCODER_SUGGESTION,
    };
}

function failSelectGeocoderSuggestion(e) {
    window.console.warn(e);

    return {
        type: FAIL_SELECT_GEOCODER_SUGGESTION,
    };
}

function completeSelectGeocoderSuggestion([payload]) {
    return (dispatch) => {
        if (!payload) {
            return dispatch(failSelectGeocoderSuggestion('No results'));
        }

        return dispatch({
            type: COMPLETE_SELECT_GEOCODER_SELECTION,
            payload,
        });
    };
}

export function selectGeocoderSuggestion(magicKey) {
    return (dispatch) => {
        dispatch(startSelectGeocoderSuggestion());

        return geocode
            .key(magicKey)
            .run((error, { results }) => {
                if (error) {
                    return dispatch(failSelectGeocoderSuggestion(error));
                }

                return dispatch(completeSelectGeocoderSuggestion(results));
            });
    };
}
