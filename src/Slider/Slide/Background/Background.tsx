import * as React from 'react'
// Types
import { IBackgroundProps } from '../../HeroSlider'
// CSS
import classes from './Background.module.css'
// JSX
import LazyLoad from 'react-lazyload'

const background = (props: IBackgroundProps) => {
  const {
    width,
    height,
    ...background
  } = props

  const [className, setClassName] = React.useState(classes.Loading)

  const onLoadHandler = () => {
    setClassName(classes.Loaded)
  }

  const style: React.CSSProperties = React.useMemo(() => {
    return {
      backgroundPosition: 'center top',
      backgroundSize: 'cover',
      width: width || '100%',
      height: height || '100%',
      ...background,
      backgroundImage: `url(${background.backgroundImage})`
    }
  }, [])

  return (
    <LazyLoad
      debounce={false}
      height={height || '100%'}>
      <img
        className={classes.Loader}
        onLoad={onLoadHandler}
        src={background.backgroundImage}/>
      <div
        style={style}
        className={className} />
    </LazyLoad>
  )
}

export default background
