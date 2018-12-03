import L from 'leaflet';
import { arrayOf, bool, shape, string } from 'prop-types';

export const basemapTilesUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const basemapAttribution =
    'Powered by <a href="https://esri.com">Esri</a> | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
export const basemapMaxZoom = 19;

export const osmUrl = 'https://www.openstreetmap.org/edit?editor=id#map=';
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

export const overpassAPIurl = 'https://overpass-api.de/api/interpreter';

export const overpassDataStyle = {
    color: '#DFB059',
    fill: true,
    opacity: 1.0,
    fillOpacity: 1.0,
    radius: 5,
};

export const controlPositionsEnum = {
    topright: 'topright',
    topleft: 'topleft',
    bottomright: 'bottomright',
    bottomleft: 'bottomleft',
};

export const geocoderInputTypeEnum = {
    search: 'search',
    coordinates: 'coordinates',
};

export const geocoderSuggestionsPropType = arrayOf(shape({
    text: string,
    magicKey: string,
    isCollection: bool,
}));

export const geocoderUrl = 'https://utility.arcgis.com/usrsvcs/appservices/6Ag9gwdkF9pH4nRm/rest/services/World/GeocodeServer/';

export const guyanaBBox = L.latLngBounds(
    L.latLng(1.26808828369, -56.5393857489),
    L.latLng(8.36703481692, -61.4103029039),
);
