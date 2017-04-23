import React from 'react';
import SEARCHITEM from './searchitem.js';
import  {getUserData, getSearch} from '../server';

export default class SEARCHRESULTS extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
			itemListr: [],
      row1: new Array(3),
			row2: new Array(3),
			searchArray: new Array(2)
    };
  }

	componentDidMount() {
		window.scrollTo(0, 0);
		var callbackFunction2 = (itemList) => {
			var tempArray = new Array(2);
			tempArray[0] = itemList["searchGory"];
			tempArray[1] = itemList["searchTerm"];
			this.setState({searchArray: tempArray});
			//console.log(this.state.searchArray);
		};
		getUserData(this.props.user,callbackFunction2);

		var callbackFunction = (itemList) => {
      this.setState({itemListr: itemList});
			//console.log(itemList);
      var tempSlide1 = new Array(3);
      for (var i = 0; i < 3; i++) {
        tempSlide1[i] = itemList[i];
			}
			this.setState({row1: tempSlide1})

			var tempSlide2 = new Array(3);
			for (var i = 3; i < 6; i++) {
				tempSlide2[i] = itemList[i];
			}
			this.setState({row2: tempSlide2})
		};
		getSearch(this.props.category, this.props.searchTerm,callbackFunction);
	}

	render(){
		return(
			<div>
				<h1 className="page-header">Search Result
					<small className="query">"{this.props.searchTerm}" in Category "{this.props.category}"</small>
				</h1>
				<div className="row">
					{this.state.row1.map((item) => {
						return (
							<SEARCHITEM key = {item} id={item[0]} des={item[3]} src={item[7]} price = {item[2]}/>
						)
					})}
				</div>
				<hr/>
				<div className="row">
					{this.state.row2.map((item) => {
						return (
							<SEARCHITEM key = {item} id={item[0]} des={item[3]} src={item[7]} price = {item[2]}/>
						)
					})}
        </div>
        <hr/>
			</div>
		)
 }
}