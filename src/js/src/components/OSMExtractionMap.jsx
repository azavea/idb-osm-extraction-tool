import React, { Component } from 'react';
import { bool, func, object, oneOf, string } from 'prop-types';
import { connect } from 'react-redux';
import {
    Map as ReactLeafletMap,
    TileLayer,
    ZoomControl,
    GeoJSON,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';

import {
    cancelDrawing,
    completeDrawing,
} from '../actions.ui';

import {
    basemapTilesUrl,
    basemapAttribution,
    basemapMaxZoom,
    initialMapCenter,
    initialMapZoom,
    drawToolTypeEnum,
    areaOfInterestStyle,
    overpassDataStyle,
    controlPositionsEnum,
    geocoderInputTypeEnum,
    geocoderSuggestionsPropType,
} from '../constants';

import OSMGeocoderControl from './OSMGeocoderControl';

class OSMExtractionMap extends Component {
    constructor(props) {
        super(props);
        this.handleDrawAreaOfInterest = this.handleDrawAreaOfInterest.bind(this);
        this.handleCancelDrawing = this.handleCancelDrawing.bind(this);
    }

    componentDidMount() {
        const {
            leafletMap: {
                leafletElement,
            },
        } = this;

        leafletElement.on(
            L.Draw.Event.DRAWSTOP,
            this.handleCancelDrawing,
        );

        leafletElement.on(
            L.Draw.Event.CREATED,
            this.handleDrawAreaOfInterest,
        );

        this.rectangleDrawHandler = new L.Draw.Rectangle(leafletElement, {
            shapeOptions: areaOfInterestStyle,
        });

        this.polygonDrawHandler = new L.Draw.Polygon(leafletElement, {
            shapeOptions: areaOfInterestStyle,
        });
    }

    componentDidUpdate({
        drawingActive: drawingWasActive,
        geocoderSelection: previousGeocoderSelection,
    }) {
        const {
            drawTool,
            drawingActive,
            geocoderSelection,
        } = this.props;

        if (drawingActive && !drawingWasActive) {
            switch (drawTool) {
                case drawToolTypeEnum.box:
                    this.rectangleDrawHandler.enable();
                    break;
                case drawToolTypeEnum.shape:
                    this.polygonDrawHandler.enable();
                    break;
                default:
                    window.console.warn('invalid draw tool type');
                    break;
            }
        } else {
            this.polygonDrawHandler.disable();
            this.rectangleDrawHandler.disable();
        }

        if (!geocoderSelection) {
            return null;
        }

        if (previousGeocoderSelection &&
            previousGeocoderSelection.text === geocoderSelection.text) {
            return null;
        }

        return this.leafletMap.leafletElement.fitBounds(geocoderSelection.bounds);
    }

    handleDrawAreaOfInterest({ layer }) {
        return this.props.dispatch(completeDrawing(layer.toGeoJSON()));
    }

    handleCancelDrawing() {
        return !this.props.drawnShape ?
            this.props.dispatch(cancelDrawing()) :
            null;
    }

    render() {
        const {
            drawnShape,
            data,
            activeGeocoderInput,
            geocoderSearchValue,
            geocoderSuggestions,
            geocoderSelection,
            dispatch,
        } = this.props;

        const areaOfInterest = drawnShape ? (
            <GeoJSON
                data={drawnShape}
                style={areaOfInterestStyle}
            />) : null;

        const overpassAPIData = data ? (
            <GeoJSON
                data={data}
                pointToLayer={
                    (_, latLng) => L.circleMarker(latLng, overpassDataStyle)
                }
            />) : null;

        return (
            <ReactLeafletMap
                id="osm-extraction-map"
                ref={(m) => { this.leafletMap = m; }}
                center={initialMapCenter}
                zoom={initialMapZoom}
                zoomControl={false}
            >
                <TileLayer
                    url={basemapTilesUrl}
                    attribution={basemapAttribution}
                    maxZoom={basemapMaxZoom}
                />
                <ZoomControl position={controlPositionsEnum.topright} />
                <OSMGeocoderControl
                    position={controlPositionsEnum.topleft}
                    activeInput={activeGeocoderInput}
                    searchValue={geocoderSearchValue}
                    suggestions={geocoderSuggestions}
                    selection={geocoderSelection}
                    dispatch={dispatch}
                />
                {areaOfInterest}
                {overpassAPIData}
            </ReactLeafletMap>
        );
    }
}

OSMExtractionMap.defaultProps = {
    drawTool: null,
    drawnShape: null,
    data: null,
    geocoderSuggestions: null,
    geocoderSelection: null,
};

OSMExtractionMap.propTypes = {
    dispatch: func.isRequired,
    drawTool: oneOf(Object.values(drawToolTypeEnum)),
    drawnShape: object, // eslint-disable-line react/forbid-prop-types
    data: object, // eslint-disable-line react/forbid-prop-types
    drawingActive: bool.isRequired,
    activeGeocoderInput: oneOf(Object.values(geocoderInputTypeEnum)).isRequired,
    geocoderSearchValue: string.isRequired,
    geocoderSuggestions: geocoderSuggestionsPropType,
    geocoderSelection: object, // eslint-disable-line react/forbid-prop-types
};

function mapStateToProps({
    ui: {
        drawing: {
            drawTool,
            active: drawingActive,
            drawnShape,
        },
    },
    geocoder: {
        results: {
            suggestions,
            selection,
        },
        search: {
            activeInput,
            searchValue,
        },
    },
    data: {
        overpass: {
            data,
        },
    },
}) {
    return {
        drawTool,
        drawingActive,
        drawnShape,
        data,
        activeGeocoderInput: activeInput,
        geocoderSearchValue: searchValue,
        geocoderSuggestions: suggestions,
        geocoderSelection: selection,
    };
}

export default connect(mapStateToProps)(OSMExtractionMap);
