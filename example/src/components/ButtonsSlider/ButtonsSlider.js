import React from 'react'
// Components
import HeroSlider, {
  Slide,
  Nav,
  OverlayContainer,
} from 'hero-slider'
import Button from 'react-png-button'
import Wrapper from '../UI/Wrapper/Wrapper'
import Title from '../UI/Title/Title'
import Subtitle from '../UI/Subtitle/Subtitle'

// Images
const bogliasco = 'https://i.imgur.com/Gu5Cznz.jpg'
const countyClare = 'https://i.imgur.com/idjXzVQ.jpg'
const craterRock = 'https://i.imgur.com/8DYumaY.jpg'
const giauPass = 'https://i.imgur.com/8IuucQZ.jpg'

const app = () => {
  const nextSlideHandler = React.useRef()
  const previousSlideHandler = React.useRef()

  return (
    <HeroSlider
      nextSlide={nextSlideHandler}
      previousSlide={previousSlideHandler}
      slidingAnimation='left_to_right'
      orientation='horizontal'
      set
      initialSlide={1}
      onBeforeChange={(previousSlide, nextSlide) => console.log('onBeforeChange', previousSlide, nextSlide)}
      onChange={(nextSlide) => console.log('onChange', nextSlide)}
      onAfterChange={(nextSlide) => console.log('onAfterChange', nextSlide)}
      style={{
        backgroundColor: '#000'
      }}
      settings={{
        slidingDuration: 500,
        slidingDelay: 100,
        shouldAutoplay: true,
        shouldDisplayButtons: false,
        autoplayDuration: 8000,
        height: '100vh'
      }}>
      <OverlayContainer>
        <Wrapper>
          <Title>
            Custom Buttons Slider
          </Title>
          <Subtitle>
            Custom Navigation Buttons set up by passing React mutable ref objects as props
          </Subtitle>
          <div>
            <Button
              style={{
                width: 100,
                margin: '12px 8px'
              }}
              button='danger'
              onClick={() => previousSlideHandler.current()}>Previous</Button>
            <Button
              style={{
                width: 100,
                margin: '12px 8px'
              }}
              button='success'
              onClick={() => nextSlideHandler.current()}>Next</Button>
          </div>
        </Wrapper>
      </OverlayContainer>

      <Slide
        shouldRenderMask
        background={{
          backgroundColor: '#8A8A8A',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: bogliasco,
          backgroundAnimation: 'fade'
        }} />

      <Slide
        shouldRenderMask
        background={{
          backgroundColor: '#8A8A8A',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: countyClare,
          backgroundAnimation: 'fade'
        }} />

      <Slide
        shouldRenderMask
        background={{
          backgroundColor: '#8A8A8A',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: craterRock,
          backgroundAnimation: 'fade'
        }} />

      <Slide
        shouldRenderMask
        background={{
          backgroundColor: '#8A8A8A',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: giauPass,
          backgroundAnimation: 'fade'
        }} />

      <Nav />
    </HeroSlider>
  )
}

export default app
