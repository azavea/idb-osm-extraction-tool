import React from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';

import {
    showModal,
    hideModal,
} from '../actions.ui';

import InfoModal from './InfoModal';

function Header({
    dispatch,
    modalVisible,
}) {
    return (
        <div className="header">
            <div className="logo">
                <img src="/images/logo-chpa.png" alt="CH&PA logo" />
            </div>
            <h3 className="title">
                OSM EXTRACTION TOOL
            </h3>
            <Popup
                open={modalVisible}
                modal
                closeOnDocumentClick
                onClose={() => dispatch(hideModal())}
            >
                <InfoModal />
            </Popup>
            <button
                onClick={() => dispatch(showModal())}
                className="info button"
            >
                <i className="fa fa-info-circle" />
            </button>
        </div>
    );
}

Header.propTypes = {
    dispatch: func.isRequired,
    modalVisible: bool.isRequired,
};

function mapStateToProps({
    ui: {
        modalVisible,
    },
}) {
    return {
        modalVisible,
    };
}

export default connect(mapStateToProps)(Header);
