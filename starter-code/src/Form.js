import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import foods from './foods.json';

class Form extends Component {

  constructor(props) {
    super(props);
    this.foodsArrForAdding = [...foods];
    this.state = {
      name: '',
      calories: '',
      imageSrc: '',
      currentFoodsForAdding: this.foodsArrForAdding
    }
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  handleCaloriesChange = (event) => {
    this.setState({
      calories: event.target.value
    })
  }

  handleImageSrcChange = (event) => {
    this.setState({
      imageSrc: event.target.value
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    let newFood = {
      name: this.state.name,
      calories: this.state.calories,
      image: this.state.imageSrc,
      quantity: 0
    }
    this.foodsArrForAdding.push(newFood);
    this.setState({
      currentFoodsForAdding: this.foodsArrForAdding
    })
    console.log(this.state.currentFoodsForAdding);
  }

  render() {
    return (
      <div>

        <form onSubmit={this.handleFormSubmit}>

          <label>Name:</label>
          <input type="text" value={this.state.name} onChange={this.handleNameChange} />

          <label>Calories:</label>
          <input type="text" value={this.state.calories} onChange={this.handleCaloriesChange} />

          <label>Image SRC:</label>
          <input type="text" value={this.state.imageSrc} onChange={this.handleImageSrcChange} />

          <input type="submit" value="submit" />

        </form>

      </div>
    );
  }
}

export default Form;
