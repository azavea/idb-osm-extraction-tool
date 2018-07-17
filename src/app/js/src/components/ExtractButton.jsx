import React from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';

import { makeOverpassAPIRequest } from '../actions.data';

function ExtractButton({
    dispatch,
    fetching,
}) {
    return (
        <button
            className="button -extract"
            type="button"
            onClick={() => dispatch(makeOverpassAPIRequest())}
            disabled={fetching}
        >
            EXTRACT
        </button>
    );
}

ExtractButton.propTypes = {
    dispatch: func.isRequired,
    fetching: bool.isRequired,
};

function mapStateToProps({
    data: {
        overpass: {
            fetching,
        },
    },
}) {
    return {
        fetching,
    };
}

export default connect(mapStateToProps)(ExtractButton);
