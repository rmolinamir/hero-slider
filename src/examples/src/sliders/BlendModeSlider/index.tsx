import React from 'react';
import HeroSlider, { Slide, SideNav, ButtonsNav, Container } from 'hero-slider';
import rockyWaterfall from './backgrounds/Rocky Waterfall.jpg';
import palauPacificOcean from './backgrounds/Palau - Pacific Ocean.jpg';
import queposCostaRica from './backgrounds/Quepos - Costa Rica.jpg';
import mountainView from './backgrounds/MountainView.jpg';
import Wrapper from '../../ui/Wrapper';
import Title from '../../ui/Title';
import Subtitle from '../../ui/Subtitle';

const app = () => {
  const nextSlideHandler = React.useRef();
  const previousSlideHandler = React.useRef();

  return (
    <HeroSlider
      nextSlide={nextSlideHandler}
      previousSlide={previousSlideHandler}
      slidingAnimation="fade"
      orientation="horizontal"
      initialSlide={1}
      onBeforeChange={(previousSlide: number, nextSlide: number) =>
        console.log('onBeforeChange', previousSlide, nextSlide)
      }
      onChange={(nextSlide: number) => console.log('onChange', nextSlide)}
      onAfterChange={(nextSlide: number) =>
        console.log('onAfterChange', nextSlide)
      }
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
      }}
    >
      <Container>
        <Wrapper>
          <Title>Blend Mode Slider</Title>
          <Subtitle>
            Slides&apos; and masks&apos; background blend mode set to luminosity
          </Subtitle>
          <Subtitle>Slides&apos; shouldRenderMask prop set to true</Subtitle>
        </Wrapper>
      </Container>

      <Slide
        shouldRenderMask
        navDescription="Rocky Waterfall"
        background={{
          backgroundColor: '#2D7791',
          backgroundBlendMode: 'luminosity',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: rockyWaterfall
        }}
      />

      <Slide
        shouldRenderMask
        navDescription="Palau - Pacific Ocean"
        background={{
          backgroundColor: '#8A8A8A',
          backgroundBlendMode: 'luminosity',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: palauPacificOcean
        }}
      />

      <Slide
        shouldRenderMask
        navDescription="Quepos - Costa Rica"
        background={{
          backgroundColor: '#EA2329',
          backgroundBlendMode: 'luminosity',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: queposCostaRica
        }}
      />

      <Slide
        shouldRenderMask
        navDescription="Mountain View"
        background={{
          backgroundColor: '#6D9B98',
          backgroundBlendMode: 'luminosity',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: mountainView
        }}
      />

      <ButtonsNav />

      <SideNav
        // @ts-ignore
        position={{
          top: '0',
          right: '0'
        }}
      />
    </HeroSlider>
  );
};

export default app;
