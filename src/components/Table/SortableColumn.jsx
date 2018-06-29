import React from 'react';
import styled from 'styled-components';


const SortableColumn = styled.div`
  display:inline-block;
  padding: 5px;
  width: ${props => {
    const { code } = props;
    return code === 'code' ? '80px' : '';
  }};
  cursor: pointer;
  font-weight: bold;
  text-decoration: underline;
`;

export default (props) => {
  const {
    sort,
    code,
    onSort,
    children,
  } = props;

  const isSort = sort.type === code;
  const isDesc = sort.desc;
  const sortIndicator = isDesc ? ' ⇩' : ' ⇧';

  return (
    <SortableColumn code={code} onClick={() => onSort(code)}>
      {children}
      {
        isSort
          ? `${sortIndicator}`
          : ''
      }
    </SortableColumn>
  );
};
