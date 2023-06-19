import HeroSlider, { Slide, Overlay, Nav, SideNav } from 'hero-slider';
import Wrapper from '../../ui/Wrapper';
import Title from '../../ui/Title';
import Subtitle from '../../ui/Subtitle';
import salta from './backgrounds/Salta - Argentina.jpg';
import scharbeutz from './backgrounds/Scharbeutz - Germany.jpg';
import selvaDiValGardena from './backgrounds/Selva Di Val Gardena - Italy.jpg';
import seoraksanMountains from './backgrounds/Seoraksan Mountains - South Korea.jpg';

export default function VerticalSlider() {
  return (
    <HeroSlider
      accessability={{
        orientation: 'vertical'
      }}
      controller={{
        slidingDuration: 400,
        slidingDelay: 100
      }}
    >
      <Overlay>
        <Wrapper>
          <Title>Vertical Orientation</Title>
          <Subtitle>
            Switch to a display that supports touch, then swipe vertically. Of
            course, horizontal swiping is also supported if the{' '}
            <code>orientation</code> prop of the slider is{' '}
            <code>horizontal</code>.
          </Subtitle>
        </Wrapper>
      </Overlay>

      <Slide
        shouldRenderMask
        label="Black Widow"
        background={{
          backgroundColor: '#6D9B98',
          backgroundImageSrc: salta
        }}
      />

      <Slide
        shouldRenderMask
        label="Captain America"
        background={{
          backgroundColor: '#8A8A8A',
          backgroundImageSrc: scharbeutz
        }}
      />

      <Slide
        shouldRenderMask
        label="Iron Man"
        background={{
          backgroundColor: '#EA2329',
          backgroundImageSrc: selvaDiValGardena
        }}
      />

      <Slide
        shouldRenderMask
        label="Thor"
        background={{
          backgroundColor: '#2D7791',
          backgroundImageSrc: seoraksanMountains
        }}
      />

      <Nav
        position={{
          bottom: '15%',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      />

      <SideNav
        isPositionedRight={false}
        position={{
          top: '50%',
          left: '0',
          transform: 'translateY(-50%)'
        }}
      />

      <SideNav />
    </HeroSlider>
  );
}
