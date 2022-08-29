import React from 'react';
import classes from './index.module.css';

const navbar = (props: React.PropsWithChildren) => {
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
  );
};

export default navbar;
