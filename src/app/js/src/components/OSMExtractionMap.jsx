import React from 'react';
import {
    Map as ReactLeafletMap,
    TileLayer,
    ZoomControl,
} from 'react-leaflet';

import {
    basemapTilesUrl,
    basemapAttribution,
    basemapMaxZoom,
    initialMapCenter,
    initialMapZoom,
} from '../constants';

export default function OSMExtractionMap() {
    return (
        <ReactLeafletMap
            id="osm-extraction-map"
            center={initialMapCenter}
            zoom={initialMapZoom}
            zoomControl={false}
        >
            <TileLayer
                url={basemapTilesUrl}
                attribution={basemapAttribution}
                maxZoom={basemapMaxZoom}
            />
            <ZoomControl position="topright" />
        </ReactLeafletMap>
    );
}
