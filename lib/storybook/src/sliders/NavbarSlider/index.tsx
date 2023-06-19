import HeroSlider, { Slide, Overlay, MenuNav } from 'hero-slider';
import Navbar from '../../ui/Navbar';
import Wrapper from '../../ui/Wrapper';
import Title from '../../ui/Title';
import Subtitle from '../../ui/Subtitle';
import kyoto from './backgrounds/Kyoto - Japan.jpg';
import tenryuJiTemple from './backgrounds/Tenryu-ji Temple - Kyōto-shi - Japan.jpg';
import hakone from './backgrounds/Hakone - Japan.jpg';
import byodoInTemple from './backgrounds/Byodo-In Temple - Kaneohe - United States.jpg';

export default function NavbarSlider() {
  return (
    <HeroSlider
      height="100vh"
      accessability={{
        shouldDisplayButtons: false,
        orientation: 'vertical'
      }}
      autoplay
      controller={{
        slidingDuration: 400,
        slidingDelay: 100
      }}
    >
      <Overlay>
        <Navbar />
        <Wrapper>
          <Title>You Own Navbar</Title>
          <Subtitle>Cool stuff.</Subtitle>
        </Wrapper>
      </Overlay>

      <Slide
        shouldRenderMask
        label="Kyoto - Japan"
        background={{
          backgroundImageSrc: kyoto
        }}
      />

      <Slide
        shouldRenderMask
        label="Tenryu-ji Temple - KyÅto-shi - Japan"
        background={{
          backgroundImageSrc: tenryuJiTemple
        }}
      />

      <Slide
        shouldRenderMask
        label="Hakone - Japan"
        background={{
          backgroundImageSrc: hakone
        }}
      />

      <Slide
        shouldRenderMask
        label="Byodo-In Temple - Kaneohe - United States"
        background={{
          backgroundImageSrc: byodoInTemple
        }}
      />

      <MenuNav />
    </HeroSlider>
  );
}
