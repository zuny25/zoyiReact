import React from 'react';
import styled from 'styled-components';

const AppWrapper = styled.div`
  width: 400px;
  margin: 30px auto;
`;

export default ({ children }) => (
  <AppWrapper>
    {children}
  </AppWrapper>
);
