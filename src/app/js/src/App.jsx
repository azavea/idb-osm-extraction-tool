import React from 'react';

import Sidebar from './components/Sidebar';
import OSMExtractionMap from './components/OSMExtractionMap';

export default function App() {
    return (
        <div className="app-container">
            <Sidebar />
            <OSMExtractionMap />
        </div>
    );
}
