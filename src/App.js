import React, { Component } from 'react';
import MapContainer from './components/MapContainer';
import locationData from './locationData.json';
import './App.css';

class App extends Component {
	state = {
		lat: 33.505952,
		lng: -84.235346,
		zoom: 17,
		locations: locationData
	}
	
	render() {
		return (
			<div className="App">
				<MapContainer lat={this.state.lat} lng={this.state.lng} zoom={this.state.zoom} locations={this.state.locations}/>
			</div>
		);
	}
}

export default App;
