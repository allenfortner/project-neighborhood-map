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
		selectedLocations: [],
		query: '',
		listOpen: false
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
			
			//After filtering out each matching location, set the selected locations list to the new filtered list
			this.setState({selectedLocations: newList});
		}
	}
	
	listToggle = () => {
		//Open/close the list view
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
				<MapContainer 
					lat={this.state.lat} 
					lng={this.state.lng} 
					zoom={this.state.zoom} 
					locations={this.state.selectedLocations}
				/>
				<List 
					listOpen={this.state.listOpen} 
					locations={this.state.selectedLocations}  
					query={this.state.query} 
					updateQuery={this.updateQuery} 
					listToggle={this.listToggle}
				/>
			</div>
		);
	}
}

export default App;
