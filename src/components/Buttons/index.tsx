/* tslint:disable max-line-length */
// Libraries
import * as React from 'react';

// Dependencies
import { IButtonProps } from './typings';
import { SliderContext } from '../Context';

// Components
import { Wrapper } from './styled-components';

const { useContext, memo } = React;

const ButtonSVG = () => (
  <svg
    width="60px"
    height="60px"
    strokeWidth="5"
    version="1.1"
    viewBox="0 0 129 129">
    <g fill="currentColor">
      <path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z" />
    </g>
  </svg>
);

const Buttons = (props: IButtonProps) => {
  const { isMobile } = useContext(SliderContext);

  if (isMobile) return null;

  return (
    <>
      <Wrapper className={[
        'slide-button-previous',
        props.isHorizontal ? 'slide-button-horizontal' : 'slide-button-vertical',
      ].join(' ')}>
        <div className="slide-button-container">
          <button
            onClick={props.previousSlide}
            className="slide-button-button-svg">
              <ButtonSVG />
            </button>
        </div>
      </Wrapper>
      <Wrapper className={[
        'slide-button-next',
        props.isHorizontal ? 'slide-button-horizontal' : 'slide-button-vertical',
      ].join(' ')}>
        <div className="slide-button-container">
          <button
            onClick={props.nextSlide}
            className="slide-button-button-svg">
              <ButtonSVG />
            </button>
        </div>
      </Wrapper>
    </>
  );
};

export default memo(Buttons);
