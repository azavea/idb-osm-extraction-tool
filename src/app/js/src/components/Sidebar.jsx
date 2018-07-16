import React from 'react';

import Header from './Header';
import ExtractButton from './ExtractButton';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <Header />
            <ExtractButton />
        </div>
    );
}
