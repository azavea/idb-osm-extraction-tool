export const START_DRAWING_BOX = 'START_DRAWING_BOX';
export const START_DRAWING_SHAPE = 'START_DRAWING_SHAPE';
export const CANCEL_DRAWING = 'CANCEL_DRAWING';
export const COMPLETE_DRAWING = 'COMPLETE_DRAWING';
export const SELECT_DATE_RANGE = 'SELECT_DATE_RANGE';
export const SELECT_FEATURES = 'SELECT_FEATURES';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export function startDrawingBox() {
    return {
        type: START_DRAWING_BOX,
    };
}

export function startDrawingShape() {
    return {
        type: START_DRAWING_SHAPE,
    };
}

export function cancelDrawing() {
    return {
        type: CANCEL_DRAWING,
    };
}

export function completeDrawing(payload) {
    return {
        type: COMPLETE_DRAWING,
        payload,
    };
}

export function selectDateRange(payload) {
    return {
        type: SELECT_DATE_RANGE,
        payload,
    };
}

export function selectFeatures(payload) {
    return {
        type: SELECT_FEATURES,
        payload,
    };
}

export function showModal() {
    return {
        type: SHOW_MODAL,
    };
}

export function hideModal() {
    return {
        type: HIDE_MODAL,
    };
}
