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
        orientation: 'vertical'
      }}
      autoplay
      controller={{
        slidingDuration: 400,
        slidingDelay: 100
      }}
      style={{
        backgroundColor: '#000'
      }}
      settings={{
        shouldDisplayButtons: false
      }}
    >
      <Overlay>
        <Navbar />
        <Wrapper>
          <Title>Navbar Slider</Title>
          <Subtitle>Cool stuff.</Subtitle>
        </Wrapper>
      </Overlay>

      <Slide
        shouldRenderMask
        label="Kyoto - Japan"
        background={{
          backgroundColor: '#6D9B98',
          backgroundImage: kyoto
        }}
      />

      <Slide
        shouldRenderMask
        label="Tenryu-ji Temple - KyÅto-shi - Japan"
        background={{
          backgroundColor: '#8A8A8A',
          backgroundImage: tenryuJiTemple
        }}
      />

      <Slide
        shouldRenderMask
        label="Hakone - Japan"
        background={{
          backgroundColor: '#EA2329',
          backgroundImage: hakone
        }}
      />

      <Slide
        shouldRenderMask
        label="Byodo-In Temple - Kaneohe - United States"
        background={{
          backgroundColor: '#2D7791',
          backgroundImage: byodoInTemple
        }}
      />

      <MenuNav />
    </HeroSlider>
  );
}
