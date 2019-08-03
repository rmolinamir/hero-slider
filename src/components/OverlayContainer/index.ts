// Libraries
import styled from 'styled-components';

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;

  * {
    pointer-events: auto;
  }
`;
