import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';

import HeroSlider, { Overlay, Slide } from '../';
import { wait } from '../../tests/helpers/wait';
import { intersectionObserverMock } from '../../tests/mocks/intersectionObserverMock';
import { HeroSliderProps } from '../HeroSlider';

function TestSuiteSlider(props: HeroSliderProps = {}) {
  const goToNextSlidePointer = React.useRef<() => void>();
  const goToPreviousSlidePointer = React.useRef<() => void>();

  const { controller = {}, ...rest } = props;

  return (
    <HeroSlider
      controller={{
        initialSlide: 1,
        slidingDuration: 10,
        slidingDelay: 5,
        goToNextSlidePointer,
        goToPreviousSlidePointer,
        ...controller
      }}
      {...rest}
    >
      <Overlay>
        <button
          data-testid="custom-previous-button"
          onClick={() =>
            goToPreviousSlidePointer?.current &&
            goToPreviousSlidePointer.current()
          }
        />
        <button
          data-testid="custom-next-button"
          onClick={() =>
            goToNextSlidePointer?.current && goToNextSlidePointer.current()
          }
        />
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

  test('initial slide is the one specified in the controller', async () => {
    const { getByTestId } = renderSlider({ controller: { initialSlide: 2 } });

    expect(getByTestId('hero-slider-slide-1')).not.toBeVisible();
    expect(getByTestId('hero-slider-slide-2')).toBeVisible();
    expect(getByTestId('hero-slider-slide-3')).not.toBeVisible();
  });
});

describe('pressing the next button should slide to the next slide', () => {
  let renderResult: ReturnType<typeof renderSlider>;
  let nextButton: HTMLElement;
  let firstSlide: HTMLElement;
  let secondSlide: HTMLElement;
  let thirdSlide: HTMLElement;

  beforeAll(() => {
    renderResult = renderSlider();

    const { getByTestId } = renderResult;

    nextButton = getByTestId('hero-slider-next-button');

    firstSlide = getByTestId('hero-slider-slide-1');
    secondSlide = getByTestId('hero-slider-slide-2');
    thirdSlide = getByTestId('hero-slider-slide-3');
  });

  afterAll(() => {
    cleanup();
  });

  test('necessary elements are rendered', () => {
    expect(nextButton).toBeInTheDocument();

    expect(firstSlide).toBeVisible();
    expect(secondSlide).not.toBeVisible();
    expect(thirdSlide).not.toBeVisible();
  });

  // NOTE:
  // Only two slides (previous and active) will be visible during transitions,
  // and only the active slide will be visible afterwards.

  test('first slide -> second slide', async () => {
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(firstSlide).toBeVisible();
      expect(secondSlide).toBeVisible();
      expect(thirdSlide).not.toBeVisible();
    });

    await waitFor(() => {
      expect(firstSlide).not.toBeVisible();
      expect(secondSlide).toBeVisible();
      expect(thirdSlide).not.toBeVisible();
    });
  });

  test('second slide -> third slide', async () => {
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(firstSlide).not.toBeVisible();
      expect(secondSlide).toBeVisible();
      expect(thirdSlide).toBeVisible();
    });

    await waitFor(() => {
      expect(firstSlide).not.toBeVisible();
      expect(secondSlide).not.toBeVisible();
      expect(thirdSlide).toBeVisible();
    });
  });

  test('third slide -> first slide', async () => {
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(firstSlide).toBeVisible();
      expect(secondSlide).not.toBeVisible();
      expect(thirdSlide).toBeVisible();
    });

    await waitFor(() => {
      expect(firstSlide).toBeVisible();
      expect(secondSlide).not.toBeVisible();
      expect(thirdSlide).not.toBeVisible();
    });
  });
});

describe('pressing the previous button should slide to the previous slide', () => {
  let renderResult: ReturnType<typeof renderSlider>;
  let prevButton: HTMLElement;
  let firstSlide: HTMLElement;
  let secondSlide: HTMLElement;
  let thirdSlide: HTMLElement;

  beforeAll(() => {
    renderResult = renderSlider();

    const { getByTestId } = renderResult;

    prevButton = getByTestId('hero-slider-previous-button');

    firstSlide = getByTestId('hero-slider-slide-1');
    secondSlide = getByTestId('hero-slider-slide-2');
    thirdSlide = getByTestId('hero-slider-slide-3');
  });

  afterAll(() => {
    cleanup();
  });

  test('necessary elements are rendered', () => {
    expect(prevButton).toBeInTheDocument();

    expect(firstSlide).toBeVisible();
    expect(secondSlide).not.toBeVisible();
    expect(thirdSlide).not.toBeVisible();
  });

  // NOTE:
  // Only two slides (previous and active) will be visible during transitions,
  // and only the active slide will be visible afterwards.

  test('first slide -> third slide', async () => {
    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(firstSlide).toBeVisible();
      expect(secondSlide).not.toBeVisible();
      expect(thirdSlide).toBeVisible();
    });

    await waitFor(() => {
      expect(firstSlide).not.toBeVisible();
      expect(secondSlide).not.toBeVisible();
      expect(thirdSlide).toBeVisible();
    });
  });

  test('third slide -> second slide', async () => {
    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(firstSlide).not.toBeVisible();
      expect(secondSlide).toBeVisible();
      expect(thirdSlide).toBeVisible();
    });

    await waitFor(() => {
      expect(firstSlide).not.toBeVisible();
      expect(secondSlide).toBeVisible();
      expect(thirdSlide).not.toBeVisible();
    });
  });

  test('second slide -> first slide', async () => {
    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(firstSlide).toBeVisible();
      expect(secondSlide).toBeVisible();
      expect(thirdSlide).not.toBeVisible();
    });

    await waitFor(() => {
      expect(firstSlide).toBeVisible();
      expect(secondSlide).not.toBeVisible();
      expect(thirdSlide).not.toBeVisible();
    });
  });
});

describe('sliding duration and sliding delay', () => {
  afterEach(() => {
    cleanup();
  });

  test('sliding duration works as expected', async () => {
    const { getByTestId } = renderSlider({
      controller: { slidingDuration: 500, slidingDelay: 0 }
    });

    const nextButton = getByTestId('hero-slider-next-button');

    const firstSlide = getByTestId('hero-slider-slide-1');
    const secondSlide = getByTestId('hero-slider-slide-2');

    expect(firstSlide).toBeVisible();
    expect(secondSlide).not.toBeVisible();

    fireEvent.click(nextButton);

    await wait(300);

    expect(firstSlide).toBeVisible();
    expect(secondSlide).toBeVisible();

    await wait(300);

    expect(firstSlide).not.toBeVisible();
    expect(secondSlide).toBeVisible();
  });

  test('sliding delay works as expected', async () => {
    const { getByTestId } = renderSlider({
      controller: { slidingDelay: 500, slidingDuration: 0 }
    });

    const nextButton = getByTestId('hero-slider-next-button');

    const firstSlide = getByTestId('hero-slider-slide-1');
    const secondSlide = getByTestId('hero-slider-slide-2');

    expect(firstSlide).toBeVisible();
    expect(secondSlide).not.toBeVisible();

    fireEvent.click(nextButton);

    await wait(300);

    expect(firstSlide).toBeVisible();
    expect(secondSlide).toBeVisible();

    await wait(300);

    expect(firstSlide).not.toBeVisible();
    expect(secondSlide).toBeVisible();
  });

  test('sliding duration and sliding delay work together as expected', async () => {
    const { getByTestId } = renderSlider({
      controller: { slidingDelay: 250, slidingDuration: 250 }
    });

    const nextButton = getByTestId('hero-slider-next-button');

    const firstSlide = getByTestId('hero-slider-slide-1');
    const secondSlide = getByTestId('hero-slider-slide-2');

    expect(firstSlide).toBeVisible();
    expect(secondSlide).not.toBeVisible();

    fireEvent.click(nextButton);

    await wait(300);

    expect(firstSlide).toBeVisible();
    expect(secondSlide).toBeVisible();

    await wait(300);

    expect(firstSlide).not.toBeVisible();
    expect(secondSlide).toBeVisible();
  });
});

describe('sliding callbacks', () => {
  afterEach(() => {
    cleanup();
  });

  test('onBeforeSliding and onSliding are called as expected', async () => {
    const onBeforeSliding = jest.fn();
    const onSliding = jest.fn();
    const onAfterSliding = jest.fn();

    const { getByTestId } = renderSlider({
      controller: {
        onBeforeSliding,
        onSliding,
        onAfterSliding,
        slidingDuration: 10,
        slidingDelay: 0
      }
    });

    onBeforeSliding.mockClear();
    onSliding.mockClear();
    onAfterSliding.mockClear();

    const nextButton = getByTestId('hero-slider-next-button');

    fireEvent.click(nextButton);

    await wait(100);

    expect(onBeforeSliding).toBeCalledTimes(1);
    expect(onSliding).toBeCalledTimes(1);
    expect(onAfterSliding).toBeCalledTimes(1);
  });
});

describe('goToNextSlidePointer and goToPreviousSlidePointer', () => {
  afterEach(() => {
    cleanup();
  });

  test('goToNextSlidePointer and goToPreviousSlidePointer work as expected', async () => {
    const { getByTestId } = renderSlider({
      controller: {
        slidingDuration: 10,
        slidingDelay: 0
      }
    });

    const nextButton = getByTestId('custom-next-button');
    const prevButton = getByTestId('custom-previous-button');

    const firstSlide = getByTestId('hero-slider-slide-1');
    const secondSlide = getByTestId('hero-slider-slide-2');
    const thirdSlide = getByTestId('hero-slider-slide-3');

    expect(firstSlide).toBeVisible();
    expect(secondSlide).not.toBeVisible();
    expect(thirdSlide).not.toBeVisible();

    fireEvent.click(nextButton);

    await wait(25);

    expect(firstSlide).not.toBeVisible();
    expect(secondSlide).toBeVisible();
    expect(thirdSlide).not.toBeVisible();

    fireEvent.click(prevButton);

    await wait(25);

    expect(firstSlide).toBeVisible();
    expect(secondSlide).not.toBeVisible();
    expect(thirdSlide).not.toBeVisible();
  });
});
