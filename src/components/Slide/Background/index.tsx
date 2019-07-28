// Libraries
import * as React from 'react';

// Dependencies
import {
  EBackgroundAnimations,
} from '../../../typings/definitions';
import {
  IBackgroundProps,
} from './typings';

// Components
import LazyLoad from 'react-lazyload';
import { Img, Background } from './styled-components';

const { useState, memo } = React;

const SlideBackground = (props: IBackgroundProps) => {
  const {
    shouldLazyLoad = true,
    lazyLoadingOffset,
    width,
    height,
    onLoad,
    alt,
    ...background
  } = props;

  const { backgroundImage, backgroundAnimation } = background;

  /**
   * If there are no `backgroundImage`, then there is no need to:
   * - Add the `Loading` class is not needed, instead the default class is `Loaded`.
   * - `img` tag element will not render.
   */
  const [className, setClassName] = useState((
    backgroundImage ? 'slide-background-loading' : 'slide-background-loaded'
  ));

  const onLoadHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>): void => {
    if (onLoad) {
      onLoad(event);
    }
    const className = ['slide-background-loaded'];
    switch (backgroundAnimation) {
      case EBackgroundAnimations.ZOOM:
        className.push('slide-background-zoom-out');
        break;
      case EBackgroundAnimations.FADE:
      default:
        className.push('slide-background-fade-in');
        break;
    }
    setClassName(className.join(' '));
  };

  const style: React.CSSProperties = React.useMemo(
    () => {
      return {
        backgroundPosition: 'center top',
        backgroundSize: 'cover',
        width: width || '100%',
        height: height || '100%',
        ...background,
        backgroundImage: backgroundImage ? `url('${backgroundImage}')` : undefined,
      };
    },
    [background, backgroundImage, height, width],
  );

  const content = (
    <React.Fragment>
      {backgroundImage && (
        <Img
          className="slide-background-loader"
          onLoad={onLoadHandler}
          alt={alt}
          src={backgroundImage}
        />
      )}
      <Background
        style={style}
        className={className}
      />
    </React.Fragment>
  );

  return (
    shouldLazyLoad ? (
      <LazyLoad
        offset={lazyLoadingOffset || window.innerHeight}
        debounce={false}
        height={height || '100%'}>
        {content}
      </LazyLoad>
    ) : content
  );
};

export default memo(SlideBackground);
