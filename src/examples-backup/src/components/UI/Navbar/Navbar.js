import React from 'react'
import PropTypes from 'prop-types'
// CSS
import classes from './Navbar.module.css'

const navbar = (props) => {
  return (
    <nav className={classes.Container}>
      <span className={classes.Main}>Fake Navbar</span>
      <div className={classes.Links}>
        <span>Home</span>
        <span>Link A</span>
        <span>Link B</span>
      </div>
      {props.children}
    </nav>
  )
}

navbar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

export default navbar
