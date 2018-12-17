import React from 'react';

import Header from './Header';
import DrawTools from './DrawTools';
import FeatureSelector from './FeatureSelector';
import DateRangeSelector from './DateRangeSelector';
import ExtractButton from './ExtractButton';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <Header />
            <DrawTools />
            <div className="filters">
                <FeatureSelector />
                <DateRangeSelector />
            </div>
            <ExtractButton />
        </div>
    );
}
