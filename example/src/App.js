import React from 'react'

import HeroSlider, {
  Slide,
  // Nav,
  SideNav,
  MenuNav
} from 'hero-slider'

const app = () => {
  const nextSlideHandler = React.useRef()
  const previousSlideHandler = React.useRef()

  return (
    <>
      <HeroSlider
        nextSlide={nextSlideHandler}
        previousSlide={previousSlideHandler}
        slidingAnimation='left_to_right'
        orientation='horizontal'
        initialSlide={3}
        settings={{
          slidingDuration: 250,
          slidingDelay: 100,
          shouldAutoplay: false,
          shouldDisplayButtons: false,
          autoplayDuration: 1000
        }}>
        <Slide
          menuNavDescription='Black Widow, lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.'
          style={{
            backgroundColor: '#6D9B98',
            backgroundBlendMode: 'luminosity',
            backgroundImage: "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/blackwidow.jpg')"
          }}>
          <h1>Black Widow</h1>
          <p>Hello world.</p>
        </Slide>

        <Slide
          menuNavDescription='Captain America, lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.'
          style={{
            backgroundColor: '#8A8A8A',
            backgroundBlendMode: 'luminosity',
            backgroundImage: "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/captainamerica.jpg')"
          }}>
          <h1>Captain America</h1>
        </Slide>

        <Slide
          menuNavDescription='Iron Man, lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.'
          style={{
            backgroundColor: '#EA2329',
            backgroundBlendMode: 'luminosity',
            backgroundImage: "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/ironman-alt.jpg')"
          }}>
          <h1>Iron Man</h1>
        </Slide>

        <Slide
          menuNavDescription='Thor, lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.'
          style={{
            backgroundColor: '#2D7791',
            backgroundBlendMode: 'luminosity',
            backgroundImage: "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/thor.jpg')"
          }}>
          <h1>Thor</h1>
        </Slide>
        {/* <Nav /> */}
        <MenuNav />
        <SideNav
          position={{
            top: '0',
            right: '0'
          }}
        />
      </HeroSlider>
      {/* <h1>Fancy Slider test</h1>
      <button onClick={() => previousSlideHandler.current()}>Previous Slide</button>
      <button onClick={() => nextSlideHandler.current()}>Next Slide</button> */}
    </>
  )
}

export default app
