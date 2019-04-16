import React from 'react'
// JSX
import HeroSlider, {
  Slide,
  SideNav
} from 'hero-slider'
import Wrapper from '../UI/Wrapper/Wrapper'
import Title from '../UI/Title/Title'

// Images
const salta = 'https://i.imgur.com/PWYw2wn.jpg'
const scharbeutz = 'https://i.imgur.com/jxtxPMu.jpg'
const selvaDiValGardena = 'https://i.imgur.com/jEdUeMb.jpg'
const seoraksanMountains = 'https://i.imgur.com/vZKOfl1.jpg'

const app = () => {
  return (
    <HeroSlider
      slidingAnimation='top_to_bottom'
      orientation='horizontal'
      initialSlide={1}
      onBeforeChange={(previousSlide, nextSlide) => console.log('onBeforeChange', previousSlide, nextSlide)}
      onChange={(nextSlide) => console.log('onChange', nextSlide)}
      onAfterChange={(nextSlide) => console.log('onAfterChange', nextSlide)}
      style={{
        backgroundColor: '#000'
      }}
      settings={{
        slidingDuration: 600,
        slidingDelay: 100,
        shouldAutoplay: true,
        shouldDisplayButtons: true,
        autoplayDuration: 8000,
        height: '100vh'
      }}>

      <Slide
        background={{
          backgroundImage: salta
        }}>
        <Wrapper>
          <Title>
            Salta - Argentina
          </Title>
        </Wrapper>
      </Slide>

      <Slide
        background={{
          backgroundImage: scharbeutz
        }}>
        <Wrapper>
          <Title>
            Scharbeutz - Germany
          </Title>
        </Wrapper>
      </Slide>

      <Slide
        background={{
          backgroundImage: selvaDiValGardena
        }}>
        <Wrapper>
          <Title>
            Selva Di Val Gardena - Italy
          </Title>
        </Wrapper>
      </Slide>

      <Slide
        background={{
          backgroundImage: seoraksanMountains
        }}>
        <Wrapper>
          <Title>
          Seoraksan Mountains - South Korea
          </Title>
        </Wrapper>
      </Slide>

      <SideNav position={{
        top: 0,
        right: 0
      }} />
    </HeroSlider>
  )
}

export default app
