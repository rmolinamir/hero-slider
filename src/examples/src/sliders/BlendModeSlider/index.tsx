import HeroSlider, { Slide, ButtonsNav, SideNav, Overlay } from 'hero-slider';
import rockyWaterfall from './backgrounds/Rocky Waterfall.jpg';
import palauPacificOcean from './backgrounds/Palau - Pacific Ocean.jpg';
import queposCostaRica from './backgrounds/Quepos - Costa Rica.jpg';
import mountainView from './backgrounds/MountainView.jpg';
import Wrapper from '../../ui/Wrapper';
import Title from '../../ui/Title';
import Subtitle from '../../ui/Subtitle';

export default function BlendModeSlider() {
  return (
    <HeroSlider
      height="100vh"
      animations={{
        slidingAnimation: 'fade'
      }}
      controller={{
        slidingDuration: 400,
        slidingDelay: 100
      }}
      style={{
        backgroundColor: '#000'
      }}
    >
      <Overlay>
        <Wrapper>
          <Title>Blend Mode</Title>
          <Subtitle>
            The <code>backgroundBlendMode</code> of the <code>Slide</code>{' '}
            component is set to <code>luminosity</code>.
          </Subtitle>
          <Subtitle>
            The <code>shouldRenderMask</code> prop of the <code>Slide</code> is
            set to <code>true</code>.
          </Subtitle>
        </Wrapper>
      </Overlay>

      <Slide
        shouldRenderMask
        label="Rocky Waterfall"
        background={{
          backgroundColor: '#2D7791',
          backgroundBlendMode: 'luminosity',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: rockyWaterfall
        }}
      />

      <Slide
        shouldRenderMask
        label="Palau - Pacific Ocean"
        background={{
          backgroundColor: '#8A8A8A',
          backgroundBlendMode: 'luminosity',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: palauPacificOcean
        }}
      />

      <Slide
        shouldRenderMask
        label="Quepos - Costa Rica"
        background={{
          backgroundColor: '#EA2329',
          backgroundBlendMode: 'luminosity',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: queposCostaRica
        }}
      />

      <Slide
        shouldRenderMask
        label="Mountain View"
        background={{
          backgroundColor: '#6D9B98',
          backgroundBlendMode: 'luminosity',
          maskBackgroundBlendMode: 'luminosity',
          backgroundImage: mountainView
        }}
      />

      <ButtonsNav />

      <SideNav
        position={{
          top: '0',
          right: '0'
        }}
      />
    </HeroSlider>
  );
}
