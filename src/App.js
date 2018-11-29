import React, { Component } from 'react';
import MapContainer from './components/MapContainer';
import List from './components/List.js';
import axios from 'axios';
import './App.css';

class App extends Component {
	state = {
		lat: 33.505952,
		lng: -84.235346,
		zoom: 17,
		allLocations: [],
		selectedLocations: [],
		query: '',
		listOpen: false,
		activeMarker: {},
		selectedPlace: {},
		showingInfoWindow: false,
		markers: [],
		map: null,
		coordinates: {}
	};
	
	componentWillMount = () => {
		axios.get("https://api.myjson.com/bins/1dmeu2").then(results => {
			console.log(results);
			if (results.status === 200) {
				this.setState({
					allLocations: results.data,
					selectedLocations: results.data
				});
			} else {
				alert (
					"Problem fetching location data from MyJSON. Please reload the page and try again!"
				);
			}
		});
	}

	componentDidMount = () => {
		//When the component is mounted, reset the selected locations filter
		this.resetFilter();
	}

	resetFilter = () => {
		//Reset the selected locations to display all locations
		this.setState({selectedLocations: this.state.allLocations});
	}

	updateQuery = (newQuery) => {
		//When the user types in the search field, update the query state
		this.setState({query: newQuery});
		//Then filter for the new query
		this.filterLocations(newQuery);
	}

	filterLocations = (query) => {
		if (query === "") {
			//If the search query is blank, show all locations
			this.resetFilter();
			this.closeInfoWindow();
		} else {
			//Filter out the search query from the list of all locations
			let newList = (this.state.allLocations.filter(location => {
				//Convert each location's name to lowercase (to avoid case sensitivity)
				let locName = location.name.toLowerCase();
				//then return each location that matches the query
				return(locName.includes(query.trim().toLowerCase()));
			}))
			//console.log(query.trim().toLowerCase());
			//console.log(newList);
			
			//After filtering out each matching location, set the selected locations list to the new filtered list, and close the current info window
			this.setState({selectedLocations: newList});
			this.closeInfoWindow();
		}
	}

	listToggle = () => {
		//Open/close the list view
		this.setState({listOpen: !this.state.listOpen});
	};

	openInfoWindow = (props, marker) => {
		if (marker !== undefined) {
			this.setState({
				selectedPlace: props,
				activeMarker: marker,
				showingInfoWindow: true,
				coordinates: {}
			});
		} else {
			const { markers } = this.state;
			markers.forEach(possibleMarker => {
				if (props.name === possibleMarker.name) {
					this.setState({
						selectedPlace: props,
						activeMarker: possibleMarker,
						showingInfoWindow: true,
						coordinates: props.coordinates
					});
				}
			});
		}
	};

	closeInfoWindow = () => {
		//When the map itself is clicked, close current info window and clear the selected place
		this.setState({
			selectedPlace: {},
			activeMarker: {},
			showingInfoWindow: false,
			coordinates: {}
		});
	};

	addMarker = elem => {
		if (elem === null) {
			return;
		}
		this.setState(
			prevState => ({ markers: [...prevState.markers, elem.marker]}),
			() => console.log(this.state.markers)
		);
	};

	addMap = props => {
		this.setState(
			{ map: props },
			() => console.log(this.state.map)
		);
	};

	render() {
		const listBtnStyles = {
			background: "white",
			position: "absolute",
			left: "10px",
			top: "10px",
			marginLeft: "10px",
			marginRight: "20px",
			padding: "15px"
		};

		return (
			<div className="App">
				<header>
					<button style={listBtnStyles} onClick={this.listToggle}>
						<i className="fa fa-bars fa-2x" />
					</button>
					<h1>Hudson Bridge Rd</h1>
				</header>
				<MapContainer
					lat={this.state.lat}
					lng={this.state.lng}
					zoom={this.state.zoom}
					locations={this.state.selectedLocations}
					activeMarker={this.state.activeMarker}
					selectedPlace={this.state.selectedPlace}
					showingInfoWindow={this.state.showingInfoWindow}
					addMarker={this.addMarker}
					openInfoWindow={this.openInfoWindow}
					closeInfoWindow={this.closeInfoWindow}
					addMap={this.addMap}
					coordinates={this.state.coordinates}
				/>
				<List
					listOpen={this.state.listOpen}
					locations={this.state.selectedLocations}
					query={this.state.query}
					updateQuery={this.updateQuery}
					listToggle={this.listToggle}
					openInfoWindow={this.openInfoWindow}
				/>
			</div>
		);
	}
}

export default App;
