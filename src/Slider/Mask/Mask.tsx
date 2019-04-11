import * as React from 'react'
// CSS
import classes from './Mask.module.css'

interface IMaskProps {
  isActive: boolean
  isDoneSliding: boolean
  style: React.CSSProperties
}

const mask = (props: IMaskProps) => {
  return (
    <div
      className={[
        classes.Mask,
        (props.isActive && props.isDoneSliding) ? classes.Active : classes.Inactive,
        props.isActive && !props.isDoneSliding && classes.Sliding
      ].join(' ')}>
      <div
        style={props.style}
        className={[
          classes.Inner,
          !props.isDoneSliding && classes.Sliding
        ].join(' ')} />
    </div>
  )
}

export default mask
