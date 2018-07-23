import React from 'react';

import Sidebar from './components/Sidebar';
import LoadableMap from './components/LoadableMap';

export default function App() {
    return (
        <div className="app-container">
            <Sidebar />
            <LoadableMap />
        </div>
    );
}
