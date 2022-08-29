import React from 'react';
import Slider, { Slide, Container, Nav } from 'hero-slider';
import Wrapper from '../../ui/Wrapper';
import Title from '../../ui/Title';
import Subtitle from '../../ui/Subtitle';
import bogliasco from './backgrounds/Bogliasco - Italy.jpg';
import countyClare from './backgrounds/County Clare - Ireland.jpg';
import craterRock from './backgrounds/Crater Rock - United States.jpg';
import giauPass from './backgrounds/Giau Pass - Italy.jpg';

export default function BasicSlider() {
  const nextSlideHandler = React.useRef();
  const previousSlideHandler = React.useRef();

  return (
    <Slider
      nextSlide={nextSlideHandler}
      previousSlide={previousSlideHandler}
      // @ts-ignore
      slidingAnimation="left_to_right"
      // @ts-ignore
      orientation="horizontal"
      initialSlide={1}
      // onBeforeChange={(previousSlide, nextSlide) => console.log('onBeforeChange', previousSlide, nextSlide)}
      onChange={(nextSlide) => console.debug('onChange', nextSlide)}
      // onAfterChange={(nextSlide) => console.log('onAfterChange', nextSlide)}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.33)'
      }}
      // @ts-ignore
      settings={{
        slidingDuration: 250,
        slidingDelay: 100,
        shouldAutoplay: true,
        shouldDisplayButtons: true,
        shouldSlideOnArrowKeypress: true,
        autoplayDuration: 5000,
        height: '100vh'
      }}
    >
      <Container>
        <Wrapper>
          <Title>Basic Slider</Title>
          <Subtitle>Slides&apos; background attachment set to fixed</Subtitle>
        </Wrapper>
      </Container>

      {(() => {
        console.debug('This is a Slide rendered by a HOC.');
        return (
          <Slide
            navDescription="Giau Pass - Italy"
            // @ts-ignore
            background={{
              backgroundImage: giauPass,
              backgroundAttachment: 'fixed'
            }}
          />
        );
      })()}

      <Slide
        navDescription="Bogliasco - Italy"
        // @ts-ignore
        background={{
          backgroundImage: bogliasco,
          backgroundAttachment: 'fixed'
        }}
      />

      <Slide
        navDescription="County Clare - Ireland"
        // @ts-ignore
        background={{
          backgroundImage: countyClare,
          backgroundAttachment: 'fixed'
        }}
      />

      <Slide
        navDescription="Crater Rock, OR - United States"
        // @ts-ignore
        background={{
          backgroundImage: craterRock,
          backgroundAttachment: 'fixed'
        }}
      />

      {/* @ts-ignore */}
      <Nav />
    </Slider>
  );
}
