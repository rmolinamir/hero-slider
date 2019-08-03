// Libraries
import styled from 'styled-components';

export const Button = styled.button`
  & {
    z-index: 3;
    position: absolute;
    color: inherit;
    /* Placeholders */
    width: 62px;
    height: 62px;
    /* Disabling default button CSS. */
    padding: 0;
    margin: 0;
    outline: none;
    background: transparent;
    border: 0;
  }

  & svg path {
    transition: d 200ms;
  }
`;
