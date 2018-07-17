import React from 'react';

import Header from './Header';
import DrawTools from './DrawTools';
import ExtractButton from './ExtractButton';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <Header />
            <DrawTools />
            <ExtractButton />
        </div>
    );
}
