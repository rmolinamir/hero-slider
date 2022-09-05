import React from 'react';
import { MaskProps } from './typings';
import MaskModuleCss from './Mask.module.css';

const Mask = (props: MaskProps) => {
  const { background } = props;

  const [className, setClassName] = React.useState(MaskModuleCss.Loading);

  const onLoadHandler = () => {
    setClassName(MaskModuleCss.Loaded);
  };

  const style: React.CSSProperties = React.useMemo(() => {
    return {
      backgroundColor: background?.backgroundColor,
      backgroundBlendMode: background?.maskBackgroundBlendMode,
      backgroundImage: `url('${background?.backgroundImage}')`
    } as React.CSSProperties;
  }, [
    background?.backgroundColor,
    background?.backgroundImage,
    background?.maskBackgroundBlendMode
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
            isLoaded && !props.isDoneSliding && MaskModuleCss.Sliding
          ].join(' ')}
        />
      )}
    </div>
  );
};

export default Mask;
