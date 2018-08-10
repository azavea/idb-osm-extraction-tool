import React from 'react';
import { func, oneOf } from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';

import { selectFeatures } from '../actions.ui';

import { featureOptions } from '../constants';

function FeatureSelector({
    features,
    dispatch,
}) {
    const handleSelectFeaturesChange = ({ value }) => dispatch(selectFeatures(value));

    return (
        <div className="select -feature">
            <div className="label">
                Feature
            </div>
            <Select
                classNamePrefix="react-select"
                name="feature-selector"
                onChange={handleSelectFeaturesChange}
                value={features}
                options={featureOptions}
                clearable={false}
                placeholder="Select a feature to extract..."
            />
        </div>
    );
}

FeatureSelector.defaultProps = {
    features: null,
};

FeatureSelector.propTypes = {
    features: oneOf(featureOptions.map(({ value }) => value)),
    dispatch: func.isRequired,
};

function mapStateToProps({
    ui: {
        filters: {
            features,
        },
    },
}) {
    return {
        features,
    };
}

export default connect(mapStateToProps)(FeatureSelector);
