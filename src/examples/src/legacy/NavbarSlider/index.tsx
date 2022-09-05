import { legacy } from 'hero-slider';
import Navbar from '../../ui/Navbar';
import Wrapper from '../../ui/Wrapper';
import Title from '../../ui/Title';
import Subtitle from '../../ui/Subtitle';
import kyoto from './backgrounds/Kyoto - Japan.jpg';
import tenryuJiTemple from './backgrounds/Tenryu-ji Temple - Kyōto-shi - Japan.jpg';
import hakone from './backgrounds/Hakone - Japan.jpg';
import byodoInTemple from './backgrounds/Byodo-In Temple - Kaneohe - United States.jpg';

const { default: HeroSlider, Slide, Container, MenuNav } = legacy;

const app = () => {
  // const nextSlideHandler = React.useRef();
  // const previousSlideHandler = React.useRef();

  return (
    <HeroSlider
      slidingAnimation="top_to_bottom"
      orientation="vertical"
      initialSlide={1}
      onBeforeChange={(previousSlide: number, nextSlide: number) =>
        console.log('onBeforeChange', previousSlide, nextSlide)
      }
      onChange={(nextSlide: number) => console.log('onChange', nextSlide)}
      onAfterChange={(nextSlide: number) =>
        console.log('onAfterChange', nextSlide)
      }
      style={{
        backgroundColor: '#000'
      }}
      settings={{
        slidingDuration: 400,
        slidingDelay: 100,
        shouldAutoplay: true,
        shouldDisplayButtons: false,
        autoplayDuration: 800000000,
        height: '100vh'
      }}
    >
      <Container>
        <Navbar />
        <Wrapper>
          <Title>Navbar Slider</Title>
          <Subtitle>Cool stuff.</Subtitle>
        </Wrapper>
      </Container>

      <Slide
        shouldRenderMask
        navDescription="Kyoto - Japan"
        background={{
          backgroundColor: '#6D9B98',
          backgroundImage: kyoto
        }}
      />

      <Slide
        shouldRenderMask
        navDescription="Tenryu-ji Temple - KyÅto-shi - Japan"
        background={{
          backgroundColor: '#8A8A8A',
          backgroundImage: tenryuJiTemple
        }}
      />

      <Slide
        shouldRenderMask
        navDescription="Hakone - Japan"
        background={{
          backgroundColor: '#EA2329',
          backgroundImage: hakone
        }}
      />

      <Slide
        shouldRenderMask
        navDescription="Byodo-In Temple - Kaneohe - United States"
        background={{
          backgroundColor: '#2D7791',
          backgroundImage: byodoInTemple
        }}
      />

      <MenuNav />
    </HeroSlider>
  );
};

export default app;
