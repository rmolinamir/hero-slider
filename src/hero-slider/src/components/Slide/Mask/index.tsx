import React from 'react';
import { IMaskProps } from './typings';
import MaskModuleCss from './Mask.module.css';
import LazyLoad from 'react-lazyload';

const Mask = (props: IMaskProps) => {
  const { background } = props;

  const [className, setClassName] = React.useState(MaskModuleCss.Loading);

  const onLoadHandler = () => {
    setClassName(MaskModuleCss.Loaded);
  };

  const style: React.CSSProperties = React.useMemo(() => {
    return {
      backgroundColor: background.backgroundColor,
      backgroundBlendMode: background.maskBackgroundBlendMode,
      backgroundImage: `url('${background.backgroundImage}')`
    } as React.CSSProperties;
  }, [
    background.backgroundColor,
    background.backgroundImage,
    background.maskBackgroundBlendMode
  ]);

  const isLoaded = className === MaskModuleCss.Loaded;

  return (
    <div
      className={[
        MaskModuleCss.Mask,
        props.isActive && props.isDoneSliding
          ? MaskModuleCss.Active
          : MaskModuleCss.Inactive
      ].join(' ')}
    >
      <LazyLoad offset={window.innerHeight} debounce={false} height="100%">
        <img
          alt=""
          className={MaskModuleCss.Loader}
          onLoad={onLoadHandler}
          src={background.backgroundImage}
        />
        {isLoaded && (
          <div
            style={style}
            className={[
              className,
              isLoaded && MaskModuleCss.Inner,
              isLoaded && !props.isDoneSliding && MaskModuleCss.Sliding
            ].join(' ')}
          />
        )}
      </LazyLoad>
    </div>
  );
};

export default Mask;
