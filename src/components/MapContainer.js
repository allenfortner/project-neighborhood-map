import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const API_Key = "AIzaSyCp9ZkXaTEwkTIOcrsu398dZtf1CGzeCbA";

class MapContainer extends Component {
	state = {
		activeMarker: {},
		selectedPlace: {},
		showingInfoWindow: false
	}
	
	openInfoWindow = (props, marker, e) => {
		console.log(props);
		console.log(marker);
		console.log(e);
		//When a marker is clicked, open an info window for the selected place
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true
		})
	}
	
	closeInfoWindow = () => {
		//When the map itself is clicked, close current info window and clear the selected place
		this.setState({
			selectedPlace: {},
			activeMarker: {},
			showingInfoWindow: false
		})
	}
	
	render() {
		const center = {lat: this.props.lat, lng: this.props.lng};
		
		return (
			<Map 
				google={this.props.google} 
				initialCenter={center} 
				zoom={this.props.zoom}
				onClick={this.closeInfoWindow}>
					{this.props.allLocations.map((loc, index) => {
						return (
							<Marker
								key={index}
								name={loc.name}
								address={loc.address}
								city={loc.city}
								state={loc.state}
								zipcode={loc.zipcode}
								position={loc.coordinates}
								onClick={this.openInfoWindow}
							/>
						);
					})}
				<InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
					<div className="infowindow-content">
						<h2 className="infowindow-title">{this.state.selectedPlace.name}</h2>
						<p className="infowindow-address">Address: {this.state.selectedPlace.address}, {this.state.selectedPlace.city}, {this.state.selectedPlace.state} {this.state.selectedPlace.zipcode}
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