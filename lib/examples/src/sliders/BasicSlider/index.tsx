import HeroSlider, { Slide, Overlay, Nav } from 'hero-slider';
import Wrapper from '../../ui/Wrapper';
import Title from '../../ui/Title';
import bogliasco from './backgrounds/Bogliasco - Italy.jpg';
import countyClare from './backgrounds/County Clare - Ireland.jpg';
import craterRock from './backgrounds/Crater Rock - United States.jpg';
import giauPass from './backgrounds/Giau Pass - Italy.jpg';

export default function BasicSlider() {
  return (
    <HeroSlider
      height="100vh"
      autoplay
      controller={{
        initialSlide: 1,
        slidingDuration: 500,
        slidingDelay: 100,
        onSliding: (nextSlide: number) =>
          console.debug('onSliding(nextSlide): ', nextSlide),
        onBeforeSliding: (previousSlide: number, nextSlide: number) =>
          console.debug(
            'onBeforeSliding(previousSlide, nextSlide): ',
            previousSlide,
            nextSlide
          ),
        onAfterSliding: (nextSlide: number) =>
          console.debug('onAfterSliding(nextSlide): ', nextSlide)
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
          backgroundImageSrc: giauPass
        }}
      />

      <Slide
        label="Bogliasco - Italy"
        background={{
          backgroundImageSrc: bogliasco
        }}
      />

      <Slide
        label="County Clare - Ireland"
        background={{
          backgroundImageSrc: countyClare
        }}
      />

      <Slide
        label="Crater Rock, OR - United States"
        background={{
          backgroundImageSrc: craterRock
        }}
      />

      <Nav />
    </HeroSlider>
  );
}
