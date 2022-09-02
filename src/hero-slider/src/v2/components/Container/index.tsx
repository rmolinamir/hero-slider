import React from 'react';
import ContainerModuleCss from './Container.module.css';

export const Container = (props: React.PropsWithChildren) => {
  return <div className={ContainerModuleCss.Container}>{props.children}</div>;
};

(Container as React.FunctionComponent).displayName = 'hero-slider/container';
