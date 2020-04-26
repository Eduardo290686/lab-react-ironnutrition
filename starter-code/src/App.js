import React, { Component } from 'react';
import './App.css';
import FoodBox from './FoodBox';
import Form from './Form';
import SearchBar from './SearchBar';
import TodaysFoodBox from './TodaysFoodBox';
import foods from './foods.json';

class App extends Component {

  constructor(props) {
    super(props);
    this.foodsArr = [...foods];
    for (let i = 0; i < this.foodsArr.length; i++) {
      this.foodsArr[i] = {
        name: this.foodsArr[i].name,
        calories: this.foodsArr[i].calories,
        image: this.foodsArr[i].image,
        quantity: this.foodsArr[i].quantity,
        key: i
      }
    }
    this.state = {
      currentFoods: this.foodsArr,
      shownFoods: this.foodsArr,
      showForm: false,
      showBar: false,
      keyToAssign: this.foodsArr.length,
      todaysFoods: []
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
    newFood.key = this.state.keyToAssign;
    let newFoodList = this.state.currentFoods;
    newFoodList.push(newFood);
    this.setState({
      ...this.state,
      currentFoods: newFoodList,
      shownFoods: newFoodList,
      keyToAssign: this.state.keyToAssign + 1
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

  deleteFood = (foodKey) => {
    let newCurrentFoods = [];
    let newShownFoods = [];
    newCurrentFoods = this.state.currentFoods.filter((food) => {
      return food.key !== foodKey;
    })
    newShownFoods = this.state.shownFoods.filter((food) => {
      return food.key !== foodKey;
    })
    this.setState({
      ...this.state,
      currentFoods: newCurrentFoods,
      shownFoods: newShownFoods
    })
  }

  render() {
    return (
      <div className="main-container">
        <h1 className="main-title">Welcome to IronNutrition</h1>
        <div className="inputs-container">
          <div className="button-input-container">
            <button onClick={this.showBar}>Search food</button>
            {
              this.state.showBar
                ?
                <SearchBar handleSearch={this.handleSearch} hideBar={this.hideBar}></SearchBar>
                :
                null
            }
          </div>
          <div className="button-input-container">
            <button onClick={this.showForm}>Add new food</button>
            {
              this.state.showForm
                ?
                <Form handleInformation={this.handleInformation} hideForm={this.hideForm} />
                :
                null
            }
          </div>
        </div>
        <div className='foods-info-container'>
          <div>
            {
              this.state.shownFoods.map((food) => {
                return (
                  <FoodBox
                    name={food.name}
                    calories={food.calories}
                    image={food.image}
                    key={food.key}
                    id={food.key}
                    deleteFood={this.deleteFood}
                  >
                  </FoodBox>
                )
              })
            }
          </div>
          <div>
            {
              this.state.todaysFoods.length !== 0
                ?
                <TodaysFoodBox></TodaysFoodBox>
                :
                null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
