// Libraries
import styled, { css } from 'styled-components';

const absolutelyPositioned = css`
  position: absolute;
  top: 0;
  left: 0;
`;

export const Img = styled.img`
  ${absolutelyPositioned};
  opacity: 0;
  z-index: -1;
`;
