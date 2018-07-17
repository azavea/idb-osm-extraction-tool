export const START_OVERPASS_REQUEST = 'START_OVERPASS_REQUEST';
export const FAIL_OVERPASS_REQUEST = 'FAIL_OVERPASS_REQUEST';
export const COMPLETE_OVERPASS_REQUEST = 'COMPLETE_OVERPASS_REQUEST';

function startOverpassRequest() {
    return {
        type: START_OVERPASS_REQUEST,
    };
}

function failOverpassRequest(e) {
    window.console.warn(e);

    return {
        type: FAIL_OVERPASS_REQUEST,
    };
}

function completeOverpassRequest(payload) {
    return {
        type: COMPLETE_OVERPASS_REQUEST,
        payload,
    };
}

export function makeOverpassAPIRequest() {
    return (dispatch) => {
        dispatch(startOverpassRequest());

        return Promise
            .resolve(1)
            .then(data => dispatch(completeOverpassRequest(data)))
            .catch(e => dispatch(failOverpassRequest(e)));
    };
}
