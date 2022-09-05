import React from 'react';
import HeroSlider, { Slide, Overlay } from 'hero-slider';
import { Button } from '../../ui/Button';
import Wrapper from '../../ui/Wrapper';
import Title from '../../ui/Title';
import Subtitle from '../../ui/Subtitle';

const bogliasco = 'https://i.imgur.com/Gu5Cznz.jpg';
const countyClare = 'https://i.imgur.com/idjXzVQ.jpg';
const craterRock = 'https://i.imgur.com/8DYumaY.jpg';
const giauPass = 'https://i.imgur.com/8IuucQZ.jpg';

export default function ButtonsSlider() {
  const goToNextSlidePointer = React.useRef<() => void>();
  const goToPreviousSlidePointer = React.useRef<() => void>();

  return (
    <HeroSlider
      accessability={{
        shouldDisplayButtons: false
      }}
      controller={{
        slidingDuration: 400,
        slidingDelay: 100,
        goToNextSlidePointer: goToNextSlidePointer,
        goToPreviousSlidePointer: goToPreviousSlidePointer
      }}
      style={{
        backgroundColor: '#000'
      }}
    >
      <Overlay>
        <Wrapper>
          <Title>Custom Buttons Slider</Title>
          <Subtitle>
            You can set up your own React components to control the{' '}
            <code>HeroSlider</code>.
          </Subtitle>
          <div style={{ marginTop: 16 }}>
            <Button
              primary
              size="large"
              onClick={() =>
                goToPreviousSlidePointer.current &&
                goToPreviousSlidePointer.current()
              }
              label="Previous"
            />
            <Button
              primary
              size="large"
              onClick={() =>
                goToNextSlidePointer.current && goToNextSlidePointer?.current()
              }
              label="Next"
            />
          </div>
        </Wrapper>
      </Overlay>

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
    </HeroSlider>
  );
}
