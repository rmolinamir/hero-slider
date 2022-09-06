import HeroSlider, { Slide, Overlay, Nav, AutoplayButton } from 'hero-slider';
import Wrapper from '../../ui/Wrapper';
import Title from '../../ui/Title';
import Subtitle from '../../ui/Subtitle';
import bogliasco from './backgrounds/Bogliasco - Italy.jpg';
import countyClare from './backgrounds/County Clare - Ireland.jpg';
import craterRock from './backgrounds/Crater Rock - United States.jpg';
import giauPass from './backgrounds/Giau Pass - Italy.jpg';

export default function DebugSlider() {
  return (
    <HeroSlider
      height={'100vh'}
      autoplay={{
        autoplayDuration: 100,
        autoplayDebounce: 1000
      }}
      controller={{
        initialSlide: 1,
        slidingDuration: 400,
        slidingDelay: 100,
        onSliding: (nextSlide: number) =>
          console.warn('onSliding(nextSlide): ', nextSlide),
        onBeforeSliding: (previousSlide: number, nextSlide: number) =>
          console.warn(
            'onBeforeSliding(previousSlide, nextSlide): ',
            previousSlide,
            nextSlide
          ),
        onAfterSliding: (nextSlide: number) =>
          console.warn('onAfterSliding(nextSlide): ', nextSlide)
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
          <Title>Debugging</Title>
          <Subtitle>
            The <code>debug</code> prop of the <code>settings</code> can be used
            to configure the level of feedback you would like from the{' '}
            <code>HeroSlider</code>.
          </Subtitle>
          <AutoplayButton />
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
