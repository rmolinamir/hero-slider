// Libraries
import * as React from 'react';

// Dependencies
import {
  IMaskProps,
} from './typings';

// Components
import LazyLoad from 'react-lazyload';
import { Mask, Img } from './styled-components';

const { useState, memo } = React;

const BackgroundMask = (props: IMaskProps) => {
  const { background } = props;

  const [className, setClassName] = useState('slide-background-mask-loading');

  const onLoadHandler = () => {
    setClassName('slide-background-mask-loaded');
  };

  const style: React.CSSProperties = React.useMemo(
    () => {
      return {
        backgroundColor: background.backgroundColor,
        backgroundBlendMode: background.maskBackgroundBlendMode,
        backgroundImage: `url('${background.backgroundImage}')`,
      } as React.CSSProperties;
    },
    [background.backgroundColor, background.backgroundImage, background.maskBackgroundBlendMode],
  );

  const isLoaded = className === 'slide-background-mask-loaded';

  return (
    <Mask
      className={[
        'slide-background-mask',
        (props.isActive && props.isDoneSliding) ? 'slide-background-mask-active' : 'slide-background-mask-inactive',
      ].join(' ')}>
      <LazyLoad
        offset={window.innerHeight}
        debounce={false}
        height="100%">
        <Img
          className="slide-background-mask-loader"
          onLoad={onLoadHandler}
          src={background.backgroundImage}/>
        {isLoaded && (
          <div
            style={style}
            className={[
              className,
              isLoaded ? 'slide-background-mask-inner' : null,
              (isLoaded && !props.isDoneSliding) ? 'slide-background-mask-inner-sliding' : null,
            ].join(' ')}
          />
        )}
      </LazyLoad>
    </Mask>
  );
};

export default memo(BackgroundMask);
