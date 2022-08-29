import React from 'react';
import { IButtonProps } from './typings';
import { SliderContext } from '../Context';
import ButtonsModuleCss from './Buttons.module.css';

const ButtonSVG = () => (
  <svg
    width="60px"
    height="60px"
    strokeWidth="5"
    version="1.1"
    viewBox="0 0 129 129"
  >
    <g fill="currentColor">
      <path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z" />
    </g>
  </svg>
);

const Buttons = (props: IButtonProps) => {
  const { isMobile } = React.useContext(SliderContext);

  if (isMobile) return null;

  return (
    <>
      <div
        className={[
          ButtonsModuleCss.Wrapper,
          ButtonsModuleCss.Previous,
          props.isHorizontal
            ? ButtonsModuleCss.Horizontal
            : ButtonsModuleCss.Vertical
        ].join(' ')}
      >
        <div className={ButtonsModuleCss.Container}>
          <button
            onClick={props.previousSlide}
            className={ButtonsModuleCss.Button}
          >
            <ButtonSVG />
          </button>
        </div>
      </div>
      <div
        className={[
          ButtonsModuleCss.Wrapper,
          ButtonsModuleCss.Next,
          props.isHorizontal
            ? ButtonsModuleCss.Horizontal
            : ButtonsModuleCss.Vertical
        ].join(' ')}
      >
        <div className={ButtonsModuleCss.Container}>
          <button onClick={props.nextSlide} className={ButtonsModuleCss.Button}>
            <ButtonSVG />
          </button>
        </div>
      </div>
    </>
  );
};

export default Buttons;
