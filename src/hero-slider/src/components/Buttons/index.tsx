// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import ButtonsModuleCss from './index.module.css';
import { useManager } from '../../modules/Manager';
import {
  AccessabilityOrientation,
  useAccessability
} from '../../modules/Accessability';
import { useController } from '../../modules/Controller';
import { composeCssClasses } from '../../utils/composeCssClasses';

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
        className={composeCssClasses(
          'hero-slider-previous',
          ButtonsModuleCss.Previous,
          ButtonsModuleCss.Wrapper,
          { className: ButtonsModuleCss.Horizontal, useIf: isHorizontal },
          { className: ButtonsModuleCss.Vertical, useIf: !isHorizontal }
        )}
      >
        <div
          className={composeCssClasses(
            'hero-slider-previous-container',
            ButtonsModuleCss.Container
          )}
        >
          <button
            className={composeCssClasses(
              'hero-slider-previous-button',
              ButtonsModuleCss.Button
            )}
            onClick={goToPreviousSlide}
          >
            <ArrowSvg />
          </button>
        </div>
      </div>
      {/* Next */}
      <div
        className={composeCssClasses(
          'hero-slider-next',
          ButtonsModuleCss.Next,
          ButtonsModuleCss.Wrapper,
          { className: ButtonsModuleCss.Horizontal, useIf: isHorizontal },
          { className: ButtonsModuleCss.Vertical, useIf: !isHorizontal }
        )}
      >
        <div
          className={composeCssClasses(
            'hero-slider-next-container',
            ButtonsModuleCss.Container
          )}
        >
          <button
            className={composeCssClasses(
              'hero-slider-next-button',
              ButtonsModuleCss.Button
            )}
            onClick={goToNextSlide}
          >
            <ArrowSvg />
          </button>
        </div>
      </div>
    </>
  );
}
