import React from 'react';

export default function ExtractButton() {
    return (
        <button
            className="button -extract"
            type="button"
            onClick={() => window.console.log('Extracting Shapefile from OSM data')}
        >
            EXTRACT
        </button>
    );
}
