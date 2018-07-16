import React from 'react';

export default function DrawTools() {
    return (
        <div className="draw-tools">
            <div className="label">
                Draw site boundaries
            </div>
            <div className="buttons">
                <button
                    className="button -box"
                    onClick={() => window.console.log('drawing rectangle')}
                >
                    BOX
                </button>
                <button
                    className="button -shape"
                    onClick={() => window.console.log('drawing shape')}
                >
                    SHAPE
                </button>
            </div>
        </div>
    );
}
