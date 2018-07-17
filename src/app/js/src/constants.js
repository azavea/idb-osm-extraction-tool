export const basemapTilesUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const basemapAttribution =
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
export const basemapMaxZoom = 19;

export const initialMapCenter = [
    4.8604,
    -58.9302,
];
export const initialMapZoom = 7;

export const drawToolTypeEnum = {
    box: 'box',
    shape: 'shape',
};

export const areaOfInterestStyle = {
    color: '#0A393C',
    fill: false,
    opacity: 1.0,
    weight: 3,
};

export const featureOptions = [
    {
        value: 'buildings',
        label: 'Buildings',
    },
    {
        value: 'emergencyInfraStructure',
        label: 'Emergency infrastructure',
    },
    {
        value: 'powerInfrastructure',
        label: 'Power infrastructure',
    },
    {
        value: 'roads',
        label: 'Roads',
    },
    {
        value: 'waterways',
        label: 'Waterways',
    },
    {
        value: 'airports',
        label: 'Airports',
    },
];

export const dateRangeOptions = [
    {
        value: 'all',
        label: 'All',
    },
    {
        value: 'pastMonth',
        label: 'Past month',
    },
    {
        value: 'pastThreeMonths',
        label: 'Past 3 months',
    },
    {
        value: 'pastYear',
        label: 'Past year',
    },
];
