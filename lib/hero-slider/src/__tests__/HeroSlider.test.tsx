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

  test('initial UI is rendered as expected', async () => {
    const { getByTestId, queryByTestId, queryByText } = renderSlider();

    expect(getByTestId('hero-slider')).toBeInTheDocument();

    expect(getByTestId('hero-slider-previous')).toBeInTheDocument();
    expect(getByTestId('hero-slider-previous-button')).toBeInTheDocument();
    expect(getByTestId('hero-slider-next')).toBeInTheDocument();
    expect(getByTestId('hero-slider-next-button')).toBeInTheDocument();

    expect(getByTestId('hero-slider-overlay')).toBeInTheDocument();
    expect(getByTestId('hero-slider-overlay')).toBeVisible();

    expect(getByTestId('hero-slider-slide-1')).toBeInTheDocument();
    expect(getByTestId('hero-slider-slide-2')).toBeInTheDocument();
    expect(getByTestId('hero-slider-slide-3')).toBeInTheDocument();
    expect(queryByTestId('hero-slider-slide-4')).not.toBeInTheDocument();

    expect(getByTestId('hero-slider-slide-1')).toBeVisible();
    expect(getByTestId('hero-slider-slide-2')).not.toBeVisible();
    expect(getByTestId('hero-slider-slide-3')).not.toBeVisible();

    expect(queryByText('First slide')).toBeInTheDocument();
    expect(queryByText('Second slide')).toBeInTheDocument();
    expect(queryByText('Third slide')).toBeInTheDocument();
  });
});
