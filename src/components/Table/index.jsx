import React from 'react';
import styled from 'styled-components';

import SortableColumn from './SortableColumn';


const TableWrapper = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
`;
const Header = styled.div`
  border-bottom: 1px solid #ddd;
`;
const Rows = styled.div`
  border-bottom: 1px solid #eee;

  &:last-child {
    border: none;
  }
`;
const Cell = styled.div`
  display:inline-block;
  padding: 5px;
  width: ${props => {
    const { code } = props;
    return code === 'code' ? '80px' : '';
  }};
`;


export default (props) => {
  const {
    onSort,
    sort,
    data,
  } = props;

  if (!(data instanceof Array)) {
    return null;
  }

  return (
    <TableWrapper>
      <Header>
        <SortableColumn onSort={onSort} sort={sort} code="code">
          Code
        </SortableColumn>
        <SortableColumn onSort={onSort} sort={sort} code="name">
          Name
        </SortableColumn>
      </Header>
      {
      data.map(item => {
        const {
          code,
          name,
        } = item;
        return (
          <Rows key={code}>
            <Cell code="code">
              {code}
            </Cell>
            <Cell>
              {name}
            </Cell>
          </Rows>
        );
      })
    }
    </TableWrapper>
  );
};
