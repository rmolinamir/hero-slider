import React from 'react'
import PropTypes from 'prop-types'
// CSS
import classes from './Title.module.css'

const title = (props) => {
  return (
    <h1 className={classes.Container}>
      {props.children}
    </h1>
  )
}

title.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

export default title
