import React from 'react';
import Control from 'react-leaflet-control';
import { func, object, oneOf, string } from 'prop-types';

import {
    selectGeocoderSearchInput,
    selectGeocoderCoordinatesInput,
    updateGeocoderSearchInput,
    clearGeocoderSearchInput,
    selectGeocoderSuggestion,
} from '../actions.geocoder';

import {
    controlPositionsEnum,
    geocoderInputTypeEnum,
    geocoderSuggestionsPropType,
} from '../constants';

export default function OSMGeocoderControl({
    position,
    dispatch,
    activeInput,
    searchValue,
    suggestions,
    selection,
}) {
    const suggestionsList = (() => {
        if (!suggestions || selection) {
            return null;
        }

        return (
            <div className="suggestions">
                {
                    suggestions
                        .map(({ text, magicKey }) => (
                            <button
                                key={magicKey}
                                className="button"
                                onClick={() => dispatch(selectGeocoderSuggestion(magicKey))}
                            >
                                {text}
                            </button>
                        ))
                }
            </div>
        );
    })();

    return (
        <Control position={position}>
            <div className="geocoder">
                <div className="header">
                    <button
                        className={
                            activeInput === geocoderInputTypeEnum.search ?
                                'tab -on' :
                                'tab'
                        }
                        onClick={() => dispatch(selectGeocoderSearchInput())}
                    >
                        Search
                    </button>
                    <button
                        className={
                            activeInput === geocoderInputTypeEnum.coordinates ?
                                'tab -on' :
                                'tab'
                        }
                        onClick={() => dispatch(selectGeocoderCoordinatesInput())}
                    >
                        Coordinates
                    </button>
                </div>
                <div className="geocoder-input">
                    <button
                        className="button"
                        onClick={() => window.console.log('click')}
                    >
                        <i className="fas fa-search icon" />
                    </button>
                    <input
                        type="text"
                        className="input"
                        placeholder={activeInput}
                        value={selection ? selection.text : searchValue}
                        onChange={
                            ({ target: { value } }) => dispatch(updateGeocoderSearchInput(value))
                        }
                    />
                    <button
                        className="button"
                        onClick={() => dispatch(clearGeocoderSearchInput())}
                    >
                        <i className="fas fa-times icon" />
                    </button>
                </div>
                {suggestionsList}
            </div>
        </Control>
    );
}

OSMGeocoderControl.defaultProps = {
    suggestions: null,
    selection: null,
};

OSMGeocoderControl.propTypes = {
    position: oneOf(Object.values(controlPositionsEnum)).isRequired,
    activeInput: oneOf(Object.values(geocoderInputTypeEnum)).isRequired,
    searchValue: string.isRequired,
    suggestions: geocoderSuggestionsPropType,
    selection: object, // eslint-disable-line react/forbid-prop-types
    dispatch: func.isRequired,
};
