import React from 'react';
import Select from 'react-select';

import { dateRangeOptions } from '../constants';

export default function DateRangeSelector() {
    return (
        <div className="select -date">
            <div className="label">
                Date range
            </div>
            <Select
                name="date-range-selector"
                value={null}
                options={dateRangeOptions}
            />
            <div className="subscript">
                (optional)
            </div>
        </div>
    );
}
