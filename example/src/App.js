import React from 'react'

import FancySlider, { Slide } from 'react-fancy-slider'

// import ExampleComponent from './FancySlider'

const app = () => {
  const nextSlideHandler = React.useRef()
  const previousSlideHandler = React.useRef()

  return (
    <>
      <h1>Hello world</h1>
      <button onClick={() => previousSlideHandler.current()}>Previous Slide</button>
      <button onClick={() => nextSlideHandler.current()}>Next Slide</button>
      <FancySlider
        nextSlide={nextSlideHandler}
        previousSlide={previousSlideHandler}
        slidingAnimation='top-to-bottom'
        bSmartSliding={true}
        settings={{
          bShouldAutoplay: true,
          autoplayDuration: 6000
        }}>
        <Slide style={{
          backgroundColor: '#6d9b98',
          backgroundImage: "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/blackwidow.jpg')",
          backgroundRepeat: 'no-repeat',
          // backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}>
          <h1>Black Widow</h1>
        </Slide>

        <Slide style={{
          backgroundColor: '#8a8a8a',
          backgroundImage: "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/captainamerica.jpg')",
          backgroundRepeat: 'no-repeat',
          // backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}>
          <h1>Captain America</h1>
        </Slide>

        <Slide style={{
          backgroundColor: '#ea2329',
          backgroundImage: "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/ironman-alt.jpg')",
          backgroundRepeat: 'no-repeat',
          // backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}>
          <h1>Iron Man</h1>
        </Slide>
      </FancySlider>
    </>
  )
}

export default app
