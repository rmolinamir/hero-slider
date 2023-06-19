import React from 'react';

import { composeCssClasses } from '../../utils/composeCssClasses';
import OverlayModuleCss from './index.module.css';

interface OverlayProps {
  /**
   * Slider className.
   */
  className?: React.HTMLProps<HTMLDivElement>['className'];
}

export function Overlay(props: React.PropsWithChildren<OverlayProps>) {
  return (
    <div
      data-testid="hero-slider-overlay"
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
