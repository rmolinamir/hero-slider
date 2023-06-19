import { cleanup, render } from '@testing-library/react';

import HeroSlider, { Slide } from '../';
import { intersectionObserverMock } from '../../tests/mocks/intersectionObserverMock';
import { HeroSliderProps } from '../HeroSlider';

function TestSuiteSlider(props: HeroSliderProps = {}) {
  const { ...rest } = props;

  return (
    <HeroSlider
      controller={{
        initialSlide: 1,
        slidingDuration: 1,
        slidingDelay: 1
      }}
      {...rest}
    >
      <Slide
        background={{
          backgroundImageSrc: 'https://picsum.photos/id/1018/1000/600/'
        }}
      />
      <Slide
        background={{
          backgroundImageSrc: 'https://picsum.photos/id/1015/1000/600/'
        }}
      />
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
    const { getByTestId } = renderSlider();

    expect(getByTestId('hero-slider')).toBeInTheDocument();

    expect(getByTestId('hero-slider-slide-1')).toBeInTheDocument();
    expect(getByTestId('hero-slider-slide-2')).toBeInTheDocument();
  });
});

describe('props', () => {
  afterEach(() => {
    cleanup();
  });

  test('sliderFadeInDuration', async () => {
    const { getByTestId } = renderSlider({
      animations: {
        sliderFadeInDuration: 100
      }
    });

    const wrapper = getByTestId('hero-slider-wrapper');

    expect(wrapper).toHaveStyle({
      '--slider-fade-in-duration': '100ms'
    });
  });

  test('navbarFadeInDuration', async () => {
    const { getByTestId } = renderSlider({
      animations: {
        navbarFadeInDuration: 100
      }
    });

    const wrapper = getByTestId('hero-slider-wrapper');

    expect(wrapper).toHaveStyle({
      '--nav-fade-in-duration': '100ms'
    });
  });

  test('navbarFadeInDelay', async () => {
    const { getByTestId } = renderSlider({
      animations: {
        navbarFadeInDelay: 100
      }
    });

    const wrapper = getByTestId('hero-slider-wrapper');

    expect(wrapper).toHaveStyle({
      '--nav-fade-in-delay': '100ms'
    });
  });
});
