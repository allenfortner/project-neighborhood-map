import React, { Component } from 'react';
import MapContainer from './components/MapContainer';
import List from './components/List.js';
import locationData from './locationData.json';
import './App.css';

class App extends Component {
	state = {
		lat: 33.505952,
		lng: -84.235346,
		zoom: 17,
		allLocations: locationData,
		listOpen: false
	}
	
	listToggle = () => {
		this.setState({listOpen: !this.state.listOpen});
	}
	
	render() {
		
		const listBtnStyles = {
			background: "white",
			position: "absolute",
			left: "10px",
			top: "10px",
			marginLeft: "10px",
			marginRight: "20px",
			padding: "15px"
		}
		
		return (
			<div className="App">
				<header>
					<button style={listBtnStyles} onClick={this.listToggle}>
						<i className="fa fa-bars fa-2x"></i>
					</button>
					<h1>Hudson Bridge Rd</h1>
				</header>
				<MapContainer lat={this.state.lat} lng={this.state.lng} zoom={this.state.zoom} allLocations={this.state.allLocations}/>
				<List listOpen={this.state.listOpen} allLocations={this.state.allLocations} />
			</div>
		);
	}
}

export default App;
