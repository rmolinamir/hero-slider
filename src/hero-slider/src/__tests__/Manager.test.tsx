import { cleanup, render } from '@testing-library/react';

import HeroSlider, { Overlay, Slide } from '../';
import { intersectionObserverMock } from '../../tests/mocks/intersectionObserverMock';
import { HeroSliderProps } from '../HeroSlider';

function TestSuiteSlider(props: HeroSliderProps = {}) {
  const { controller = {}, ...rest } = props;

  return (
    <HeroSlider
      controller={{
        initialSlide: 1,
        slidingDuration: 10,
        slidingDelay: 5,
        ...controller
      }}
      {...rest}
    >
      <Overlay>
        <div>Overlay</div>
      </Overlay>

      <Slide
        background={{
          backgroundImageSrc: 'https://picsum.photos/id/1018/1000/600/'
        }}
      >
        First slide
      </Slide>
      <Slide
        background={{
          backgroundImageSrc: 'https://picsum.photos/id/1015/1000/600/'
        }}
      >
        Second slide
      </Slide>
      <Slide
        background={{
          backgroundImageSrc: 'https://picsum.photos/id/1019/1000/600/'
        }}
      >
        Third slide
      </Slide>
    </HeroSlider>
  );
}

const renderSlider = (props?: HeroSliderProps) =>
  render(<TestSuiteSlider {...props} />);

beforeAll(() => {
  intersectionObserverMock();
});

describe('render', () => {
  afterEach(() => {
    cleanup();
  });

  test('should not render buttons if isMobile is true', async () => {
    const { queryByTestId } = renderSlider({ manager: { isMobile: true } });

    expect(queryByTestId('hero-slider-previous')).not.toBeInTheDocument();
    expect(
      queryByTestId('hero-slider-previous-button')
    ).not.toBeInTheDocument();
    expect(queryByTestId('hero-slider-next')).not.toBeInTheDocument();
    expect(queryByTestId('hero-slider-next-button')).not.toBeInTheDocument();
  });

  test('should render buttons if isMobile is false', async () => {
    const { queryByTestId } = renderSlider({ manager: { isMobile: false } });

    expect(queryByTestId('hero-slider-previous')).toBeInTheDocument();
    expect(queryByTestId('hero-slider-previous-button')).toBeInTheDocument();
    expect(queryByTestId('hero-slider-next')).toBeInTheDocument();
    expect(queryByTestId('hero-slider-next-button')).toBeInTheDocument();
  });
});
