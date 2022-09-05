import React from 'react';
import { composeCssClasses } from '../../utils/composeCssClasses';
import OverlayModuleCss from './index.module.css';

export function Overlay(props: React.PropsWithChildren) {
  return (
    <div
      className={composeCssClasses(
        'hero-slider-overlay',
        OverlayModuleCss.Container
      )}
    >
      {props.children}
    </div>
  );
}

(Overlay as React.FunctionComponent).displayName = 'hero-slider/overlay';
