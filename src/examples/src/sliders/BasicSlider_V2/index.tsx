import { V2 } from 'hero-slider';
import Wrapper from '../../ui/Wrapper';
import Title from '../../ui/Title';
import Subtitle from '../../ui/Subtitle';
import bogliasco from './backgrounds/Bogliasco - Italy.jpg';
import countyClare from './backgrounds/County Clare - Ireland.jpg';
import craterRock from './backgrounds/Crater Rock - United States.jpg';
import giauPass from './backgrounds/Giau Pass - Italy.jpg';

const { Slider, Slide, Container, Nav } = V2;

export default function BasicSlider() {
  return (
    <Slider
      height={'100vh'}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.33)'
      }}
      animations={{
        initialSlidingAnimation: 'left_to_right'
      }}
      accessability={{
        orientation: 'horizontal'
      }}
      autoplay={{
        autoplayDuration: 5000
      }}
      controller={{
        initialSlide: 1,
        slidingDuration: 250,
        slidingDelay: 100,
        onChange: (nextSlide) => console.debug('onChange', nextSlide),
        onBeforeChange: (previousSlide, nextSlide) =>
          console.log('onBeforeChange', previousSlide, nextSlide),
        onAfterChange: (nextSlide) => console.log('onAfterChange', nextSlide)
      }}
      settings={{
        shouldAutoplay: true,
        shouldDisplayButtons: true,
        shouldSlideOnArrowKeypress: true
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
            label="Giau Pass - Italy"
            background={{
              backgroundImage: giauPass,
              backgroundAttachment: 'fixed'
            }}
          />
        );
      })()}

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
    </Slider>
  );
}
