import * as React from 'react'
// Types
import {
  EBackgroundAnimations,
  IBackgroundProps
} from '../../typings'
// CSS
import classes from './Background.module.css'
// JSX
import LazyLoad from 'react-lazyload'

const background = (props: IBackgroundProps) => {
  const {
    width,
    height,
    onLoad,
    alt,
    ...background
  } = props

  /**
   * If there are no `background.backgroundImage`, then there is no need to:
   * - Add the `Loading` class is not needed, instead the default class is `Loaded`.
   * - `img` tag element will not render.
   */
  const [className, setClassName] = React.useState(background.backgroundImage ? classes.Loading : classes.Loaded)

  const onLoadHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>): void => {
    if (onLoad) {
      onLoad(event)
    }
    const { backgroundAnimation } = background
    const className = [classes.Loaded]
    switch (backgroundAnimation) {
      case EBackgroundAnimations.ZOOM:
        className.push(classes.ZoomOut)
        break
      case EBackgroundAnimations.FADE:
      default:
        className.push(classes.FadeIn)
        break
    }
    setClassName(className.join(' '))
  }

  const style: React.CSSProperties = React.useMemo(() => {
    return {
      backgroundPosition: 'center top',
      backgroundSize: 'cover',
      width: width || '100%',
      height: height || '100%',
      ...background,
      backgroundImage: background.backgroundImage ? `url('${background.backgroundImage}')` : undefined
    }
  }, [])

  return (
    <LazyLoad
      offset={window.innerHeight}
      debounce={false}
      height={height || '100%'}>
      {background.backgroundImage && (
        <img
          className={classes.Loader}
          onLoad={onLoadHandler}
          alt={alt}
          src={background.backgroundImage}/>
      )}
      <div
        style={style}
        className={className} />
    </LazyLoad>
  )
}

export default background
