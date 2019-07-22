// Libraries
import * as React from 'react';

// Dependencies
import {
  IMaskProps,
} from './typings';

// CSS
import MaskModuleCss from './Mask.module.css';

// Components
import LazyLoad from 'react-lazyload';

const { useState, memo } = React;

const Mask = (props: IMaskProps) => {
  const { background } = props;

  const [className, setClassName] = useState(MaskModuleCss.Loading);

  const onLoadHandler = () => {
    setClassName(MaskModuleCss.Loaded);
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

  const isLoaded = className === MaskModuleCss.Loaded;

  return (
    <div
      className={[
        MaskModuleCss.Mask,
        (props.isActive && props.isDoneSliding) ? MaskModuleCss.Active : MaskModuleCss.Inactive,
      ].join(' ')}>
      <LazyLoad
        offset={window.innerHeight}
        debounce={false}
        height="100%">
        <img
          className={MaskModuleCss.Loader}
          onLoad={onLoadHandler}
          src={background.backgroundImage}/>
        {isLoaded && (
          <div
          style={style}
          className={[
            className,
            isLoaded && MaskModuleCss.Inner,
            isLoaded && !props.isDoneSliding && MaskModuleCss.Sliding,
          ].join(' ')} />
        )}
    </LazyLoad>
    </div>
  );
};

export default memo(Mask);
