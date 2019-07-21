// Libraries
import * as React from 'react';

// Dependencies
import {
  EBackgroundAnimations,
  IBackgroundProps,
} from '../../../typings/definitions';

// CSS
import BackgroundModuleCss from './Background.module.css';

// Components
import LazyLoad from 'react-lazyload';

const Background = (props: IBackgroundProps) => {
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
  const [className, setClassName] = React.useState((
    backgroundImage ? BackgroundModuleCss.Loading : BackgroundModuleCss.Loaded
  ));

  const onLoadHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>): void => {
    if (onLoad) {
      onLoad(event);
    }
    const className = [BackgroundModuleCss.Loaded];
    switch (backgroundAnimation) {
      case EBackgroundAnimations.ZOOM:
        className.push(BackgroundModuleCss.ZoomOut);
        break;
      case EBackgroundAnimations.FADE:
      default:
        className.push(BackgroundModuleCss.FadeIn);
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
        <img
          className={BackgroundModuleCss.Loader}
          onLoad={onLoadHandler}
          alt={alt}
          src={backgroundImage}/>
      )}
      <div
        style={style}
        className={className} />
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

export default React.memo(Background);
