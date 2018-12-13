import shpwrite from 'shp-write';
import * as esriGeocoder from 'esri-leaflet-geocoder';

import { featureConfig, geocoderUrl, dateRangeOptions } from './constants';

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

const createOverpassQueryFunction = bbox => tag =>
    `
    node["${tag}"]${bbox};
    way["${tag}"]${bbox};
    relation["${tag}"]${bbox};
    `;

const createOverpassValueQueryFunction = bbox => (tag, value) =>
    `
    node["${tag}"="${value}"]${bbox};
    way["${tag}"="${value}"]${bbox};
    relation["${tag}"="${value}"]${bbox};
    `;

const createOverpassDateQueryFunction = (bbox, dateSelection) => tag =>
    `
    node["${tag}"]${bbox}(newer:"${dateSelection}");
    way["${tag}"]${bbox}(newer:"${dateSelection}");
    relation["${tag}"]${bbox}(newer:"${dateSelection}");
    `;

const createOverpassDateValueQueryFunction = (bbox, dateSelection) => (tag, value) =>
    `
    node["${tag}"="${value}"]${bbox}(newer:"${dateSelection}");
    way["${tag}"="${value}"]${bbox}(newer:"${dateSelection}");
    relation["${tag}"="${value}"]${bbox}(newer:"${dateSelection}");
    `;

function createFormDataWithGeometry(shape, dateRange, feature) {
    const bbox = convertGeoJSONGeometryToOverPassGeometry(shape);

    const { dateSelection } = dateRange
        ? dateRangeOptions.find(({ value }) => value === dateRange)
        : { dateSelection: null };

    const osmEntities = featureConfig
        .filter(({ label }) => label === feature)
        .pop()
        .entities;

    const createOverpassQueryString = dateSelection
        ? createOverpassDateQueryFunction(bbox, dateSelection)
        : createOverpassQueryFunction(bbox);

    const createOverpassValueQueryString = dateSelection
        ? createOverpassDateValueQueryFunction(bbox, dateSelection)
        : createOverpassValueQueryFunction(bbox);

    const overpassQuery = osmEntities.map(({ tag, values }) => {
        if (values) {
            return values
                .map(value => createOverpassValueQueryString(tag, value))
                .join('');
        }

        return createOverpassQueryString(tag);
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
    return createFormDataWithGeometry(drawnShape, dateRange, features);
}

/**
 * Create Shapefile name from selected date range and features
 * @param {string} feature The selected features
 * @param {string} dateRange The selected date range
 * @returns {string} A filename
 */
function createShapefileName(feature, dateRange = null) {
    if (!dateRange) {
        return feature;
    }

    const { dateSelection } = dateRangeOptions
        .find(({ value }) => value === dateRange);

    return dateSelection
        ? `${feature}-since-${dateSelection}`
        : feature;
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
        const folder = createShapefileName(feature, dateRange);

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
