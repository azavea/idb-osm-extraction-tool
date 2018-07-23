import {
    START_DRAWING_BOX,
    START_DRAWING_SHAPE,
    CANCEL_DRAWING,
    COMPLETE_DRAWING,
    SELECT_DATE_RANGE,
    SELECT_FEATURES,
} from './actions.ui';

import { drawToolTypeEnum } from './constants';

const initialState = {
    drawing: {
        drawTool: null,
        active: false,
        drawnShape: null,
    },
    filters: {
        dateRange: null,
        features: null,
    },
};

export default function uiReducer(state = initialState, { type, payload }) {
    switch (type) {
        case START_DRAWING_BOX:
            return {
                ...state,
                drawing: {
                    ...state.drawing,
                    drawTool: drawToolTypeEnum.box,
                    active: true,
                    drawnShape: null,
                },
            };
        case START_DRAWING_SHAPE:
            return {
                ...state,
                drawing: {
                    ...state.drawing,
                    drawTool: drawToolTypeEnum.shape,
                    active: true,
                    drawnShape: null,
                },
            };
        case COMPLETE_DRAWING:
            return {
                ...state,
                drawing: {
                    ...state.drawing,
                    drawTool: null,
                    active: false,
                    drawnShape: payload,
                },
            };
        case CANCEL_DRAWING:
            return {
                ...state,
                drawing: initialState.drawing,
            };
        case SELECT_DATE_RANGE:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    dateRange: payload,
                },
            };
        case SELECT_FEATURES:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    features: payload,
                },
            };
        default:
            return state;
    }
}
