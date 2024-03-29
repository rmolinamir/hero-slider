import HeroSlider, { Slide, SideNav } from 'hero-slider';
import Wrapper from '../../ui/Wrapper';
import Title from '../../ui/Title';

const salta = 'https://i.imgur.com/PWYw2wn.jpg';
const scharbeutz = 'https://i.imgur.com/jxtxPMu.jpg';
const selvaDiValGardena = 'https://i.imgur.com/jEdUeMb.jpg';
const seoraksanMountains = 'https://i.imgur.com/vZKOfl1.jpg';

export default function SlidesWithContentSlider() {
  return (
    <HeroSlider
      height="100vh"
      autoplay
      controller={{
        slidingDuration: 600,
        slidingDelay: 100
      }}
    >
      <Slide
        background={{
          backgroundImageSrc: salta
        }}
      >
        <Wrapper>
          <Title>Salta - Argentina</Title>
        </Wrapper>
      </Slide>

      <Slide
        background={{
          backgroundImageSrc: scharbeutz
        }}
      >
        <Wrapper>
          <Title>Scharbeutz - Germany</Title>
        </Wrapper>
      </Slide>

      <Slide
        background={{
          backgroundImageSrc: selvaDiValGardena
        }}
      >
        <Wrapper>
          <Title>Selva Di Val Gardena - Italy</Title>
        </Wrapper>
      </Slide>

      <Slide
        background={{
          backgroundImageSrc: seoraksanMountains
        }}
      >
        <Wrapper>
          <Title>Seoraksan Mountains - South Korea</Title>
        </Wrapper>
      </Slide>

      <SideNav
        position={{
          top: 0,
          right: 0
        }}
      />
    </HeroSlider>
  );
}
