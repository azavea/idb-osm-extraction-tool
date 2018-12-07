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
                values: ['residential', 'office'],
            },
        ],
    },
    {
        label: 'Roads',
        entities: [
            {
                tag: 'highway',
                values: ['primary', 'secondary', 'tertiary'],
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
                values: ['school', 'hospital'],
            },
            {
                tag: 'amenity',
                values: ['school', 'place_of_worship', 'community_centre', 'hospital'],
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
            { tag: 'office' },
        ],
    },
    {
        label: 'Financial Amenities',
        entities: [
            {
                tag: 'amenity',
                values: ['bank'],
            },
        ],
    },
    {
        label: 'Public Transport',
        entities: [
            { tag: 'public_transport' },
        ],
    },
    {
        label: 'Leisure/Sport',
        entities: [
            { tag: 'sport' },
        ],
    },
    {
        label: 'Emergency Infrastructure',
        entities: [
            { tag: 'emergency' },
        ],
    },
];
