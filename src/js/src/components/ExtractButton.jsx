import React from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';

import { makeOverpassAPIRequest } from '../actions.data';

function ExtractButton({
    dispatch,
    disabled,
    fetching,
}) {
    const buttonClassName = disabled ?
        'button -extract -disabled' :
        'button -extract';
    const text = fetching ? 'LOADING...' : 'EXTRACT';

    return (
        <button
            className={buttonClassName}
            type="button"
            onClick={() => dispatch(makeOverpassAPIRequest())}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

ExtractButton.propTypes = {
    dispatch: func.isRequired,
    disabled: bool.isRequired,
    fetching: bool.isRequired,
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
        fetching,
    };
}

export default connect(mapStateToProps)(ExtractButton);
