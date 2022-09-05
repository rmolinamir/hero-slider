import HeroSlider, { Slide, Overlay, Nav } from 'hero-slider';
import Wrapper from '../../ui/Wrapper';
import Title from '../../ui/Title';
import Subtitle from '../../ui/Subtitle';
import bogliasco from './backgrounds/Bogliasco - Italy.jpg';
import countyClare from './backgrounds/County Clare - Ireland.jpg';
import craterRock from './backgrounds/Crater Rock - United States.jpg';
import giauPass from './backgrounds/Giau Pass - Italy.jpg';

export default function BasicSlider() {
  return (
    <HeroSlider
      height={'100vh'}
      autoplay
      controller={{
        initialSlide: 1,
        slidingDuration: 500,
        slidingDelay: 100,
        onChange: (nextSlide: number) =>
          console.debug('onChange(nextSlide): ', nextSlide),
        onBeforeChange: (previousSlide: number, nextSlide: number) =>
          console.debug(
            'onBeforeChange(previousSlide, nextSlide): ',
            previousSlide,
            nextSlide
          ),
        onAfterChange: (nextSlide: number) =>
          console.debug('onAfterChange(nextSlide): ', nextSlide)
      }}
    >
      <Overlay>
        <Wrapper>
          <Title>Basic Slider</Title>
          <Subtitle>Slides&apos; background attachment set to fixed</Subtitle>
        </Wrapper>
      </Overlay>

      <Slide
        label="Giau Pass - Italy"
        background={{
          backgroundImage: giauPass,
          backgroundAttachment: 'fixed'
        }}
      />

      <Slide
        label="Bogliasco - Italy"
        background={{
          backgroundImage: bogliasco,
          backgroundAttachment: 'fixed'
        }}
      />

      <Slide
        label="County Clare - Ireland"
        background={{
          backgroundImage: countyClare,
          backgroundAttachment: 'fixed'
        }}
      />

      <Slide
        label="Crater Rock, OR - United States"
        background={{
          backgroundImage: craterRock,
          backgroundAttachment: 'fixed'
        }}
      />

      <Nav />
    </HeroSlider>
  );
}
