import React, { Component } from 'react';
import MapContainer from './components/MapContainer';
import './App.css';

class App extends Component {
	state = {
		lat: 33.505952,
		lng: -84.235346,
		zoom: 17
	}
	
	render() {
		return (
			<div className="App">
				<MapContainer lat={this.state.lat} lng={this.state.lng} zoom={this.state.zoom}/>
			</div>
		);
	}
}

export default App;
