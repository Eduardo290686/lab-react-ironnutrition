import React, { Component } from 'react';

class TodaysFoodBox extends Component {

  render() {
    return (
      <div>
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
          </article>
        </div>
      </div>
    );
  }
}

export default TodaysFoodBox;
