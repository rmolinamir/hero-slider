import HeroSlider, { Slide, ButtonsNav, Nav, Overlay } from 'hero-slider';
import Wrapper from '../../ui/Wrapper';
import Title from '../../ui/Title';
import Subtitle from '../../ui/Subtitle';
import hallstatt from './backgrounds/Hallstatt - Austria.jpg';
import hvitserkur from './backgrounds/Hvitserkur - Iceland.jpg';
import jacksonville from './backgrounds/Jacksonville - United States.jpg';
import moraineLake from './backgrounds/Moraine Lake, AB - Canada.jpg';

export default function ZoomSlider() {
  return (
    <HeroSlider>
      <Overlay>
        <Wrapper>
          <Title>Zoom Background Animations</Title>
          <Subtitle>
            The <code>backgroundAnimation</code> prop of the <code>Slide</code>{' '}
            child components is set to <code>zoom</code>.
          </Subtitle>
        </Wrapper>
      </Overlay>

      <Slide
        label="Hallstatt - Austria"
        background={{
          backgroundImage: hallstatt,
          backgroundAnimation: 'zoom'
        }}
      />

      <Slide
        label="Hvitserkur - Iceland"
        background={{
          backgroundImage: hvitserkur,
          backgroundAnimation: 'zoom'
        }}
      />

      <Slide
        label="Jacksonville - USA"
        background={{
          backgroundImage: jacksonville,
          backgroundAnimation: 'zoom'
        }}
      />

      <Slide
        label="Moraine Lake - Canada"
        background={{
          backgroundImage: moraineLake,
          backgroundAnimation: 'zoom'
        }}
      />

      <ButtonsNav
        isNullAfterThreshold
        position={{
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      />
      <Nav />
    </HeroSlider>
  );
}
