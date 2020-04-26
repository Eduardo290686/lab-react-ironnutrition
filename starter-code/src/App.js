import React, { Component } from 'react';
import FoodBox from './FoodBox';
import Form from './Form';
import SearchBar from './SearchBar';
import TodaysFoodBox from './TodaysFoodBox';
import foods from './foods.json';
import './App.css';

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
      todaysFoods: [],
      totalCalories: 0
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

  addTodayFood = (food) => {
    let todaysFoodsList = this.state.todaysFoods;
    let foodIncluded = false;
    todaysFoodsList.map((eachFood) => {
      if (eachFood.name === food.name) {
        foodIncluded = true;
        food.calories = parseInt(food.quantity, 10) * parseInt(food.calories, 10);
        eachFood.calories = parseInt(eachFood.calories, 10) + parseInt(food.calories, 10)
        eachFood.quantity = parseInt(eachFood.quantity, 10) + parseInt(food.quantity, 10);
        this.setState({
          todaysFoods: todaysFoodsList
        })
        return this.calculateTotalCalories();      
      } else {
        return 0;
      }
    })
    if (foodIncluded === false) {
      let addedFoods = this.state.todaysFoods;
      food.calories = parseInt(food.quantity, 10) * parseInt(food.calories, 10);
      addedFoods.push(food);
      this.setState({
        todaysFoods: addedFoods
      })
      this.calculateTotalCalories();
    }
  }

  calculateTotalCalories = () => {
    let sumCalories = 0;
    this.state.todaysFoods.map((food) => {
      let calories = food.calories;
      return sumCalories += calories
    })
    this.setState({
      totalCalories: sumCalories
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
                    addTodayFood={this.addTodayFood}
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
                this.state.todaysFoods.map((todaysFood) => {
                  return (<TodaysFoodBox
                    name={todaysFood.name}
                    calories={todaysFood.calories}
                    image={todaysFood.image}
                    id={todaysFood.id}
                    key={todaysFood.id}
                    quantity={todaysFood.quantity}
                  />)
                })
                :
                null
            }
            <div>
              <p>Total calories:{this.state.totalCalories}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
