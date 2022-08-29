import React from 'react'
import PropTypes from 'prop-types'
// CSS
import classes from './Wrapper.module.css'

const wrapper = (props) => {
  return (
    <div className={classes.Container}>
      {props.children}
    </div>
  )
}

wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.object,
    PropTypes.element
  ])
}

export default wrapper
