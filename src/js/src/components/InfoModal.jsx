import React from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';

import { hideModal } from '../actions.ui';

const listItems = [
    {
        header: 'Draw site boundaries',
        description: `Draw the boundaries of the location in which you will be
            building your development on the map.`,
    },
    {
        header: 'Feature',
        description: `Select the feature that you need to extract. Features are
            natural or manmade points, lines, or areas on the map, such as
            bodies of water or streets.`,
    },
    {
        header: 'Date range',
        description: `OpenStreetMap data is an open source project updated by
            volunteers like yourself. If you need data from a specific period
            of time (particularly if you have just made an update yourself)
            use the pre-selected options or the date-picker.`,
        optional: true,
    },
    {
        header: 'Extract',
        description: `If you have selected site boundaries and map features,
            the extract button should be enabled. Extract your data by clicking
            this button, and then check your downloads folder.`,
    },
    {
        header: 'Incorrect data',
        description: `If you notice that data in your download or visible on
            the map looks incorrect, you can`,
        unnumbered: true,
        link: (
            <a
                href="https://www.openstreetmap.org/"
                className="link"
                target="_blank"
                rel="noopener noreferrer"
            >
                go to OSM to fix it!
                <i className="fas fa-external-link-square-alt" />
            </a>
        ),
    },
];

function InfoModal({
    dispatch,
}) {
    const instructionsList = listItems.map(({
        header,
        description,
        optional,
        unnumbered,
        link,
    }, index) => (
        <li
            key={header}
            className="item"
        >
            <div className="number">
                {
                    unnumbered ?
                        <i className="fas fa-ban" /> :
                        index + 1
                }
            </div>
            <div className="text">
                <div className="header">
                    {header} {
                        optional ? (
                            <span className="optional">
                                (optional)
                            </span>) : null
                    }
                </div>
                <div className="description">
                    {description} {link || null}
                </div>
            </div>
        </li>));

    return (
        <div className="info-modal">
            <button
                className="button -close"
                onClick={() => dispatch(hideModal())}
            >
                <i className="fas fa-times" />
            </button>
            <div className="header">
                About the OSM Extraction Tool
            </div>
            <div className="description">
                The OSM Extraction Tool was created by the Inter-American
                Development Bank in partnership with CH&PA in Guyana.
            </div>
            <div className="instructions">
                <div className="header">
                    How to use
                </div>
                <ul className="list">
                    {instructionsList}
                </ul>
            </div>
            <button
                className="button -back"
                onClick={() => dispatch(hideModal())}
            >
                Back to Map
            </button>
        </div>
    );
}

InfoModal.propTypes = {
    dispatch: func.isRequired,
};

export default connect(() => ({}))(InfoModal);
