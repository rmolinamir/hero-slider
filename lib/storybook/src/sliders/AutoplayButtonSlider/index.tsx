import HeroSlider, { Slide, Overlay, Nav, AutoplayButton } from 'hero-slider';
import Wrapper from '../../ui/Wrapper';
import Title from '../../ui/Title';

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
        autoplayDuration: 2000,
        autoplayDebounce: 0
      }}
    >
      <Overlay>
        <Wrapper>
          <Title>Autoplay Button</Title>
          <AutoplayButton />
        </Wrapper>
      </Overlay>

      <Slide
        shouldRenderMask
        background={{
          backgroundColor: '#8A8A8A',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImageSrc: kyoto,
          backgroundAnimation: 'fade'
        }}
      />

      <Slide
        shouldRenderMask
        background={{
          backgroundColor: '#8A8A8A',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImageSrc: tenryuJiTemple,
          backgroundAnimation: 'fade'
        }}
      />

      <Slide
        shouldRenderMask
        background={{
          backgroundColor: '#8A8A8A',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImageSrc: hakone,
          backgroundAnimation: 'fade'
        }}
      />

      <Slide
        shouldRenderMask
        background={{
          backgroundColor: '#8A8A8A',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImageSrc: byodoInTemple,
          backgroundAnimation: 'fade'
        }}
      />

      <Nav />
    </HeroSlider>
  );
}
