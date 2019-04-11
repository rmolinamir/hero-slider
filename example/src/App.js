import React from 'react'

import FancySlider, { Slide } from 'react-fancy-slider'

// import ExampleComponent from './FancySlider'

const app = () => {
  const nextSlideHandler = React.useRef()
  const previousSlideHandler = React.useRef()

  return (
    <>
      <FancySlider
        nextSlide={nextSlideHandler}
        previousSlide={previousSlideHandler}
        slidingAnimation='top-to-bottom'
        settings={{
          slidingDuration: 300,
          slidingDelay: 300,
          shouldAutoplay: false,
          autoplayDuration: 6000
        }}>
        <Slide style={{
          backgroundColor: '#6d9b98',
          backgroundImage: "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/blackwidow.jpg')"
        }}>
          <h1>Black Widow</h1>
          <p>Hello world.</p>
        </Slide>

        <Slide style={{
          backgroundColor: '#8a8a8a',
          backgroundImage: "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/captainamerica.jpg')"
        }}>
          <h1>Captain America</h1>
        </Slide>

        <Slide style={{
          backgroundColor: '#ea2329',
          backgroundImage: "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/ironman-alt.jpg')"
        }}>
          <h1>Iron Man</h1>
        </Slide>
      </FancySlider>
      {/* <h1>Fancy Slider test</h1>
      <button onClick={() => previousSlideHandler.current()}>Previous Slide</button>
      <button onClick={() => nextSlideHandler.current()}>Next Slide</button> */}
    </>
  )
}

export default app
