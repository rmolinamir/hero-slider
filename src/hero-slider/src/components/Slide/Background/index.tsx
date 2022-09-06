import React from 'react';
import type CSS from 'csstype';
import BackgroundModuleCss from './index.module.css';
import { composeCssClasses } from '../../../utils/composeCssClasses';

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
  /**
   * Boolean variable to allow or disable lazy loading.
   * @default true
   */
  shouldLazyLoad?: boolean;
  backdropFilter?: CSS.Properties['backdropFilter'];
  backfaceVisibility?: CSS.Properties['backfaceVisibility'];
  background?: CSS.Properties['background'];
  backgroundAttachment?: CSS.Properties['backgroundAttachment'];
  backgroundBlendMode?: CSS.Properties['backgroundBlendMode'];
  backgroundClip?: CSS.Properties['backgroundClip'];
  backgroundColor?: CSS.Properties['backgroundColor'];
  /**
   * Background image. **Not the same as the CSS property**, just pass the `string` uri, not the typical `url([link])`.
   */
  backgroundImage?: CSS.Properties['backgroundImage'];
  backgroundOrigin?: CSS.Properties['backgroundOrigin'];
  /**
   * CSS property. Defines the position of the background.
   * @default 'center top'
   */
  backgroundPosition?: CSS.Properties['backgroundPosition'];
  backgroundPositionX?: CSS.Properties['backgroundPositionX'];
  backgroundPositionY?: CSS.Properties['backgroundPositionY'];
  backgroundRepeat?: CSS.Properties['backgroundRepeat'];
  /**
   * CSS property. Defines the size of the background.
   * @default 'cover'
   */
  backgroundSize?: CSS.Properties['backgroundSize'];
  backgroundAnimationDuration?: CSS.Properties['backgroundSize'];
  backgroundAnimationDelay?: CSS.Properties['backgroundSize'];
  /**
   * Background animation after the image loads.
   * There are currently two options, a fade-in animation, or a zoom in animation that lasts 30 secs, the background zooms in until it reaches its original size.
   * @default 'fade'
   */
  backgroundAnimation?: `${BackgroundAnimation}`;
  /**
   * Background blend mode CSS property **for the optional mask that could render in each of the Slide components**.
   */
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
  /**
   * CSS property. Defines the width of the background.
   * @default '100%'
   */
  width?: CSS.Properties['width'];
  /**
   * CSS property. Defines the height of the background.
   * @default '100%'
   */
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

  const { backgroundImage, backgroundAnimation = BackgroundAnimation.FADE } =
    background;

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
          className={composeCssClasses(
            'hero-slider-slide-background-loader',
            BackgroundModuleCss.Loader
          )}
          onLoad={onLoadHandler}
          alt={alt}
          loading={shouldLazyLoad ? 'lazy' : 'eager'}
          src={backgroundImage}
        />
      )}
      <div
        style={style}
        className={composeCssClasses('hero-slider-slide-background', className)}
      />
    </>
  );

  return shouldLazyLoad ? <div>{content}</div> : content;
}
