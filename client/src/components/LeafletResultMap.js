import React, { Component } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Marker,
} from "react-leaflet";

import "./LeafletResultMap.scss";

class LeafletResultMap extends Component {
  render() {
    const position = [
      this.props.latitude.toFixed(3),
      this.props.longitude.toFixed(3),
    ];

    const resultPosition = [
      this.props.resultLatitude.toFixed(3),
      this.props.resultLongitude.toFixed(3),
    ];

    return (
      <MapContainer
        className={this.props.class}
        center={position}
        zoom={this.props.zoom}
        zoomControl={true}
        doubleClickZoom={false}
        dragging={true}
        touchZoom={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CircleMarker
          center={position}
          color="#fff"
          fillOpacity={1}
          fillColor="#2196f3"
          weight={1.5}
          radius={6}
        />
        <CircleMarker
          center={position}
          fillOpacity={0.3}
          fillColor="#2196f3"
          weight={0}
          radius={10}
        >
          <Popup>
            Longitude: {this.props.longitude.toFixed(3)} <br />
            Latitude: {this.props.latitude.toFixed(3)}
          </Popup>
        </CircleMarker>

        <Marker position={resultPosition} />
      </MapContainer>
    );
  }
}

export default LeafletResultMap;
