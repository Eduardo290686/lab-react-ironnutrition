import React, { Component } from 'react';
import 'bulma/css/bulma.css';

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      calories: '',
      imageSrc: '',
      quantity: 0,
      key: 0
    }
  }

  handleNameChange = (event) => {
    if (event.target.value !== '') {
      let word = event.target.value;
      this.setState({
        ...this.state,
        name: word
      })
    } else {
      this.setState({
        ...this.state,
        name: event.target.value
      })
    }
  }

  handleCaloriesChange = (event) => {
    this.setState({
      ...this.state,
      calories: event.target.value
    })
  }

  handleImageSrcChange = (event) => {
    this.setState({
      ...this.state,
      imageSrc: event.target.value
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    let newFood = {
      name: this.state.name,
      calories: this.state.calories,
      image: this.state.imageSrc,
    }
    this.props.handleInformation(newFood);
    this.setState({
      name: '',
      calories: '',
      imageSrc: '',
    })
  }

  hideForm = (event) => {
    this.props.hideForm();
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

          <input type="submit" value="Submit" />

          <button onClick={this.hideForm}>Hide form</button>

        </form>

      </div>
    );
  }
}

export default Form;
