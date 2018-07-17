import React, { Component } from 'react';
import { bool, func, object, oneOf } from 'prop-types';
import { connect } from 'react-redux';
import {
    Map as ReactLeafletMap,
    TileLayer,
    ZoomControl,
    GeoJSON,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';

import { completeDrawing } from '../actions.ui';

import {
    basemapTilesUrl,
    basemapAttribution,
    basemapMaxZoom,
    initialMapCenter,
    initialMapZoom,
    drawToolTypeEnum,
    areaOfInterestStyle,
} from '../constants';


class OSMExtractionMap extends Component {
    constructor(props) {
        super(props);
        this.handleDrawAreaOfInterest = this.handleDrawAreaOfInterest.bind(this);
    }

    componentDidMount() {
        const {
            leafletMap: {
                leafletElement,
            },
        } = this;

        leafletElement.on(
            L.Draw.Event.DRAWSTART,
            () => { window.console.log('started drawing!'); },
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

    componentDidUpdate({ drawingActive: drawingWasActive }) {
        const {
            drawTool,
            drawingActive,
        } = this.props;

        if (drawingActive === drawingWasActive) {
            return null;
        }

        if (drawingActive) {
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

        return null;
    }

    handleDrawAreaOfInterest({ layer }) {
        return this.props.dispatch(completeDrawing(layer.toGeoJSON()));
    }

    render() {
        const {
            drawnShape,
        } = this.props;

        const areaOfInterest = drawnShape ? (
            <GeoJSON
                data={drawnShape}
                style={areaOfInterestStyle}
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
                <ZoomControl position="topright" />
                {areaOfInterest}
            </ReactLeafletMap>
        );
    }
}

OSMExtractionMap.defaultProps = {
    drawTool: null,
    drawnShape: null,
};

OSMExtractionMap.propTypes = {
    dispatch: func.isRequired,
    drawTool: oneOf(Object.values(drawToolTypeEnum)),
    drawnShape: object, // eslint-disable-line react/forbid-prop-types
    drawingActive: bool.isRequired,
};

function mapStateToProps({
    ui: {
        drawing: {
            drawTool,
            active: drawingActive,
            drawnShape,
        },
    },
}) {
    return {
        drawTool,
        drawingActive,
        drawnShape,
    };
}

export default connect(mapStateToProps)(OSMExtractionMap);
