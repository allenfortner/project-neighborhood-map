import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const API_Key = "AIzaSyCp9ZkXaTEwkTIOcrsu398dZtf1CGzeCbA";

class MapContainer extends Component {
	addMapHandler = mapProps => {
		this.props.addMap(mapProps);
	};

	render() {
		const center = {lat: this.props.lat, lng: this.props.lng};

		return (
			<Map
				onReady={this.addMapHandler}
				google={this.props.google}
				initialCenter={center}
				zoom={this.props.zoom}
				onClick={this.props.closeInfoWindow}>
				{this.props.locations.map((loc, index) => {
					console.log(loc);
					return (
						<Marker
							key={index}
							ref={this.props.addMarker}
							name={loc.name}
							address={loc.address}
							city={loc.city}
							state={loc.state}
							zipcode={loc.zipcode}
							position={loc.coordinates}
							onClick={this.props.openInfoWindow}
							animation={2}
						/>
					);
				})}
				<InfoWindow
					marker={this.props.activeMarker ? this.props.activeMarker : null}
					position={this.props.coordinates ? {lat: parseFloat(this.props.coordinates.lat + 0.0004), lng: parseFloat(this.props.coordinates.lng)} : null}
					visible={this.props.showingInfoWindow}>
					<div className="infowindow-content">
						<h2 className="infowindow-title">
							{this.props.selectedPlace.name}
						</h2>
						<p className="infowindow-address">
							Address: {this.props.selectedPlace.address},{" "}
							{this.props.selectedPlace.city}, {this.props.selectedPlace.state}{" "}
							{this.props.selectedPlace.zipcode}
						</p>
					</div>
				</InfoWindow>
			</Map>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: (API_Key)
})(MapContainer);