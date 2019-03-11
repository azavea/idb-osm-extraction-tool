export default
/*
 * Configuration format for OSM features
 */
[
    {
        label: 'Buildings',
        entities: [
            {
                tag: 'building',
                values: ['residential', 'office', 'yes', 'house', 'warehouse', 'public', 'service', 'construction'],
            },
        ],
    },
    {
        label: 'Roads',
        entities: [
            {
                tag: 'highway',
                values: ['primary', 'secondary', 'tertiary', 'residential'],
            },
        ],
    },
    {
        label: 'Waterways',
        entities: [
            {
                tag: 'waterway',
                values: ['stream', 'river', 'riverbank', 'brook', 'rapids',
                    'waterfall', 'pond', 'drystream', 'ditch', 'drain',
                    'canal', 'dam', 'weir', 'lock_gate', 'artificial', 'dock',
                    'boatyard', 'derelict_canal', 'lock', 'fishpass',
                ],
            },
        ],
    },
    {
        label: 'Amenities',
        entities: [
            {
                tag: 'building',
                values: ['school', 'hospital', 'church', 'hotel'],
            },
            {
                tag: 'tourism',
                values: ['hotel', 'museum'],
            },
            {
                tag: 'amenity',
                values: ['school', 'place_of_worship', 'community_centre', 'hospital', 'library'],
            },
            {
                tag: 'aeroway',
                values: ['aerodrome'],
            },
        ],
    },
    {
        label: 'Power Infrastructure',
        entities: [
            {
                tag: 'power',
                values: ['tower', 'line', 'generator'],
            },
        ],
    },
    {
        label: 'Shop/Business',
        entities: [
            { tag: 'shop' },
            { tag: 'craft' },
            { tag: 'office' },
            {
                tag: 'building',
                values: ['office'],
            },
            {
                tag: 'amenity',
                values: ['restaurant', 'cafe', 'internet_cafe', 'bar', 'biergarten', 'fast_food', 'marketplace', 'fuel'],
            },
        ],
    },
    {
        label: 'Financial Amenities',
        entities: [
            {
                tag: 'amenity',
                values: ['bank', 'atm'],
            },
        ],
    },
    {
        label: 'Public Transport',
        entities: [
            { tag: 'public_transport' },
            {
                tag: 'amenity',
                values: ['bus_station'],
            },
            {
                tag: 'highway',
                values: ['bus_stop'],
            },
        ],
    },
    {
        label: 'Leisure/Sport',
        entities: [
            { tag: 'sport' },
            { tag: 'leisure' },
            {
                tag: 'landuse',
                values: ['recreation_ground'],
            },
        ],
    },
    {
        label: 'Emergency Infrastructure',
        entities: [
            { tag: 'emergency' },
        ],
    },
];
