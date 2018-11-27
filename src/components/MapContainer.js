import React, { Component } from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const API_Key = "AIzaSyCp9ZkXaTEwkTIOcrsu398dZtf1CGzeCbA";

class MapContainer extends Component {
	state = {}
	
	render() {
		const center = {lat: this.props.lat, lng: this.props.lng};
		
		return (
			<Map 
				google={this.props.google} 
				initialCenter={center} 
				zoom={this.props.zoom}
			/>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: (API_Key)
})(MapContainer);