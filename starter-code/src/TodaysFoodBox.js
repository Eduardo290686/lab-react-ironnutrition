import React, { Component } from 'react';
import './TodaysFoodBox.css';

class TodaysFoodBox extends Component {

  render() {
    return (
      <div className="today-container">
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
                  <strong>{this.props.name}</strong><br />
                  <small>{this.props.calories} kcal</small><br />
                  <small>{this.props.quantity}</small>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }
}

export default TodaysFoodBox;
