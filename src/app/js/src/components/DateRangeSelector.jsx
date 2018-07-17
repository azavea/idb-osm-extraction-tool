import React from 'react';
import { func, oneOf } from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';

import { selectDateRange } from '../actions.ui';

import { dateRangeOptions } from '../constants';

function DateRangeSelector({
    dateRange,
    dispatch,
}) {
    const handleSelectDateRange = ({ value }) => dispatch(selectDateRange(value));

    return (
        <div className="select -date">
            <div className="label">
                Date range
            </div>
            <Select
                name="date-range-selector"
                onChange={handleSelectDateRange}
                value={dateRange}
                options={dateRangeOptions}
                clearable={false}
                placeholder="Choose a date range..."
            />
            <div className="subscript">
                (optional)
            </div>
        </div>
    );
}

DateRangeSelector.defaultProps = {
    dateRange: null,
};

DateRangeSelector.propTypes = {
    dateRange: oneOf(dateRangeOptions.map(({ value }) => value)),
    dispatch: func.isRequired,
};

function mapStateToProps({
    ui: {
        filters: {
            dateRange,
        },
    },
}) {
    return {
        dateRange,
    };
}

export default connect(mapStateToProps)(DateRangeSelector);
