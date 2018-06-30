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
      data,
      isFetching,
      sort,
      query,
    } = this.props;

    return (
      <AppWrapper>
        {
          isFetching
            ? <Loader />
            : (
              <React.Fragment>
                <Search
                  onSearch={this.handleSearch}
                  query={query}
                />
                <Table
                  onSort={this.handleSort}
                  sort={sort}
                  data={data}
                />
              </React.Fragment>
            )
        }
      </AppWrapper>
    );
  }
}

export default connect((state) => {
  const {
    data,
    sort,
    query,
  } = state.country;

  const filteredData = query !== '' ? [...data].filter(
    (item) => item.code.toLowerCase().includes(query.toLowerCase())
      || item.name.toLowerCase().includes(query.toLowerCase()),
  )
    : [...data];

  const orderedData = sort.type !== '' ? filteredData.sort((a, b) => {
    const aField = a[sort.type];
    const bField = b[sort.type];
    const sortValue = aField < bField ? -1 : aField > bField ? 1 : 0;
    return sort.desc ? sortValue * -1 : sortValue;
  })
    : filteredData;

  return {
    ...state.country,
    data: orderedData,
  };
})(App);
