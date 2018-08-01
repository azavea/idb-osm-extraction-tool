import shpwrite from 'shp-write';
import * as esriGeocoder from 'esri-leaflet-geocoder';

import { geocoderUrl } from './constants';

function convertGeoJSONGeometryToOverPassGeometry({
    geometry: {
        coordinates: [
            feature,
        ],
    },
}) {
    const lineString = feature
        .reduce((acc, [x, y]) => acc.concat(' ', y, ' ', x), '')
        .substr(1);

    return `(poly: "${lineString}")`;
}

function createFormDataWithGeometry(shape) {
    const bbox = convertGeoJSONGeometryToOverPassGeometry(shape);

    return `
[out:json];
(
    node["building"]${bbox};
    way["building"]${bbox};
    relation["building"]${bbox};
);
out;
`;
}

export function createOverpassAPIRequestFormData(drawnShape) {
    return createFormDataWithGeometry(drawnShape);
}

/**
 * Create Shapefile name from selected date range and features
 * @param {string} dateRange The selected date range
 * @param {string} features The selected features
 * @returns {string} A filename
 */
function createShapefileName(/* dateRange */_, features) {
    return features;
}

/**
 * Download `geojson` as a Shapefile
 * @param {object} geojson The geojson to download
 * @param {string} dateRange The selected value from `dateRangeOptions`
 * @param {string} features The selected values from `featureOptions`
 * @returns {object} Unmodified input geojson to use function in Promise chain
 */
export function downloadShapefile(geojson, dateRange, features = 'buildings') {
    const folder = createShapefileName(dateRange, features);

    shpwrite.download(geojson, {
        file: folder,
        folder,
        types: {
            point: features,
            polygon: features,
            line: features,
        },
    });

    return geojson;
}

export const geocodingService = esriGeocoder.geocodeService({
    url: geocoderUrl,
    supportsSuggest: true,
    categories: [
        'Address',
        'Postal',
        'Populated Place',
    ],
});

export const suggest = geocodingService.suggest();
export const geocode = geocodingService.geocode();

/**
 * Filter non-Guyana locations out of the list of geocoder suggestions
 * @param {array} suggestions the geocoder's list of suggestions
 * @returns {array} A filtered list of suggestions
 */
export function filterSuggestions(suggestions = []) {
    return suggestions
        .reduce((acc, next) => {
            if (next.text.indexOf(', BRA') > -1 ||
                next.text.indexOf(', VEN') > -1 ||
                next.text.indexOf(', SUR') > -1 ||
                next.text.indexOf(', TTO') > -1) {
                return acc;
            }

            return acc.concat(next);
        }, []);
}
