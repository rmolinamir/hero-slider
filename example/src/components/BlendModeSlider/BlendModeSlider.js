import React from 'react'
// Images
import rockyWaterfall from './backgrounds/Rocky Waterfall.jpg'
import palauPacificOcean from './backgrounds/Palau - Pacific Ocean.jpg'
import queposCostaRica from './backgrounds/Quepos - Costa Rica.jpg'
import mountainView from './backgrounds/MountainView.jpg'
// JSX
import HeroSlider, {
  Slide,
  SideNav,
  ButtonsNav
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
      <Wrapper>
        <Title>
          Blend Mode Slider
        </Title>
        <Subtitle>
          Slides' and masks' background blend mode set to luminosity
        </Subtitle>
        <Subtitle>
          Slides' shouldRenderMask prop set to true
        </Subtitle>
      </Wrapper>

      <Slide
        shouldRenderMask
        navDescription='Rocky Waterfall'
        background={{
          backgroundColor: '#2D7791',
          backgroundBlendMode: 'luminosity',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: rockyWaterfall
        }} />

      <Slide
        shouldRenderMask
        navDescription='Palau - Pacific Ocean'
        background={{
          backgroundColor: '#8A8A8A',
          backgroundBlendMode: 'luminosity',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: palauPacificOcean
        }} />

      <Slide
        shouldRenderMask
        navDescription='Quepos - Costa Rica'
        background={{
          backgroundColor: '#EA2329',
          backgroundBlendMode: 'luminosity',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: queposCostaRica
        }} />

      <Slide
        shouldRenderMask
        navDescription='Mountain View'
        background={{
          backgroundColor: '#6D9B98',
          backgroundBlendMode: 'luminosity',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: mountainView
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
