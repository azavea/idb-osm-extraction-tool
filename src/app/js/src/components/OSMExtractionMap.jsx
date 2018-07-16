import React, { Component } from 'react';
import { bool, func, oneOf } from 'prop-types';
import { connect } from 'react-redux';
import {
    Map as ReactLeafletMap,
    TileLayer,
    ZoomControl,
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

        this.rectangleDrawHandler = new L.Draw.Rectangle(leafletElement);
        this.polygonDrawHandler = new L.Draw.Polygon(leafletElement);
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
            </ReactLeafletMap>
        );
    }
}

OSMExtractionMap.defaultProps = {
    drawTool: null,
};

OSMExtractionMap.propTypes = {
    dispatch: func.isRequired,
    drawTool: oneOf(Object.values(drawToolTypeEnum)),
    drawingActive: bool.isRequired,
};

function mapStateToProps({
    ui: {
        drawing: {
            drawTool,
            active: drawingActive,
        },
    },
}) {
    return {
        drawTool,
        drawingActive,
    };
}

export default connect(mapStateToProps)(OSMExtractionMap);
