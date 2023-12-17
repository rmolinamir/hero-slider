'use client';
import 'hero-slider/dist/index.css';
import HeroSlider, { Nav, Overlay, Slide } from 'hero-slider';
import Title from '../ui/Title';
import Wrapper from '../ui/Wrapper';
import bogliasco from './backgrounds/Bogliasco - Italy.jpg';
import countyClare from './backgrounds/County Clare - Ireland.jpg';
import craterRock from './backgrounds/Crater Rock - United States.jpg';
import giauPass from './backgrounds/Giau Pass - Italy.jpg';

export default function BasicSlider() {
  return (
    <HeroSlider
      className='h-full w-full'
      autoplay
      controller={{
        initialSlide: 1,
        slidingDuration: 500,
        slidingDelay: 100,
        onSliding: (nextSlide: number) =>
          console.debug('onSliding(nextSlide): ', nextSlide),
      }}
      settings={{
        debug: {
          verbose: true,
          info: true,
          debug: true,
          warnings: true,
          errors: true
        }
      }}
    >
      <Overlay>
        <Wrapper>
          <Title>Basic Setup</Title>
        </Wrapper>
      </Overlay>

      <Slide
        label="Giau Pass - Italy"
        background={{
          backgroundImageSrc: giauPass.src
        }}
      />

      <Slide
        label="Bogliasco - Italy"
        background={{
          backgroundImageSrc: bogliasco.src
        }}
      />

      <Slide
        label="County Clare - Ireland"
        background={{
          backgroundImageSrc: countyClare.src
        }}
      />

      <Slide
        label="Crater Rock, OR - United States"
        background={{
          backgroundImageSrc: craterRock.src
        }}
      />

      <Nav />
    </HeroSlider>
  );
}
