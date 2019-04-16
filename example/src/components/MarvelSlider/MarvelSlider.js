import React from 'react'

import HeroSlider, {
  Slide,
  SideNav,
  ButtonsNav
} from 'hero-slider'

const app = () => {
  const nextSlideHandler = React.useRef()
  const previousSlideHandler = React.useRef()

  return (
    <HeroSlider
      nextSlide={nextSlideHandler}
      previousSlide={previousSlideHandler}
      slidingAnimation='fade'
      orientation='horizontal'
      initialSlide={1}
      onBeforeChange={(previousSlide, nextSlide) => console.log('onBeforeChange', previousSlide, nextSlide)}
      onChange={(nextSlide) => console.log('onChange', nextSlide)}
      onAfterChange={(nextSlide) => console.log('onAfterChange', nextSlide)}
      style={{
        backgroundColor: '#000'
      }}
      settings={{
        slidingDuration: 400,
        slidingDelay: 100,
        shouldAutoplay: true,
        shouldDisplayButtons: true,
        autoplayDuration: 8000,
        height: '100vh'
      }}>
      <Slide
        shouldRenderMask
        navDescription='Black Widow'
        background={{
          backgroundColor: '#6D9B98',
          backgroundBlendMode: 'luminosity',
          backgroundImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/blackwidow.jpg'
        }} />

      <Slide
        shouldRenderMask
        navDescription='Captain America'
        background={{
          backgroundColor: '#8A8A8A',
          backgroundBlendMode: 'luminosity',
          backgroundImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/captainamerica.jpg'
        }} />

      <Slide
        shouldRenderMask
        navDescription='Iron Man'
        background={{
          backgroundColor: '#EA2329',
          backgroundBlendMode: 'luminosity',
          backgroundImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/ironman-alt.jpg'
        }} />

      <Slide
        shouldRenderMask
        navDescription='Thor'
        background={{
          backgroundColor: '#2D7791',
          backgroundBlendMode: 'luminosity',
          backgroundImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/thor.jpg'
        }} />

      <ButtonsNav />
      <SideNav
        position={{
          top: '0',
          right: '0'
        }}
      />
    </HeroSlider>
  )
}

export default app
