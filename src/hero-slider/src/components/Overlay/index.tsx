import React from 'react';
import OverlayModuleCss from './index.module.css';

export function Overlay(props: React.PropsWithChildren) {
  return <div className={OverlayModuleCss.Container}>{props.children}</div>;
}

(Overlay as React.FunctionComponent).displayName = 'hero-slider/overlay';
