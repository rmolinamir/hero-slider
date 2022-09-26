import React from 'react';
import MaskModuleCss from './index.module.css';
import { BackgroundProps } from '../Background';
import { useController } from '../../../modules/Controller';
import { composeCssClasses } from '../../../utils/composeCssClasses';

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
    backgroundImage: `url('${background?.backgroundImageSrc}')`
  };

  const isLoaded = className === MaskModuleCss.Loaded;

  return (
    <div
      className={composeCssClasses(
        'hero-slider-slide-mask',
        MaskModuleCss.Mask,
        { className: MaskModuleCss.Active, useIf: isActive && !isSliding },
        { className: MaskModuleCss.Inactive, useIf: !(isActive && !isSliding) }
      )}
    >
      <img
        alt={background?.backgroundImageAlt || ''}
        className={MaskModuleCss.Loader}
        onLoad={onLoadHandler}
        src={background?.backgroundImageSrc}
        loading={background?.shouldLazyLoad ? 'lazy' : 'eager'}
      />
      {isLoaded && (
        <div
          className={composeCssClasses(
            'hero-slider-slide-mask-inner',
            className,
            MaskModuleCss.Inner,
            { className: MaskModuleCss.Sliding, useIf: isSliding }
          )}
          style={style}
        />
      )}
    </div>
  );
}
