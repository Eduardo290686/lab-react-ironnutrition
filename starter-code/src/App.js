import React, { Component } from 'react';
import './App.css';
import FoodBox from './FoodBox';
import Form from './Form';
import foods from './foods.json';

class App extends Component {

  constructor() {
    super();
    this.foodsArr = [...foods];
    this.state = {
      currentFoods: this.foodsArr
    };
  }

  render() {
    return (
      <div className="App">
        <Form></Form>
        {
          this.state.currentFoods.map((food) => {
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
