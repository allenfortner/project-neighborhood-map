import React, { Component } from 'react';

class List extends Component {
	state = {}
	
	render() {
		const listStyles = {
			width: "250px",
			height: "100%",
			position: "absolute",
			borderStyle: "groove",
			borderWidth: "2px",
			listStyleType: "none",
			backgroundColor: "white"
		}
		
		const listItemStyles = {
			color: "black",
			textAlign: "left",
			paddingLeft: "10px"
		}
		
		const listLinkStyles = {
			width: "210px",
			fontSize: "15px",
			fontWeight: "bold",
			background: "transparent",
			border: "none",
			textAlign: "left",
			paddingTop: "5px",
			paddingbottom: "5px",
			marginTop: "2px",
			marginBottom: "2px",
			cursor: "pointer"
		}
		
		let open = this.props.listOpen;
		
		//if the listOpen has been toggled on by clicking the list button, display the list
		if (open === true) {		
			return (
					<div className="List" style={listStyles}>
						{this.props.allLocations.map((loc, index) => {
							return (
								<li className="listItem" key={index} style={listItemStyles}>
									<button style={listLinkStyles}>{loc.name}</button>
								</li>
							);
						})}
					</div>
			);
		} else {
			//otherwise, display nothing
			return (
				<div className="List">
				</div>
			)
		}
	}
}

export default List;
