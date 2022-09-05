// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import ButtonsModuleCss from './index.module.css';
import { useManager } from '../../modules/Manager';
import {
  AccessabilityOrientation,
  useAccessability
} from '../../modules/Accessability';
import { useController } from '../../modules/Controller';

function ArrowSvg() {
  return (
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
}

export default function Buttons() {
  const {
    state: { isMobile }
  } = useManager();

  const { orientation } = useAccessability();

  const { goToPreviousSlide, goToNextSlide } = useController();

  if (isMobile) return null;

  const isHorizontal = orientation === AccessabilityOrientation.HORIZONTAL;

  return (
    <>
      {/* Previous */}
      <div
        className={[
          ButtonsModuleCss.Wrapper,
          ButtonsModuleCss.Previous,
          isHorizontal ? ButtonsModuleCss.Horizontal : ButtonsModuleCss.Vertical
        ].join(' ')}
      >
        <div className={ButtonsModuleCss.Container}>
          <button
            onClick={goToPreviousSlide}
            className={ButtonsModuleCss.Button}
          >
            <ArrowSvg />
          </button>
        </div>
      </div>
      {/* Next */}
      <div
        className={[
          ButtonsModuleCss.Wrapper,
          ButtonsModuleCss.Next,
          isHorizontal ? ButtonsModuleCss.Horizontal : ButtonsModuleCss.Vertical
        ].join(' ')}
      >
        <div className={ButtonsModuleCss.Container}>
          <button onClick={goToNextSlide} className={ButtonsModuleCss.Button}>
            <ArrowSvg />
          </button>
        </div>
      </div>
    </>
  );
}
