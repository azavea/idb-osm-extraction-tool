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
}) {
    const buttons = (() => {
        if (!active) {
            return (
                <Fragment>
                    <button
                        className="button -box"
                        onClick={() => dispatch(startDrawingBox())}
                    >
                        BOX
                    </button>
                    <button
                        className="button -shape"
                        onClick={() => dispatch(startDrawingShape())}
                    >
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
                            'CANCEL' :
                            'BOX'
                    }
                </button>
                <button
                    className="button -shape"
                    onClick={
                        drawTool === drawToolTypeEnum.box ?
                            () => dispatch(cancelDrawing()) :
                            null
                    }
                    disabled={drawTool === drawToolTypeEnum.box}
                >
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
};

function mapStateToProps({
    ui: {
        drawing: {
            drawTool,
            active,
        },
    },
}) {
    return {
        drawTool,
        active,
    };
}

export default connect(mapStateToProps)(DrawTools);
