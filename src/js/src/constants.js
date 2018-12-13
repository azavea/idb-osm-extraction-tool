import L from 'leaflet';
import { arrayOf, bool, shape, string } from 'prop-types';
import moment from 'moment';

export { default as featureConfig } from './featureConfig';

export const basemapTilesUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const basemapAttribution =
    'Powered by <a href="https://esri.com">Esri</a> | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
export const basemapMaxZoom = 19;

export const osmUrl = 'https://www.openstreetmap.org/edit?editor=id#map=';

export const initialMapCenter = [
    6.7922,
    -58.1127,
];
export const initialMapZoom = 13;

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

// Unfortunately, moment's built-in .toISOString method isn't formatted in the
// way the Overpass API expects -- so we format it here.
const overpassDateFormat = 'YYYY-MM-DDThh:mm:ss';

export const dateRangeOptions = Object.freeze([
    Object.freeze({
        value: 'all',
        label: 'All',
        dateSelection: null,
    }),
    Object.freeze({
        value: 'pastMonth',
        label: 'Past month',
        dateSelection: moment()
            .subtract(1, 'months')
            .format(overpassDateFormat)
            .concat('Z'),
    }),
    Object.freeze({
        value: 'pastThreeMonths',
        label: 'Past 3 months',
        dateSelection: moment()
            .subtract(3, 'months')
            .format(overpassDateFormat)
            .concat('Z'),
    }),
    Object.freeze({
        value: 'pastYear',
        label: 'Past year',
        dateSelection: moment()
            .subtract(1, 'years')
            .format(overpassDateFormat)
            .concat('Z'),
    }),
]);

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
