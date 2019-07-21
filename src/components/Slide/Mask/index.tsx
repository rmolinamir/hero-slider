import * as React from 'react';
// Types
import { IBackgroundProps } from '../../../typings/definitions';
// CSS
import MaskModuleCss from './Mask.module.css';
// Components
import LazyLoad from 'react-lazyload';

interface IMaskProps {
  isActive: boolean;
  isDoneSliding: boolean;
  background: IBackgroundProps;
}

const Mask = (props: IMaskProps) => {
  const { background } = props;

  const [className, setClassName] = React.useState(MaskModuleCss.Loading);

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

export default React.memo(Mask);
