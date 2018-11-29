import React, { Component } from 'react';

class List extends Component {
	state = {}
	
	render() {
		//Styles for the whole list
		const listStyles = {
			width: "250px",
			height: "100%",
			position: "absolute",
			borderStyle: "groove",
			borderWidth: "2px",
			listStyleType: "none",
			backgroundColor: "white"
		};

		//Styles for the close button
		const closeBtnStyles = {
			backgroundColor: "#D3D3D3",
			color: "black",
			fontWeight: "bold",
			borderStyle: "outset",
			float: "right",
			marginRight: "10px",
			marginTop: "10px"
		};

		//Styles for the input box
		const inputStyles = {
			float: "left",
			margin: "10px",
			width: "90%"
		};

		//Styles for each item in the list
		const listItemStyles = {
			color: "black",
			textAlign: "left",
			paddingLeft: "10px"
		};

		//Styles for the buttons inside the list items
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
		};

		let open = this.props.listOpen;

		//if the listOpen has been toggled on by clicking the list button, display the list
		if (open === true) {
			return (
				<div className="List" style={listStyles}>
					<button style={closeBtnStyles} onClick={this.props.listToggle}>
						Close &times;
					</button>
					<input
						type="text"
						placeholder=""
						style={inputStyles}
						value={this.props.query}
						onChange={e => this.props.updateQuery(e.target.value)}
					/>
					{this.props.locations.map((loc, index) => {
						return (
							<li
								className="listItem"
								key={index}
								style={listItemStyles}
								onClick={() => this.props.openInfoWindow(loc)}>
								<button style={listLinkStyles}>{loc.name}</button>
							</li>
						);
					})}
				</div>
			);
		} else {
			//otherwise, display nothing
			return (
				<div className="List" />
			);
		}
	}
}

export default List;
