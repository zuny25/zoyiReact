import React from 'react';
import styled from 'styled-components';

const AppWrapper = styled.div`
  width: 500px;
  margin: 30px auto;
`;

export default ({ children }) => (
  <AppWrapper>
    {children}
  </AppWrapper>
);
