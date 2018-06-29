import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  country,
  sortCountry,
  searchCountry,
} from 'actions';

import AppWrapper from 'components/AppWrapper';
import Search from 'components/Search';
import Table from 'components/Table';
import Loader from 'components/Loader';


class App extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(country.request());
  }

  handleSearch(query) {
    const { dispatch } = this.props;
    dispatch(searchCountry(query));
  }

  handleSort(sort) {
    const { dispatch } = this.props;
    dispatch(sortCountry(sort));
  }

  render() {
    const {
      country: {
        data,
        isFetching,
      },
    } = this.props;

    return (
      <AppWrapper>
        <Search onSearch={this.handleSearch} />
        {
          isFetching
            ? <Loader />
            : <Table onSort={this.handleSort} data={data} />
        }
      </AppWrapper>
    );
  }
}

export default connect((state) => (
  {
    country: state.country,
  }
))(App);
