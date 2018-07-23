import React, { Fragment } from 'react';
import { bool, func, oneOf } from 'prop-types';
import { connect } from 'react-redux';

import {
    startDrawingBox,
    startDrawingShape,
    cancelDrawing,
} from '../actions.ui';

import { drawToolTypeEnum } from '../constants';

function DrawTools({
    dispatch,
    drawTool,
    active,
    boundariesConfirmed,
}) {
    const drawBoxIcon = <i className="far fa-square" />;
    const drawShapeIcon = <i className="far fa-star" />;
    const cancelIcon = <i className="far fa-times-circle" />;
    const checkmarkIcon = <i className="fas fa-check" />;

    const buttons = (() => {
        if (boundariesConfirmed) {
            return (
                <button
                    className="button -confirmed"
                    onClick={() => dispatch(cancelDrawing())}
                >
                    {checkmarkIcon}
                    Boundaries confirmed
                    {cancelIcon}
                </button>
            );
        }

        if (!active) {
            return (
                <Fragment>
                    <button
                        className="button -box"
                        onClick={() => dispatch(startDrawingBox())}
                    >
                        {drawBoxIcon}
                        BOX
                    </button>
                    <button
                        className="button -shape"
                        onClick={() => dispatch(startDrawingShape())}
                    >
                        {drawShapeIcon}
                        SHAPE
                    </button>
                </Fragment>
            );
        }

        return (
            <Fragment>
                <button
                    className="button -box"
                    onClick={
                        drawTool === drawToolTypeEnum.box ?
                            () => dispatch(cancelDrawing()) :
                            null
                    }
                    disabled={drawTool === drawToolTypeEnum.shape}
                >
                    {
                        drawTool === drawToolTypeEnum.box ?
                            cancelIcon :
                            drawBoxIcon
                    }
                    {
                        drawTool === drawToolTypeEnum.box ?
                            'CANCEL' :
                            'BOX'
                    }
                </button>
                <button
                    className="button -shape"
                    onClick={
                        drawTool === drawToolTypeEnum.shape ?
                            () => dispatch(cancelDrawing()) :
                            null
                    }
                    disabled={drawTool === drawToolTypeEnum.box}
                >
                    {
                        drawTool === drawToolTypeEnum.shape ?
                            cancelIcon :
                            drawShapeIcon
                    }
                    {
                        drawTool === drawToolTypeEnum.shape ?
                            'CANCEL' :
                            'SHAPE'
                    }
                </button>
            </Fragment>
        );
    })();

    return (
        <div className="draw-tools">
            <div className="label">
                Draw site boundaries
            </div>
            <div className="buttons">
                {buttons}
            </div>
        </div>
    );
}

DrawTools.defaultProps = {
    drawTool: null,
};

DrawTools.propTypes = {
    dispatch: func.isRequired,
    drawTool: oneOf(Object.values(drawToolTypeEnum)),
    active: bool.isRequired,
    boundariesConfirmed: bool.isRequired,
};

function mapStateToProps({
    ui: {
        drawing: {
            drawTool,
            active,
            drawnShape,
        },
    },
}) {
    return {
        drawTool,
        active,
        boundariesConfirmed: !!drawnShape,
    };
}

export default connect(mapStateToProps)(DrawTools);
