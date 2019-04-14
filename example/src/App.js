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
    <div style={{
      height: '200vh'
    }}>
      <HeroSlider
        nextSlide={nextSlideHandler}
        previousSlide={previousSlideHandler}
        slidingAnimation='left_to_right'
        orientation='horizontal'
        initialSlide={1}
        onBeforeChange={(previousSlide, nextSlide) => console.log('onBeforeChange', previousSlide, nextSlide)}
        onChange={(nextSlide) => console.log('onChange', nextSlide)}
        onAfterChange={(nextSlide) => console.log('onAfterChange', nextSlide)}
        style={{
          backgroundColor: '#000'
        }}
        settings={{
          slidingDuration: 250,
          slidingDelay: 100,
          shouldAutoplay: true,
          shouldDisplayButtons: true,
          autoplayDuration: 8000,
          height: '100vh'
        }}>
        <Slide
          navDescription='Black Widow, lorem ipsum lorem ipsum.'
          background={{
            backgroundColor: '#6D9B98',
            backgroundBlendMode: 'luminosity',
            backgroundImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/blackwidow.jpg',
            backgroundAnimation: 'fade'
          }}>
          <h1>Black Widow</h1>
          <p>Hello world.</p>
        </Slide>

        <Slide
          navDescription='Captain America, lorem ipsum lorem ipsum.'
          background={{
            backgroundColor: '#8A8A8A',
            backgroundBlendMode: 'luminosity',
            backgroundImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/captainamerica.jpg',
            backgroundAnimation: 'fade'
          }}>
          <h1>Captain America</h1>
        </Slide>

        <Slide
          navDescription='Iron Man, lorem ipsum lorem ipsum.'
          background={{
            backgroundColor: '#EA2329',
            backgroundBlendMode: 'luminosity',
            backgroundImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/ironman-alt.jpg',
            backgroundAnimation: 'fade'
          }}>
          <h1>Iron Man</h1>
        </Slide>

        <Slide
          navDescription='Thor, lorem ipsum lorem ipsum.'
          background={{
            backgroundColor: '#2D7791',
            backgroundBlendMode: 'luminosity',
            backgroundImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/thor.jpg',
            backgroundAnimation: 'fade'
          }}>
          <h1>Thor</h1>
        </Slide>
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
    </div>
  )
}

export default app
