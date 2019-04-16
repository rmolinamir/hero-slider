import React from 'react'
// Images
import bogliasco from './backgrounds/Bogliasco - Italy.jpg'
import countyClare from './backgrounds/County Clare - Ireland.jpg'
import craterRock from './backgrounds/Crater Rock, OR - United States.jpg'
import giauPass from './backgrounds/Giau Pass - Italy.jpg'
// JSX
import HeroSlider, {
  Slide,
  SideNav,
  MenuNav
} from 'hero-slider'

const app = () => {
  const nextSlideHandler = React.useRef()
  const previousSlideHandler = React.useRef()

  return (
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
        shouldDisplayButtons: false,
        autoplayDuration: 5000,
        height: '100vh'
      }}>
      <Slide
        navDescription='Bogliasco - Italy'
        background={{
          backgroundImage: bogliasco,
          backgroundAttachment: 'fixed'
        }} />

      <Slide
        navDescription='County Clare - Ireland'
        background={{
          backgroundImage: countyClare,
          backgroundAttachment: 'fixed'
        }} />

      <Slide
        navDescription='Crater Rock, OR - United States'
        background={{
          backgroundImage: craterRock,
          backgroundAttachment: 'fixed'
        }} />

      <Slide
        navDescription='Giau Pass - Italy'
        background={{
          backgroundImage: giauPass,
          backgroundAttachment: 'fixed'
        }} />

      <MenuNav />
      <SideNav
        isPositionedRight={false}
        position={{
          top: '50%',
          left: '0',
          transform: 'translateY(-50%)'
        }}
      />
    </HeroSlider>
  )
}

export default app
