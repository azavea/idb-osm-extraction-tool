import React, { Component } from 'react';
import { bool, func, number, object, oneOf, oneOfType, string } from 'prop-types';
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
import SponsoredByControl from './SponseredByControl';
import SomethingWrongControl from './SomethingWrongControl';

const PRECLICK = 'preclick';

class OSMExtractionMap extends Component {
    constructor(props) {
        super(props);
        this.handleDrawAreaOfInterest = this.handleDrawAreaOfInterest.bind(this);
        this.handleCancelDrawing = this.handleCancelDrawing.bind(this);
        this.disableRectangleTwoClickDrawing = this.disableRectangleTwoClickDrawing.bind(this);
        this.getZoomAndCenter = this.getZoomAndCenter.bind(this);
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

        leafletElement.on(
            PRECLICK,
            this.disableRectangleTwoClickDrawing,
        );

        this.rectangleDrawHandler = new L.Draw.Rectangle(leafletElement, {
            shapeOptions: areaOfInterestStyle,
        });

        this.rectangleDrawHandler._initialLabelText = // eslint-disable-line no-underscore-dangle
            'Click and hold the mouse button down then drag to draw a rectangle.';

        this.polygonDrawHandler = new L.Draw.Polygon(leafletElement, {
            shapeOptions: areaOfInterestStyle,
        });
    }

    componentDidUpdate({
        drawingActive: drawingWasActive,
        geocoderSelection: previousGeocoderSelection,
        selectedCoordinates: previouslySelectedCoordinates,
    }) {
        const {
            drawTool,
            drawingActive,
            geocoderSelection,
            selectedCoordinates,
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

        const zoomToBounds = geocoderSelection ?
            () => this.leafletMap.leafletElement.fitBounds(geocoderSelection.bounds) :
            null;

        const zoomToPoint = selectedCoordinates ?
            () => this.leafletMap.leafletElement.setView(selectedCoordinates) :
            null;

        if (!geocoderSelection && !selectedCoordinates) {
            return null;
        } else if (geocoderSelection && !previousGeocoderSelection) {
            return zoomToBounds();
        } else if (geocoderSelection && previousGeocoderSelection &&
            (geocoderSelection.text !== previousGeocoderSelection.text)) {
            return zoomToBounds();
        } else if (selectedCoordinates && !previouslySelectedCoordinates) {
            return zoomToPoint();
        } else if (selectedCoordinates &&
            (selectedCoordinates.toString() !== previouslySelectedCoordinates.toString())) {
            return zoomToPoint();
        }

        return null;
    }

    getZoomAndCenter() {
        const map = this.leafletMap.leafletElement;
        return {
            zoom: map.getZoom(),
            center: map.getCenter(),
        };
    }

    disableRectangleTwoClickDrawing() {
        /* eslint-disable no-underscore-dangle */
        if (!this.rectangleDrawHandler._enabled ||
            !this.rectangleDrawHandler._isCurrentlyTwoClickDrawing) {
            return null;
        }
        /* eslint-enable no-underscore-dangle */

        this.rectangleDrawHandler.disable();

        return this.handleCancelDrawing();
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
            geocoderCoordinatesLat,
            geocoderCoordinatesLng,
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
                    lat={geocoderCoordinatesLat}
                    lng={geocoderCoordinatesLng}
                    dispatch={dispatch}
                />
                <SponsoredByControl position={controlPositionsEnum.bottomright} />
                <SomethingWrongControl
                    position={controlPositionsEnum.bottomleft}
                    getZoomAndCenter={this.getZoomAndCenter}
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
    selectedCoordinates: null,
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
    selectedCoordinates: object, // eslint-disable-line react/forbid-prop-types
    geocoderCoordinatesLat: oneOfType([number, string]).isRequired,
    geocoderCoordinatesLng: oneOfType([number, string]).isRequired,
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
            coordinates,
        },
        search: {
            activeInput,
            searchValue,
            coordinates: {
                lat,
                lng,
            },
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
        selectedCoordinates: coordinates,
        geocoderCoordinatesLat: lat,
        geocoderCoordinatesLng: lng,
    };
}

export default connect(mapStateToProps)(OSMExtractionMap);
