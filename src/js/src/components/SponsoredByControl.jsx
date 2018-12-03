import React from 'react';
import Control from 'react-leaflet-control';
import { oneOf } from 'prop-types';

import { controlPositionsEnum } from '../constants';
import idbLogo from '../../../images/logo-idb-full.png';

export default function SponsoredByControl({ position }) {
    return (
        <Control position={position}>
            <div className="logo -idb">
                <div>sponsored by</div>
                <a href="https://www.iadb.org/" target="_blank" rel="noopener noreferrer">
                    <img src={idbLogo} alt="Inter-American Development Bank logo" />
                </a>
            </div>
        </Control>
    );
}

SponsoredByControl.propTypes = {
    position: oneOf(Object.values(controlPositionsEnum)).isRequired,
};
