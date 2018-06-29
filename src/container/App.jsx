import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  country,
} from 'actions';


import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    const {
      dispatch,
    } = props;

    dispatch(country.request());
  }

  render() {
    return (
      <div className="App">
          Test11
      </div>
    );
  }
}

export default connect((state) => (
  {
    country: state.country,
  }
))(App);
