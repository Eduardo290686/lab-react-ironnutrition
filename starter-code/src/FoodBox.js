import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import './FoodBox.css';

class FoodBox extends Component {

  deleteFood = (event)=> {
    event.preventDefault();
    this.props.deleteFood(this.props.id);
  }

  render() {
    return (
      <div className="box foodbox">
        <article className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={this.props.image} alt={this.props.image} />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{this.props.name}</strong> <br />
                <small>{this.props.calories} kcal</small>
              </p>
            </div>
          </div>
          <div className="media-right">
            <div className="field has-addons">
              <div className="control">
                <input
                  className="input foodbox-input"
                  type="number"
                //value="1"
                />
              </div>
              <div className="control">
                <button className="button is-info blue-button">
                  +
                </button>
              </div>
              <div className="control">
                <button className="button is-danger delete-button" onClick={this.deleteFood}>
                  DEL
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default FoodBox;
