import React, { Component } from 'react';
import './App.css';
import FoodBox from './FoodBox';
import Form from './Form';
import SearchBar from './SearchBar';
import foods from './foods.json';

class App extends Component {

  constructor(props) {
    super(props);
    this.foodsArr = [...foods];
    this.state = {
      currentFoods: this.foodsArr,
      shownFoods: this.foodsArr,
      showForm: false,
      showBar: false
    };
  }

  showForm = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      showForm: true
    })
  }

  hideForm = () => {
    this.setState({
      ...this.state,
      showForm: false
    })
  }

  showBar = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      showBar: true
    })
  }

  hideBar = () => {
    this.setState({
      ...this.state,
      showBar: false
    })
  }

  handleInformation = (newFood) => {
    newFood.name = newFood.name[0].toUpperCase() + newFood.name.slice(1);
    this.foodsArr.push(newFood);
    this.setState({
      ...this.state,
      currentFoods: this.foodsArr,
      shownFoods: this.foodsArr
    })
  }

  handleSearch = (info) => {
    if (info !== '') {
      let newFoodsArr = [];
      newFoodsArr = this.state.currentFoods.filter((food) => {
        return food.name.includes(info);
      })
      this.setState({
        ...this.state,
        shownFoods: newFoodsArr
      })
    } else {
      this.setState({
        ...this.state,
        shownFoods: this.state.currentFoods
      })
    }
  }

  render() {
    return (
      <div>
        <h1>Nutrition</h1>
        <button onClick={this.showBar}>Search food</button>
        {
          this.state.showBar
            ?
            <SearchBar handleSearch={this.handleSearch} hideBar={this.hideBar}></SearchBar>
            :
            null
        }
        <button onClick={this.showForm}>Add new food</button>
        {
          this.state.showForm
            ?
            <Form handleInformation={this.handleInformation} hideForm={this.hideForm} />
            :
            null
        }
        {
          this.state.shownFoods.map((food) => {
            return (
              <FoodBox
                name={food.name}
                calories={food.calories}
                image={food.image}
                key={food.name}
              >
              </FoodBox>
            )
          })
        }
      </div>
    );
  }
}

export default App;
