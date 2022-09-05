import React from 'react';
import MaskModuleCss from './index.module.css';
import { BackgroundProps } from '../Background';
import { useController } from '../../../modules/Controller';

export interface MaskProps {
  background?: Partial<BackgroundProps>;
  isActive?: boolean;
}

export default function Mask({ background, isActive }: MaskProps) {
  const {
    state: { isSliding }
  } = useController();

  const [className, setClassName] = React.useState(MaskModuleCss.Loading);

  const onLoadHandler = () => {
    setClassName(MaskModuleCss.Loaded);
  };

  const style: React.CSSProperties = {
    backgroundColor: background?.backgroundColor,
    backgroundBlendMode: background?.maskBackgroundBlendMode,
    backgroundImage: `url('${background?.backgroundImage}')`
  };

  const isLoaded = className === MaskModuleCss.Loaded;

  return (
    <div
      className={[
        MaskModuleCss.Mask,
        isActive && !isSliding ? MaskModuleCss.Active : MaskModuleCss.Inactive
      ].join(' ')}
    >
      <img
        alt={background?.alt || ''}
        className={MaskModuleCss.Loader}
        onLoad={onLoadHandler}
        src={background?.backgroundImage}
        loading={background?.shouldLazyLoad ? 'lazy' : 'eager'}
      />
      {isLoaded && (
        <div
          style={style}
          className={[
            className,
            isLoaded && MaskModuleCss.Inner,
            isLoaded && isSliding && MaskModuleCss.Sliding
          ].join(' ')}
        />
      )}
    </div>
  );
}
