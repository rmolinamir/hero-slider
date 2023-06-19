import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { mockIntersectionObserver } from 'jsdom-testing-mocks';

import HeroSlider, { AutoplayButton, Slide } from '../';
import { wait } from '../../tests/helpers/wait';
import { HeroSliderProps } from '../HeroSlider';

function TestSuiteSlider(props: HeroSliderProps = {}) {
  const { ...rest } = props;

  return (
    <HeroSlider {...rest}>
      <AutoplayButton />

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

const io = mockIntersectionObserver();

describe('autoplay and intersection observer', () => {
  afterEach(() => {
    cleanup();
  });

  test('autoplay does not begin unless slider is in view', async () => {
    const { getByTestId } = renderSlider({
      autoplay: {
        autoplayDuration: 25,
        autoplayDebounce: 0
      },
      controller: {
        initialSlide: 1,
        slidingDelay: 5,
        slidingDuration: 5
      }
    });

    const firstSlide = getByTestId('hero-slider-slide-1');
    const secondSlide = getByTestId('hero-slider-slide-2');

    expect(firstSlide).toBeVisible();
    expect(secondSlide).not.toBeVisible();

    await wait(50);

    expect(firstSlide).toBeVisible();
    expect(secondSlide).not.toBeVisible();
  });

  test('autoplay begins if slider is in view', async () => {
    const { getByTestId } = renderSlider({
      autoplay: {
        autoplayDuration: 25,
        autoplayDebounce: 0
      },
      controller: {
        initialSlide: 1,
        slidingDelay: 5,
        slidingDuration: 5
      }
    });

    const slider = getByTestId('hero-slider');

    const firstSlide = getByTestId('hero-slider-slide-1');
    const secondSlide = getByTestId('hero-slider-slide-2');

    expect(firstSlide).toBeVisible();
    expect(secondSlide).not.toBeVisible();

    io.enterNode(slider);

    await waitFor(() => {
      expect(firstSlide).toBeVisible();
      expect(secondSlide).not.toBeVisible();
    });
  });

  test('autoplay pauses if slider is out of view', async () => {
    const { getByTestId } = renderSlider({
      autoplay: {
        autoplayDuration: 80,
        autoplayDebounce: 0
      },
      controller: {
        initialSlide: 1,
        slidingDelay: 5,
        slidingDuration: 5
      }
    });

    const slider = getByTestId('hero-slider');

    const firstSlide = getByTestId('hero-slider-slide-1');
    const secondSlide = getByTestId('hero-slider-slide-2');

    expect(firstSlide).toBeVisible();
    expect(secondSlide).not.toBeVisible();

    io.enterNode(slider);

    await waitFor(() => {
      expect(firstSlide).not.toBeVisible();
      expect(secondSlide).toBeVisible();
    });

    io.leaveNode(slider);

    await wait(100);

    expect(firstSlide).not.toBeVisible();
    expect(secondSlide).toBeVisible();
  });

  test('autoplayDuration prop', async () => {
    const { getByTestId } = renderSlider({
      autoplay: {
        autoplayDuration: 100,
        autoplayDebounce: 0
      },
      controller: {
        initialSlide: 1,
        slidingDelay: 10,
        slidingDuration: 10
      }
    });

    const slider = getByTestId('hero-slider');

    const firstSlide = getByTestId('hero-slider-slide-1');
    const secondSlide = getByTestId('hero-slider-slide-2');

    expect(firstSlide).toBeVisible();
    expect(secondSlide).not.toBeVisible();

    io.enterNode(slider);

    await wait(75);

    expect(firstSlide).toBeVisible();
    expect(secondSlide).not.toBeVisible();

    await wait(75);

    expect(firstSlide).not.toBeVisible();
    expect(secondSlide).toBeVisible();
  });
});

describe('debounce', () => {
  afterEach(() => {
    cleanup();
  });

  test('autoplay will debounce if the user interacts with the slider', async () => {
    const { getByTestId } = renderSlider({
      autoplay: {
        autoplayDuration: 50,
        autoplayDebounce: 225
      },
      controller: {
        initialSlide: 1,
        slidingDelay: 15,
        slidingDuration: 15
      }
    });

    const slider = getByTestId('hero-slider');
    const wrapper = getByTestId('hero-slider-wrapper');

    const firstSlide = getByTestId('hero-slider-slide-1');
    const secondSlide = getByTestId('hero-slider-slide-2');

    expect(firstSlide).toBeVisible();
    expect(secondSlide).not.toBeVisible();

    io.enterNode(slider);

    // Wait a little bit then move the mouse over the slider.

    await wait(15);

    fireEvent.mouseMove(wrapper);

    expect(firstSlide).toBeVisible();
    expect(secondSlide).not.toBeVisible();

    // Wait a little bit then move the mouse over the slider again.

    await wait(75);

    expect(firstSlide).toBeVisible();
    expect(secondSlide).not.toBeVisible();

    // Wait a little bit then move the mouse over the slider again.

    await wait(75);

    expect(firstSlide).toBeVisible();
    expect(secondSlide).not.toBeVisible();

    fireEvent.mouseMove(slider);

    // Wait long enough for the debounce to expire and the slider to change.

    await waitFor(() => {
      expect(firstSlide).not.toBeVisible();
      expect(secondSlide).toBeVisible();
    });
  });
});

describe('autoplay commands', () => {
  afterEach(() => {
    cleanup();
  });

  test('pause', async () => {
    const { getByTestId } = renderSlider({
      autoplay: {
        autoplayDuration: 50,
        autoplayDebounce: 0
      },
      controller: {
        initialSlide: 1,
        slidingDelay: 15,
        slidingDuration: 15
      }
    });

    const slider = getByTestId('hero-slider');

    const autoplayButton = getByTestId('hero-slider-autoplay-button');

    const firstSlide = getByTestId('hero-slider-slide-1');
    const secondSlide = getByTestId('hero-slider-slide-2');

    expect(firstSlide).toBeVisible();
    expect(secondSlide).not.toBeVisible();

    io.enterNode(slider);

    await waitFor(() => {
      expect(firstSlide).not.toBeVisible();
      expect(secondSlide).toBeVisible();
    });

    fireEvent.click(autoplayButton);

    await wait(100);

    expect(firstSlide).not.toBeVisible();
    expect(secondSlide).toBeVisible();
  });

  test('resume', async () => {
    const { getByTestId } = renderSlider({
      autoplay: {
        autoplayDuration: 50,
        autoplayDebounce: 0
      },
      controller: {
        initialSlide: 1,
        slidingDelay: 15,
        slidingDuration: 15
      }
    });

    const slider = getByTestId('hero-slider');

    const autoplayButton = getByTestId('hero-slider-autoplay-button');

    const firstSlide = getByTestId('hero-slider-slide-1');
    const secondSlide = getByTestId('hero-slider-slide-2');

    expect(firstSlide).toBeVisible();
    expect(secondSlide).not.toBeVisible();

    io.enterNode(slider);

    await waitFor(() => {
      expect(firstSlide).not.toBeVisible();
      expect(secondSlide).toBeVisible();
    });

    // Pause the autoplay.

    fireEvent.click(autoplayButton);

    await wait(100);

    expect(firstSlide).not.toBeVisible();
    expect(secondSlide).toBeVisible();

    // Resume the autoplay.

    fireEvent.click(autoplayButton);

    await waitFor(() => {
      expect(firstSlide).toBeVisible();
      expect(secondSlide).not.toBeVisible();
    });
  });
});
