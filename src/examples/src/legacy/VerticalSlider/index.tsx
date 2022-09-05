import React from 'react';
import { legacy } from 'hero-slider';
import Wrapper from '../../ui/Wrapper';
import Title from '../../ui/Title';
import Subtitle from '../../ui/Subtitle';
import salta from './backgrounds/Salta - Argentina.jpg';
import scharbeutz from './backgrounds/Scharbeutz - Germany.jpg';
import selvaDiValGardena from './backgrounds/Selva Di Val Gardena - Italy.jpg';
import seoraksanMountains from './backgrounds/Seoraksan Mountains - South Korea.jpg';

const { default: Slider, Slide, Container, Nav, SideNav } = legacy;

export default function VerticalSlider() {
  const nextSlideHandler = React.useRef();
  const previousSlideHandler = React.useRef();

  return (
    <Slider
      nextSlide={nextSlideHandler}
      previousSlide={previousSlideHandler}
      // @ts-ignore
      slidingAnimation="top_to_bottom"
      // @ts-ignore
      orientation="vertical"
      initialSlide={1}
      onBeforeChange={(previousSlide: number, nextSlide: number) =>
        console.debug('onBeforeChange', previousSlide, nextSlide)
      }
      onChange={(nextSlide: number) => console.debug('onChange', nextSlide)}
      onAfterChange={(nextSlide: number) =>
        console.debug('onAfterChange', nextSlide)
      }
      style={{
        backgroundColor: '#000'
      }}
      // @ts-ignore
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
          <Title>Vertical Slider</Title>
          <Subtitle>
            Try switching to a display that supports touch, then swipe
            vertically
          </Subtitle>
        </Wrapper>
      </Container>

      <Slide
        shouldRenderMask
        navDescription="Black Widow"
        // @ts-ignore
        background={{
          backgroundAttachment: 'fixed',
          backgroundColor: '#6D9B98',
          backgroundImage: salta
        }}
      />

      <Slide
        shouldRenderMask
        navDescription="Captain America"
        // @ts-ignore
        background={{
          backgroundAttachment: 'fixed',
          backgroundColor: '#8A8A8A',
          backgroundImage: scharbeutz
        }}
      />

      <Slide
        shouldRenderMask
        navDescription="Iron Man"
        // @ts-ignore
        background={{
          backgroundAttachment: 'fixed',
          backgroundColor: '#EA2329',
          backgroundImage: selvaDiValGardena
        }}
      />

      <Slide
        shouldRenderMask
        navDescription="Thor"
        // @ts-ignore
        background={{
          backgroundAttachment: 'fixed',
          backgroundColor: '#2D7791',
          backgroundImage: seoraksanMountains
        }}
      />

      <Nav
        // @ts-ignore
        position={{
          bottom: '15%',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      />

      <SideNav
        isPositionedRight={false}
        // @ts-ignore
        position={{
          top: '50%',
          left: '0',
          transform: 'translateY(-50%)'
        }}
      />

      {/* @ts-ignore */}
      <SideNav />
    </Slider>
  );
}
