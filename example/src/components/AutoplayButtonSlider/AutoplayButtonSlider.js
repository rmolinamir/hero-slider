import React from 'react'
// Components
import HeroSlider, {
  Slide,
  Nav,
  AutoplayButton,
  OverlayContainer,
} from 'hero-slider'
import Wrapper from '../UI/Wrapper/Wrapper'
import Title from '../UI/Title/Title'

// Images
const kyoto = 'https://i.imgur.com/xw5Abku.jpg'
const tenryuJiTemple = 'https://i.imgur.com/g5JNdYL.jpg'
const hakone = 'https://i.imgur.com/Iq6XtFR.jpg'
const byodoInTemple = 'https://i.imgur.com/le9OeEC.jpg'

const app = () => {
  return (
    <HeroSlider
      slidingAnimation='left_to_right'
      orientation='horizontal'
      set
      initialSlide={1}
      style={{
        backgroundColor: '#000'
      }}
      settings={{
        slidingDuration: 500,
        slidingDelay: 100,
        shouldAutoplay: true,
        shouldDisplayButtons: false,
        autoplayDuration: 2000,
        height: '100vh'
      }}>
      <OverlayContainer>
        <Wrapper>
          <Title>
            Autoplay Button Slider
          </Title>
        </Wrapper>
      </OverlayContainer>
      <AutoplayButton />

      <Slide
        shouldRenderMask
        background={{
          backgroundColor: '#8A8A8A',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: kyoto,
          backgroundAnimation: 'fade'
        }} />

      <Slide
        shouldRenderMask
        background={{
          backgroundColor: '#8A8A8A',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: tenryuJiTemple,
          backgroundAnimation: 'fade'
        }} />

      <Slide
        shouldRenderMask
        background={{
          backgroundColor: '#8A8A8A',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: hakone,
          backgroundAnimation: 'fade'
        }} />

      <Slide
        shouldRenderMask
        background={{
          backgroundColor: '#8A8A8A',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: byodoInTemple,
          backgroundAnimation: 'fade'
        }} />

      <Nav />
    </HeroSlider>
  )
}

export default app
