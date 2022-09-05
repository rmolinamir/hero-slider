import React from 'react';
import type CSS from 'csstype';
import BackgroundModuleCss from './index.module.css';

/**
 * Type definition for `BackgroundProps.backgroundAnimation`.
 */
export enum BackgroundAnimation {
  FADE = 'fade',
  ZOOM = 'zoom'
}

/**
 * `BackgroundProps` interface for the `Background` JSX
 * component's props used inside the `Slide` components.
 * The `Slide` components `background` prop is also defined
 * by `BackgroundProps`.
 */
export interface BackgroundProps {
  shouldLazyLoad?: boolean;
  backdropFilter?: CSS.Properties['backdropFilter'];
  backfaceVisibility?: CSS.Properties['backfaceVisibility'];
  background?: CSS.Properties['background'];
  backgroundAttachment?: CSS.Properties['backgroundAttachment'];
  backgroundBlendMode?: CSS.Properties['backgroundBlendMode'];
  backgroundClip?: CSS.Properties['backgroundClip'];
  backgroundColor?: CSS.Properties['backgroundColor'];
  backgroundImage?: CSS.Properties['backgroundImage'];
  backgroundOrigin?: CSS.Properties['backgroundOrigin'];
  backgroundPosition?: CSS.Properties['backgroundPosition'];
  backgroundPositionX?: CSS.Properties['backgroundPositionX'];
  backgroundPositionY?: CSS.Properties['backgroundPositionY'];
  backgroundRepeat?: CSS.Properties['backgroundRepeat'];
  backgroundSize?: CSS.Properties['backgroundSize'];
  backgroundAnimationDuration?: CSS.Properties['backgroundSize'];
  backgroundAnimationDelay?: CSS.Properties['backgroundSize'];
  backgroundAnimation?: `${BackgroundAnimation}`;
  maskBackgroundBlendMode?:
    | 'normal'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'saturation'
    | 'color'
    | 'luminosity';
  width?: CSS.Properties['width'];
  height?: CSS.Properties['height'];
  alt?: string;
  src?: string;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export default function Background(props: BackgroundProps) {
  const {
    shouldLazyLoad = true,
    width,
    height,
    onLoad,
    alt,
    ...background
  } = props;

  const { backgroundImage, backgroundAnimation } = background;

  /**
   * If there is no `backgroundImage`, then there is no need to:
   * - Add the `Loading` class is not needed, instead the default class is `Loaded`.
   * - `img` tag element will not render.
   */
  const [className, setClassName] = React.useState(
    backgroundImage ? BackgroundModuleCss.Loading : BackgroundModuleCss.Loaded
  );

  const onLoadHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ): void => {
    if (onLoad) onLoad(event);

    const className = [BackgroundModuleCss.Loaded];

    switch (backgroundAnimation) {
      case BackgroundAnimation.ZOOM:
        className.push(BackgroundModuleCss.ZoomOut);
        break;
      case BackgroundAnimation.FADE:
      default:
        className.push(BackgroundModuleCss.FadeIn);
        break;
    }

    setClassName(className.join(' '));
  };

  const style: React.CSSProperties = {
    backgroundPosition: 'center top',
    backgroundSize: 'cover',
    width: width || '100%',
    height: height || '100%',
    ...background,
    backgroundImage: backgroundImage ? `url('${backgroundImage}')` : undefined
  };

  const content = (
    <>
      {backgroundImage && (
        <img
          className={BackgroundModuleCss.Loader}
          onLoad={onLoadHandler}
          alt={alt}
          loading={shouldLazyLoad ? 'lazy' : 'eager'}
          src={backgroundImage}
        />
      )}
      <div style={style} className={className} />
    </>
  );

  return shouldLazyLoad ? <div>{content}</div> : content;
}
