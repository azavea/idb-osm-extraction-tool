import shpwrite from 'shp-write';

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
