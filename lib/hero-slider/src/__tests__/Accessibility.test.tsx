import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';

import HeroSlider, { Slide } from '../';
import { intersectionObserverMock } from '../../tests/mocks/intersectionObserverMock';
import { HeroSliderProps } from '../HeroSlider';

function TestSuiteSlider(props: HeroSliderProps = {}) {
  const { controller = {}, ...rest } = props;

  return (
    <HeroSlider
      controller={{
        initialSlide: 1,
        slidingDuration: 1,
        slidingDelay: 1,
        ...controller
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

  test('should render buttons if shouldDisplayButtons is true', async () => {
    const { getByTestId } = renderSlider({
      accessibility: { shouldDisplayButtons: true }
    });

    expect(getByTestId('hero-slider-previous')).toBeInTheDocument();
    expect(getByTestId('hero-slider-previous-button')).toBeInTheDocument();
    expect(getByTestId('hero-slider-next')).toBeInTheDocument();
    expect(getByTestId('hero-slider-next-button')).toBeInTheDocument();
  });

  test('should not render buttons if shouldDisplayButtons is false', async () => {
    const { queryByTestId } = renderSlider({
      accessibility: { shouldDisplayButtons: false }
    });

    expect(queryByTestId('hero-slider-previous')).not.toBeInTheDocument();
    expect(
      queryByTestId('hero-slider-previous-button')
    ).not.toBeInTheDocument();
    expect(queryByTestId('hero-slider-next')).not.toBeInTheDocument();
    expect(queryByTestId('hero-slider-next-button')).not.toBeInTheDocument();
  });
});

describe('accessibility', () => {
  afterEach(() => {
    cleanup();
  });

  describe('shouldSlideOnArrowKeypress', () => {
    test('should not slide if shouldSlideOnArrowKeypress is false', async () => {
      const { getByTestId } = renderSlider({
        accessibility: { shouldSlideOnArrowKeypress: false }
      });

      const firstSlide = getByTestId('hero-slider-slide-1');
      const secondSlide = getByTestId('hero-slider-slide-2');

      expect(firstSlide).toBeVisible();
      expect(secondSlide).not.toBeVisible();

      fireEvent.keyDown(window, { key: 'ArrowRight', code: 39 });

      await waitFor(() => {
        expect(firstSlide).toBeVisible();
        expect(secondSlide).not.toBeVisible();
      });

      fireEvent.keyDown(window, { key: 'ArrowLeft', code: 37 });

      await waitFor(() => {
        expect(firstSlide).toBeVisible();
        expect(secondSlide).not.toBeVisible();
      });
    });
  });

  describe('thresholdToSlide', () => {
    test('should not slide if the swipe distance is less than the thresholdToSlide', async () => {
      const { getByTestId } = renderSlider({
        accessibility: { thresholdToSlide: 100 }
      });

      const wrapper = getByTestId('hero-slider-wrapper');

      const firstSlide = getByTestId('hero-slider-slide-1');
      const secondSlide = getByTestId('hero-slider-slide-2');

      expect(firstSlide).toBeVisible();
      expect(secondSlide).not.toBeVisible();

      fireEvent.touchStart(wrapper, {
        touches: [{ clientX: 0, clientY: 0 }]
      });
      fireEvent.touchMove(wrapper, {
        touches: [{ clientX: -50, clientY: 0 }]
      });
      fireEvent.touchEnd(wrapper);

      await waitFor(() => {
        expect(firstSlide).toBeVisible();
        expect(secondSlide).not.toBeVisible();
      });
    });

    test('should slide if the swipe distance is more than the thresholdToSlide', async () => {
      const { getByTestId } = renderSlider({
        accessibility: { thresholdToSlide: 100 }
      });

      const wrapper = getByTestId('hero-slider-wrapper');

      const firstSlide = getByTestId('hero-slider-slide-1');
      const secondSlide = getByTestId('hero-slider-slide-2');

      expect(firstSlide).toBeVisible();
      expect(secondSlide).not.toBeVisible();

      fireEvent.touchStart(wrapper, {
        touches: [{ clientX: 0, clientY: 0 }]
      });
      fireEvent.touchMove(wrapper, {
        touches: [{ clientX: -150, clientY: 0 }]
      });
      fireEvent.touchEnd(wrapper);

      await waitFor(() => {
        expect(firstSlide).toBeVisible();
        expect(secondSlide).toBeVisible();
      });

      await waitFor(() => {
        expect(firstSlide).not.toBeVisible();
        expect(secondSlide).toBeVisible();
      });
    });
  });

  describe('horizontal orientation', () => {
    describe('arrow keys', () => {
      test('right arrow slides to the next slide', async () => {
        const { getByTestId } = renderSlider({
          accessibility: { shouldSlideOnArrowKeypress: true }
        });

        const firstSlide = getByTestId('hero-slider-slide-1');
        const secondSlide = getByTestId('hero-slider-slide-2');

        expect(firstSlide).toBeVisible();
        expect(secondSlide).not.toBeVisible();

        fireEvent.keyDown(window, { key: 'ArrowRight', code: 39 });

        await waitFor(() => {
          expect(firstSlide).toBeVisible();
          expect(secondSlide).toBeVisible();
        });

        await waitFor(() => {
          expect(firstSlide).not.toBeVisible();
          expect(secondSlide).toBeVisible();
        });
      });

      test('left arrow slides to the previous slide', async () => {
        const { getByTestId } = renderSlider({
          controller: { initialSlide: 2 },
          accessibility: { shouldSlideOnArrowKeypress: true }
        });

        const firstSlide = getByTestId('hero-slider-slide-1');
        const secondSlide = getByTestId('hero-slider-slide-2');

        expect(firstSlide).not.toBeVisible();
        expect(secondSlide).toBeVisible();

        fireEvent.keyDown(window, { key: 'ArrowLeft', code: 37 });

        await waitFor(() => {
          expect(firstSlide).toBeVisible();
          expect(secondSlide).toBeVisible();
        });

        await waitFor(() => {
          expect(firstSlide).toBeVisible();
          expect(secondSlide).not.toBeVisible();
        });
      });

      test('up arrow does not slide', async () => {
        const { getByTestId } = renderSlider({
          accessibility: { shouldSlideOnArrowKeypress: true }
        });

        const firstSlide = getByTestId('hero-slider-slide-1');
        const secondSlide = getByTestId('hero-slider-slide-2');

        expect(firstSlide).toBeVisible();
        expect(secondSlide).not.toBeVisible();

        fireEvent.keyDown(window, { key: 'ArrowUp', code: 38 });

        await waitFor(() => {
          expect(firstSlide).toBeVisible();
          expect(secondSlide).not.toBeVisible();
        });
      });

      test('down arrow does not slide', async () => {
        const { getByTestId } = renderSlider({
          accessibility: { shouldSlideOnArrowKeypress: true }
        });

        const firstSlide = getByTestId('hero-slider-slide-1');
        const secondSlide = getByTestId('hero-slider-slide-2');

        expect(firstSlide).toBeVisible();
        expect(secondSlide).not.toBeVisible();

        fireEvent.keyDown(window, { key: 'ArrowDown', code: 40 });

        await waitFor(() => {
          expect(firstSlide).toBeVisible();
          expect(secondSlide).not.toBeVisible();
        });
      });
    });

    describe('swiping', () => {
      test('swiping left slides to the next slide', async () => {
        const { getByTestId } = renderSlider({
          accessibility: { thresholdToSlide: 0 }
        });

        const wrapper = getByTestId('hero-slider-wrapper');

        const firstSlide = getByTestId('hero-slider-slide-1');
        const secondSlide = getByTestId('hero-slider-slide-2');

        expect(firstSlide).toBeVisible();
        expect(secondSlide).not.toBeVisible();

        fireEvent.touchStart(wrapper, {
          touches: [{ clientX: 0, clientY: 0 }]
        });
        fireEvent.touchMove(wrapper, {
          touches: [{ clientX: -50, clientY: 0 }]
        });
        fireEvent.touchEnd(wrapper);

        await waitFor(() => {
          expect(firstSlide).toBeVisible();
          expect(secondSlide).toBeVisible();
        });

        await waitFor(() => {
          expect(firstSlide).not.toBeVisible();
          expect(secondSlide).toBeVisible();
        });
      });

      test('swiping right slides to the previous slide', async () => {
        const { getByTestId } = renderSlider({
          controller: { initialSlide: 2 },
          accessibility: { thresholdToSlide: 0 }
        });

        const wrapper = getByTestId('hero-slider-wrapper');

        const firstSlide = getByTestId('hero-slider-slide-1');
        const secondSlide = getByTestId('hero-slider-slide-2');

        expect(firstSlide).not.toBeVisible();
        expect(secondSlide).toBeVisible();

        fireEvent.touchStart(wrapper, {
          touches: [{ clientX: 0, clientY: 0 }]
        });
        fireEvent.touchMove(wrapper, {
          touches: [{ clientX: 50, clientY: 0 }]
        });
        fireEvent.touchEnd(wrapper);

        await waitFor(() => {
          expect(firstSlide).toBeVisible();
          expect(secondSlide).toBeVisible();
        });

        await waitFor(() => {
          expect(firstSlide).toBeVisible();
          expect(secondSlide).not.toBeVisible();
        });
      });

      test('swiping up does not slide', async () => {
        const { getByTestId } = renderSlider({
          controller: { initialSlide: 2 },
          accessibility: { thresholdToSlide: 0 }
        });

        const wrapper = getByTestId('hero-slider-wrapper');

        const firstSlide = getByTestId('hero-slider-slide-1');
        const secondSlide = getByTestId('hero-slider-slide-2');

        expect(firstSlide).not.toBeVisible();
        expect(secondSlide).toBeVisible();

        fireEvent.touchStart(wrapper, {
          touches: [{ clientX: 0, clientY: 0 }]
        });
        fireEvent.touchMove(wrapper, {
          touches: [{ clientX: 0, clientY: 50 }]
        });
        fireEvent.touchEnd(wrapper);

        await waitFor(() => {
          expect(firstSlide).not.toBeVisible();
          expect(secondSlide).toBeVisible();
        });
      });

      test('swiping down does not slide', async () => {
        const { getByTestId } = renderSlider({
          controller: { initialSlide: 2 },
          accessibility: { thresholdToSlide: 0 }
        });

        const wrapper = getByTestId('hero-slider-wrapper');

        const firstSlide = getByTestId('hero-slider-slide-1');
        const secondSlide = getByTestId('hero-slider-slide-2');

        expect(firstSlide).not.toBeVisible();
        expect(secondSlide).toBeVisible();

        fireEvent.touchStart(wrapper, {
          touches: [{ clientX: 0, clientY: 0 }]
        });
        fireEvent.touchMove(wrapper, {
          touches: [{ clientX: 0, clientY: -50 }]
        });
        fireEvent.touchEnd(wrapper);

        await waitFor(() => {
          expect(firstSlide).not.toBeVisible();
          expect(secondSlide).toBeVisible();
        });
      });
    });
  });

  describe('vertical orientation', () => {
    describe('arrow keys', () => {
      test('up arrow slides to the previous slide', async () => {
        const { getByTestId } = renderSlider({
          controller: { initialSlide: 2 },
          accessibility: {
            shouldSlideOnArrowKeypress: true,
            orientation: 'vertical'
          }
        });

        const firstSlide = getByTestId('hero-slider-slide-1');
        const secondSlide = getByTestId('hero-slider-slide-2');

        expect(firstSlide).not.toBeVisible();
        expect(secondSlide).toBeVisible();

        fireEvent.keyDown(window, { key: 'ArrowUp', code: 38 });

        await waitFor(() => {
          expect(firstSlide).toBeVisible();
          expect(secondSlide).toBeVisible();
        });

        await waitFor(() => {
          expect(firstSlide).toBeVisible();
          expect(secondSlide).not.toBeVisible();
        });
      });

      test('down arrow slides to the next slide', async () => {
        const { getByTestId } = renderSlider({
          accessibility: {
            shouldSlideOnArrowKeypress: true,
            orientation: 'vertical'
          }
        });

        const firstSlide = getByTestId('hero-slider-slide-1');
        const secondSlide = getByTestId('hero-slider-slide-2');

        expect(firstSlide).toBeVisible();
        expect(secondSlide).not.toBeVisible();

        fireEvent.keyDown(window, { key: 'ArrowDown', code: 40 });

        await waitFor(() => {
          expect(firstSlide).toBeVisible();
          expect(secondSlide).toBeVisible();
        });

        await waitFor(() => {
          expect(firstSlide).not.toBeVisible();
          expect(secondSlide).toBeVisible();
        });
      });

      test('left arrow does not slide', async () => {
        const { getByTestId } = renderSlider({
          accessibility: {
            shouldSlideOnArrowKeypress: true,
            orientation: 'vertical'
          }
        });

        const firstSlide = getByTestId('hero-slider-slide-1');
        const secondSlide = getByTestId('hero-slider-slide-2');

        expect(firstSlide).toBeVisible();
        expect(secondSlide).not.toBeVisible();

        fireEvent.keyDown(window, { key: 'ArrowLeft', code: 37 });

        await waitFor(() => {
          expect(firstSlide).toBeVisible();
          expect(secondSlide).not.toBeVisible();
        });
      });

      test('right arrow does not slide', async () => {
        const { getByTestId } = renderSlider({
          accessibility: {
            shouldSlideOnArrowKeypress: true,
            orientation: 'vertical'
          }
        });

        const firstSlide = getByTestId('hero-slider-slide-1');
        const secondSlide = getByTestId('hero-slider-slide-2');

        expect(firstSlide).toBeVisible();
        expect(secondSlide).not.toBeVisible();

        fireEvent.keyDown(window, { key: 'ArrowRight', code: 39 });

        await waitFor(() => {
          expect(firstSlide).toBeVisible();
          expect(secondSlide).not.toBeVisible();
        });
      });
    });

    describe('swiping', () => {
      test('swiping up slides to the previous slide', async () => {
        const { getByTestId } = renderSlider({
          controller: { initialSlide: 2 },
          accessibility: {
            orientation: 'vertical',
            thresholdToSlide: 0
          }
        });

        const wrapper = getByTestId('hero-slider-wrapper');

        const firstSlide = getByTestId('hero-slider-slide-1');
        const secondSlide = getByTestId('hero-slider-slide-2');

        expect(firstSlide).not.toBeVisible();
        expect(secondSlide).toBeVisible();

        fireEvent.touchStart(wrapper, {
          touches: [{ clientX: 0, clientY: 0 }]
        });
        fireEvent.touchMove(wrapper, {
          touches: [{ clientX: 0, clientY: 50 }]
        });
        fireEvent.touchEnd(wrapper);

        await waitFor(() => {
          expect(firstSlide).toBeVisible();
          expect(secondSlide).toBeVisible();
        });

        await waitFor(() => {
          expect(firstSlide).toBeVisible();
          expect(secondSlide).not.toBeVisible();
        });
      });

      test('swiping down slides to the next slide', async () => {
        const { getByTestId } = renderSlider({
          accessibility: {
            orientation: 'vertical',
            thresholdToSlide: 0
          }
        });

        const wrapper = getByTestId('hero-slider-wrapper');

        const firstSlide = getByTestId('hero-slider-slide-1');
        const secondSlide = getByTestId('hero-slider-slide-2');

        expect(firstSlide).toBeVisible();
        expect(secondSlide).not.toBeVisible();

        fireEvent.touchStart(wrapper, {
          touches: [{ clientX: 0, clientY: 0 }]
        });
        fireEvent.touchMove(wrapper, {
          touches: [{ clientX: 0, clientY: -50 }]
        });
        fireEvent.touchEnd(wrapper);

        await waitFor(() => {
          expect(firstSlide).toBeVisible();
          expect(secondSlide).toBeVisible();
        });

        await waitFor(() => {
          expect(firstSlide).not.toBeVisible();
          expect(secondSlide).toBeVisible();
        });
      });

      test('swiping left does not slide', async () => {
        const { getByTestId } = renderSlider({
          controller: { initialSlide: 2 },
          accessibility: {
            orientation: 'vertical',
            thresholdToSlide: 0
          }
        });

        const wrapper = getByTestId('hero-slider-wrapper');

        const firstSlide = getByTestId('hero-slider-slide-1');
        const secondSlide = getByTestId('hero-slider-slide-2');

        expect(firstSlide).not.toBeVisible();
        expect(secondSlide).toBeVisible();

        fireEvent.touchStart(wrapper, {
          touches: [{ clientX: 0, clientY: 0 }]
        });
        fireEvent.touchMove(wrapper, {
          touches: [{ clientX: -50, clientY: 0 }]
        });
        fireEvent.touchEnd(wrapper);

        await waitFor(() => {
          expect(firstSlide).not.toBeVisible();
          expect(secondSlide).toBeVisible();
        });
      });

      test('swiping right does not slide', async () => {
        const { getByTestId } = renderSlider({
          controller: { initialSlide: 2 },
          accessibility: {
            orientation: 'vertical',
            thresholdToSlide: 0
          }
        });

        const wrapper = getByTestId('hero-slider-wrapper');

        const firstSlide = getByTestId('hero-slider-slide-1');
        const secondSlide = getByTestId('hero-slider-slide-2');

        expect(firstSlide).not.toBeVisible();
        expect(secondSlide).toBeVisible();

        fireEvent.touchStart(wrapper, {
          touches: [{ clientX: 0, clientY: 0 }]
        });
        fireEvent.touchMove(wrapper, {
          touches: [{ clientX: 50, clientY: 0 }]
        });
        fireEvent.touchEnd(wrapper);

        await waitFor(() => {
          expect(firstSlide).not.toBeVisible();
          expect(secondSlide).toBeVisible();
        });
      });
    });
  });
});
