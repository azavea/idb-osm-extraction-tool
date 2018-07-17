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

export default function createOverpassAPIRequestFormData(drawnShape) {
    return createFormDataWithGeometry(drawnShape);
}
