import HeroSlider, { Slide, Overlay, Nav, AutoplayButton } from 'hero-slider';
import Wrapper from '../../ui/Wrapper';
import Title from '../../ui/Title';

// Images
const kyoto = 'https://i.imgur.com/xw5Abku.jpg';
const tenryuJiTemple = 'https://i.imgur.com/g5JNdYL.jpg';
const hakone = 'https://i.imgur.com/Iq6XtFR.jpg';
const byodoInTemple = 'https://i.imgur.com/le9OeEC.jpg';

export default function AutoplayButtonSlider() {
  return (
    <HeroSlider
      height="100vh"
      controller={{
        initialSlide: 1,
        slidingDuration: 500,
        slidingDelay: 100
      }}
      autoplay={{
        autoplayDuration: 2000
      }}
      style={{
        backgroundColor: '#000'
      }}
      settings={{
        shouldDisplayButtons: false
      }}
    >
      <Overlay>
        <Wrapper>
          <Title>Autoplay Button Slider</Title>
          <AutoplayButton />
        </Wrapper>
      </Overlay>

      <Slide
        shouldRenderMask
        background={{
          backgroundColor: '#8A8A8A',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: kyoto,
          backgroundAnimation: 'fade'
        }}
      />

      <Slide
        shouldRenderMask
        background={{
          backgroundColor: '#8A8A8A',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: tenryuJiTemple,
          backgroundAnimation: 'fade'
        }}
      />

      <Slide
        shouldRenderMask
        background={{
          backgroundColor: '#8A8A8A',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: hakone,
          backgroundAnimation: 'fade'
        }}
      />

      <Slide
        shouldRenderMask
        background={{
          backgroundColor: '#8A8A8A',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: byodoInTemple,
          backgroundAnimation: 'fade'
        }}
      />

      <Nav />
    </HeroSlider>
  );
}
