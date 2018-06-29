import React from 'react';

export default class Search extends React.Component {
  render() {
    const {
      onSearch,
    } = this.props;

    return (
      <div onClick={() => onSearch('b')}>
        Search
      </div>
    );
  }
}
