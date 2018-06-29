import React from 'react';
import styled, { keyframes } from 'styled-components';


const stretch = keyframes`
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
  }

  20% {
    transform: scaleY(1);
  }
`;

export default () => {
  const duration = 1.2;
  const Spinner = styled.div`
    margin: 100px auto;
    width: 50px;
    text-align: 10px;
    height: 50px;
  `;

  const DefaultRect = styled.div`
    background-color: #BADA55;
    height: 100%;
    width: 6px;
    display: inline-block;
    animation: ${stretch} 1.2s infinite ease-in-out;
    animation-duration: ${duration}s;
  `;

  const Rect2 = DefaultRect.extend`
    animation-delay: -${duration - 0.1}s;
  `;

  const Rect3 = DefaultRect.extend`
    animation-delay: -${duration - 0.2}s;
  `;

  const Rect4 = DefaultRect.extend`
    animation-delay: -${duration - 0.3}s;
  `;

  const Rect5 = DefaultRect.extend`
    animation-delay: -${duration - 0.4}s;
  `;

  return (
    <Spinner>
      <DefaultRect />
      <Rect2 />
      <Rect3 />
      <Rect4 />
      <Rect5 />
    </Spinner>
  );
};
