import React from 'react'

import FancySlider, {
  Slide,
  Nav,
  SideNav
} from 'react-fancy-slider'

const app = () => {
  const nextSlideHandler = React.useRef()
  const previousSlideHandler = React.useRef()

  return (
    <>
      <FancySlider
        nextSlide={nextSlideHandler}
        previousSlide={previousSlideHandler}
        slidingAnimation='left_to_right'
        orientation='horizontal'
        settings={{
          slidingDuration: 300,
          slidingDelay: 300,
          // shouldAutoplay: true,
          autoplayDuration: 6000
        }}>
        <Slide style={{
          backgroundColor: '#6D9B98',
          backgroundImage: "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/blackwidow.jpg')"
        }}>
          <h1>Black Widow</h1>
          <p>Hello world.</p>
        </Slide>

        <Slide style={{
          backgroundColor: '#8A8A8A',
          backgroundImage: "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/captainamerica.jpg')"
        }}>
          <h1>Captain America</h1>
        </Slide>

        <Slide style={{
          backgroundColor: '#EA2329',
          backgroundImage: "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/ironman-alt.jpg')"
        }}>
          <h1>Iron Man</h1>
        </Slide>

        <Slide style={{
          backgroundColor: '#2D7791',
          backgroundImage: "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/thor.jpg')"
        }}>
          <h1>Thor</h1>
        </Slide>
        <Nav />
        <SideNav
          position={{
            bottom: '0',
            right: '0'
          }}
        />
      </FancySlider>
      {/* <h1>Fancy Slider test</h1>
      <button onClick={() => previousSlideHandler.current()}>Previous Slide</button>
      <button onClick={() => nextSlideHandler.current()}>Next Slide</button> */}
    </>
  )
}

export default app
