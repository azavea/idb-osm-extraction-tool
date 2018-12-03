import React from 'react';
import Control from 'react-leaflet-control';
import { func, oneOf } from 'prop-types';

import { controlPositionsEnum, osmUrl } from '../constants';

function navigateToEditor({ zoom, center }) {
    window.open(`${osmUrl}${zoom}/${center.lat}/${center.lng}`);
}

export default function SomethingWrongControl({
    position,
    getZoomAndCenter,
}) {
    return (
        <Control position={position}>
            <div className="something-wrong">
                Something look wrong?&nbsp;
                <button
                    onClick={() => navigateToEditor(getZoomAndCenter())}
                >
                    Edit the data in OSM
                </button>
            </div>
        </Control>
    );
}

SomethingWrongControl.propTypes = {
    position: oneOf(Object.values(controlPositionsEnum)).isRequired,
    getZoomAndCenter: func.isRequired,
};
