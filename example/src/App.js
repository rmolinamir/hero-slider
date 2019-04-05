import React, { Component } from 'react'

import FancySlider, { Slide } from 'react-fancy-slider'

// import ExampleComponent from './FancySlider'

export default class App extends Component {
  render () {
    return (
      <FancySlider>
        <Slide style={{
          backgroundColor: 'rgba(46, 138, 138, 0.8)',
          backgroundImage: "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/blackwidow.jpg')",
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}>
          <h1>Black Widow</h1>
        </Slide>
        <Slide style={{
          backgroundColor: 'rgba(192, 60, 96, 0.8)',
          backgroundImage: "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/captainamerica.jpg')",
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}>
          <h1>Captain America</h1>
        </Slide>
      </FancySlider>
    )
  }
}
