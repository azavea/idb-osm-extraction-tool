export const START_DRAWING_BOX = 'START_DRAWING_BOX';
export const START_DRAWING_SHAPE = 'START_DRAWING_SHAPE';
export const CANCEL_DRAWING = 'CANCEL_DRAWING';
export const COMPLETE_DRAWING = 'COMPLETE_DRAWING';

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
