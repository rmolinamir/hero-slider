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
   * CSS property. Defines the width of the background.
   * @default '100%'
   */
  width?: CSS.Properties['width'];
  /**
   * CSS property. Defines the height of the background.
   * @default '100%'
   */
  height?: CSS.Properties['height'];
  backgroundColor?: CSS.Properties['backgroundColor'];
  backgroundAnimationDuration?: CSS.Properties['animationDuration'];
  backgroundAnimationDelay?: CSS.Properties['animationDelay'];
  /**
   * Background animation after the image loads.
   * There are currently two options, a fade-in animation, or a zoom in animation that lasts 30 secs, the background zooms in until it reaches its original size.
   * @default 'fade'
   */
  backgroundAnimation?: `${BackgroundAnimation}`;
  /**
   * Background blend mode CSS property **for the optional mask that could render in each of the Slide components**.
   */
  maskBackgroundBlendMode?: CSS.Properties['backgroundBlendMode'];
  /**
   * Background image.
   */
  backgroundImageClassName?: HTMLImageElement['sizes'];
  backgroundImageBlendMode?: CSS.Properties['mixBlendMode'];
  backgroundImageSizes?: HTMLImageElement['sizes'];
  backgroundImageSrcSet?: HTMLImageElement['srcset'];
  backgroundImageSrc?: HTMLImageElement['src'];
  backgroundImageAlt?: HTMLImageElement['alt'];
  backgroundImageStyle?: React.CSSProperties;
  /**
   * Boolean variable to allow or disable lazy loading.
   * @default true
   */
  shouldLazyLoad?: boolean;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export default function Background(props: BackgroundProps) {
  const {
    backgroundAnimation = BackgroundAnimation.FADE,
    backgroundImageClassName,
    backgroundImageBlendMode,
    backgroundImageSizes,
    backgroundImageSrcSet,
    backgroundImageSrc,
    backgroundImageAlt,
    backgroundImageStyle,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    maskBackgroundBlendMode: _, // Not used.
    shouldLazyLoad = true,
    onLoad,
    ...background
  } = props;

  const [isLoaded, setIsLoaded] = React.useState(false);

  const onLoadHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ): void => {
    if (onLoad) onLoad(event);

    setIsLoaded(true);
  };

  /**
   * If there is no `backgroundImageSrc`, then there is no need to:
   * - Add the `Loading` class is not needed, instead the default class is `Loaded`.
   * - `img` tag element will not render.
   */
  const imageBackgroundClassNames: string[] = [];

  if (isLoaded) {
    imageBackgroundClassNames.push(BackgroundModuleCss.Loaded);
    switch (backgroundAnimation) {
      case BackgroundAnimation.ZOOM:
        imageBackgroundClassNames.push(BackgroundModuleCss.ZoomOut);
        break;
      case BackgroundAnimation.FADE:
        imageBackgroundClassNames.push(BackgroundModuleCss.FadeIn);
        break;
    }
  } else {
    imageBackgroundClassNames.push(BackgroundModuleCss.Loading);
  }

  return (
    <div
      className={composeCssClasses(
        'hero-slider-slide-background',
        backgroundImageClassName,
        BackgroundModuleCss.Background
      )}
      style={background}
    >
      <img
        className={composeCssClasses(
          'hero-slider-slide-background-image',
          backgroundImageClassName,
          BackgroundModuleCss.Image,
          ...imageBackgroundClassNames
        )}
        sizes={backgroundImageSizes}
        srcSet={backgroundImageSrcSet}
        src={backgroundImageSrc}
        alt={backgroundImageAlt}
        style={{
          mixBlendMode: backgroundImageBlendMode,
          ...backgroundImageStyle
        }}
        onLoad={onLoadHandler}
        loading={shouldLazyLoad ? 'lazy' : 'eager'}
      />
    </div>
  );
}
