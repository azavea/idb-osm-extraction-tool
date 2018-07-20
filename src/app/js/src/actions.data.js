import axios from 'axios';
import osmtogeojson from 'osmtogeojson';

import { overpassAPIurl } from './constants';
import {
    createOverpassAPIRequestFormData,
    downloadShapefile,
} from './utils';

export const START_OVERPASS_REQUEST = 'START_OVERPASS_REQUEST';
export const FAIL_OVERPASS_REQUEST = 'FAIL_OVERPASS_REQUEST';
export const COMPLETE_OVERPASS_REQUEST = 'COMPLETE_OVERPASS_REQUEST';

const method = 'post';

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
    return (dispatch, getState) => {
        dispatch(startOverpassRequest());

        const {
            ui: {
                drawing: {
                    drawnShape,
                },
                filters: {
                    dateRange,
                    features,
                },
            },
        } = getState();

        if (!drawnShape) {
            return dispatch(failOverpassRequest('no drawn shape'));
        }

        const requestData = createOverpassAPIRequestFormData(
            drawnShape,
            dateRange,
            features,
        );

        return axios({
            method,
            data: requestData,
            url: overpassAPIurl,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        })
            .then(({ data }) => osmtogeojson(data))
            .then(data => downloadShapefile(data))
            .then(data => dispatch(completeOverpassRequest(data)))
            .catch(e => dispatch(failOverpassRequest(e)));
    };
}
