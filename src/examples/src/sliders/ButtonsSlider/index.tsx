import React from 'react';
// Components
import HeroSlider, { Slide, Nav, Container } from 'hero-slider';
import { Button } from '../../ui/Button';
import Wrapper from '../../ui/Wrapper';
import Title from '../../ui/Title';
import Subtitle from '../../ui/Subtitle';

// Images
const bogliasco = 'https://i.imgur.com/Gu5Cznz.jpg';
const countyClare = 'https://i.imgur.com/idjXzVQ.jpg';
const craterRock = 'https://i.imgur.com/8DYumaY.jpg';
const giauPass = 'https://i.imgur.com/8IuucQZ.jpg';

const app = () => {
  const nextSlideHandler = React.useRef<() => void>();
  const previousSlideHandler = React.useRef<() => void>();

  return (
    <HeroSlider
      nextSlide={nextSlideHandler}
      previousSlide={previousSlideHandler}
      slidingAnimation="left_to_right"
      orientation="horizontal"
      initialSlide={1}
      onBeforeChange={(previousSlide, nextSlide) =>
        console.log('onBeforeChange', previousSlide, nextSlide)
      }
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
      }}
    >
      <Container>
        <Wrapper>
          <Title>Custom Buttons Slider</Title>
          <Subtitle>
            Custom Navigation Buttons set up by passing React mutable ref
            objects as props
          </Subtitle>
          <div style={{ marginTop: 16 }}>
            <Button
              primary
              size="large"
              onClick={() =>
                previousSlideHandler.current && previousSlideHandler.current()
              }
              label="Previous"
            />
            <Button
              primary
              size="large"
              onClick={() =>
                nextSlideHandler.current && nextSlideHandler.current()
              }
              label="Next"
            />
          </div>
        </Wrapper>
      </Container>

      <Slide
        shouldRenderMask
        background={{
          backgroundColor: '#8A8A8A',
          maskBackgroundBlendMode: 'multiply',
          backgroundImage: bogliasco,
          backgroundAnimation: 'fade'
        }}
      />

      <Slide
        shouldRenderMask
        background={{
          backgroundColor: '#8A8A8A',
          maskBackgroundBlendMode: 'multiply',
          backgroundImage: countyClare,
          backgroundAnimation: 'fade'
        }}
      />

      <Slide
        shouldRenderMask
        background={{
          backgroundColor: '#8A8A8A',
          maskBackgroundBlendMode: 'multiply',
          backgroundImage: craterRock,
          backgroundAnimation: 'fade'
        }}
      />

      <Slide
        shouldRenderMask
        background={{
          backgroundColor: '#8A8A8A',
          maskBackgroundBlendMode: 'multiply',
          backgroundImage: giauPass,
          backgroundAnimation: 'fade'
        }}
      />

      <Nav />
    </HeroSlider>
  );
};

export default app;
