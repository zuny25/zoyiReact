import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  border: 1px solid #eee;
  height: 20px;
  padding: 0 5px;
  margin: 0;
`;
const InputWrapper = styled.div`
  margin-bottom: 10px;
`;
const SearchBtn = styled.button`
  outline: none;
  padding: 3px;
  height: 22px;
  margin: 0;
  background-color: #4CAF50;
  color: #fff;
  border: none;

  &:active {
    background-color: #3e8e41;
    color: #fff;
  }
`;
const Description = styled.div`
  color: #666;
  font-size: 12px;
  padding: 10px 10px 0 10px;
  font-weight: bold;
`;
const DescSpan = styled.span`
  display: inline-block;
  margin-right: 5px;
  font-weight: normal;
`;


export default class Search extends React.Component {
  constructor(props) {
    super(props);
    const initialState = {
      query: props.query,
    };

    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.searchCountry = this.searchCountry.bind(this);
  }

  handleChange(event) {
    const query = event.target.value;
    this.setState({ query });
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.searchCountry();
    }
  }

  searchCountry() {
    const { query } = this.state;
    const { onSearch } = this.props;
    onSearch(query);
  }

  render() {
    const {
      query,
    } = this.state;

    const oldQuery = this.props.query;

    return (
      <InputWrapper>
        <Input
          type="text"
          value={query}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <SearchBtn onClick={this.searchCountry}>
          Search
        </SearchBtn>
        {
          oldQuery !== ''
            ? (
              <Description>
                <DescSpan>
                  Searching :
                </DescSpan>
                {`${oldQuery}`}
              </Description>
            )
            : null
        }
      </InputWrapper>
    );
  }
}
