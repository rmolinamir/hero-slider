import React from 'react'
// Images
import bogliasco from './backgrounds/Bogliasco - Italy.jpg'
import countyClare from './backgrounds/County Clare - Ireland.jpg'
import craterRock from './backgrounds/Crater Rock - United States.jpg'
import giauPass from './backgrounds/Giau Pass - Italy.jpg'
// JSX
import HeroSlider, {
  Slide,
  Nav
} from 'hero-slider'
import Wrapper from '../UI/Wrapper/Wrapper'
import Title from '../UI/Title/Title'
import Subtitle from '../UI/Subtitle/Subtitle'

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
        backgroundColor: 'rgba(0, 0, 0, 0.33)'
      }}
      settings={{
        slidingDuration: 250,
        slidingDelay: 100,
        shouldAutoplay: true,
        shouldDisplayButtons: true,
        autoplayDuration: 5000,
        height: '100vh'
      }}>
      <Wrapper>
        <Title>
          Basic Slider
        </Title>
        <Subtitle>
          Slides' background attachment set to fixed
        </Subtitle>
      </Wrapper>

      <Slide
        navDescription='Giau Pass - Italy'
        background={{
          backgroundImage: giauPass,
          backgroundAttachment: 'fixed'
        }} />

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

      <Nav />
    </HeroSlider>
  )
}

export default app
