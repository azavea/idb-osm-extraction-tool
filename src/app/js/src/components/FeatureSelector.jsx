import React from 'react';
import Select from 'react-select';

import { featureOptions } from '../constants';

export default function FeatureSelector() {
    return (
        <div className="select -feature">
            <div className="label">
                Feature
            </div>
            <Select
                name="feature-selector"
                value={null}
                options={featureOptions}
            />
        </div>
    );
}
