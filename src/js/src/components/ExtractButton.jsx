import React from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';

import { makeOverpassAPIRequest } from '../actions.data';

function ExtractButton({
    dispatch,
    disabled,
}) {
    const buttonClassName = disabled ?
        'button -extract -disabled' :
        'button -extract';

    return (
        <button
            className={buttonClassName}
            type="button"
            onClick={() => dispatch(makeOverpassAPIRequest())}
            disabled={disabled}
        >
            EXTRACT
        </button>
    );
}

ExtractButton.propTypes = {
    dispatch: func.isRequired,
    disabled: bool.isRequired,
};

function mapStateToProps({
    data: {
        overpass: {
            fetching,
        },
    },
    ui: {
        drawing: {
            drawnShape,
        },
        filters: {
            features,
        },
    },
}) {
    return {
        disabled: fetching || !drawnShape || !features,
    };
}

export default connect(mapStateToProps)(ExtractButton);
