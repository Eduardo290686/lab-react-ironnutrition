import React, { Component } from 'react';

class SearchBar extends Component {

  handleFoodName = (event) => {
    event.preventDefault();
    if (event.target.value !== '') {
      let foodName = event.target.value;
      let upperFoodName = foodName[0].toUpperCase() + foodName.slice(1);
      this.props.handleSearch(upperFoodName);
    } else {
      this.props.handleSearch(event.target.value);
    }
  }

  hideSearchBar = (event) => {
    event.preventDefault();
    this.props.hideBar();
  }

  render() {
    return (
      <div>
        <label>Search</label>
        <input onChange={this.handleFoodName}></input>
        <button onClick={this.hideSearchBar}>Hide search bar</button>
      </div>
    );
  }
}

export default SearchBar;
