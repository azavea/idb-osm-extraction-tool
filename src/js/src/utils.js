import shpwrite from 'shp-write';
import * as esriGeocoder from 'esri-leaflet-geocoder';

import { featureConfig, geocoderUrl } from './constants';

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

function createFormDataWithGeometry(shape, feature) {
    const bbox = convertGeoJSONGeometryToOverPassGeometry(shape);

    const osmEntities = featureConfig
        .filter(({ label }) => label === feature)
        .pop()
        .entities;

    const overpassQuery = osmEntities.map(({ tag, values }) => {
        if (values) {
            return values.map(value => `
                node["${tag}"="${value}"]${bbox};
                way["${tag}"="${value}"]${bbox};
                relation["${tag}"="${value}"]${bbox};
            `).join('');
        }
        return `
            node["${tag}"]${bbox};
            way["${tag}"]${bbox};
            relation["${tag}"]${bbox};
        `;
    });

    return `
[out:json];
(
    ${overpassQuery.join('')}
);
(._;>;);
out;
`;
}

export function createOverpassAPIRequestFormData(drawnShape, dateRange, features) {
    return createFormDataWithGeometry(drawnShape, features);
}

/**
 * Create Shapefile name from selected date range and features
 * @param {string} dateRange The selected date range
 * @param {string} feature The selected features
 * @returns {string} A filename
 */
function createShapefileName(/* dateRange */_, feature) {
    return feature;
}

/**
 * Download `geojson` as a Shapefile
 * @param {object} geojson The geojson to download
 * @param {string} dateRange The selected value from `dateRangeOptions`
 * @param {string} feature The selected values from `featureOptions`
 * @returns {object} Unmodified input geojson to use function in Promise chain
 */
export function downloadShapefile(geojson, dateRange, feature) {
    if (geojson.features.length) {
        const folder = createShapefileName(dateRange, feature);

        shpwrite.download(geojson, {
            file: folder,
            folder,
            types: {
                point: feature,
                polygon: feature,
                line: feature,
            },
        });
    }

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
