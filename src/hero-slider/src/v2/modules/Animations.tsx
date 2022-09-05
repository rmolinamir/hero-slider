import React from 'react';
import HeroSliderModuleCss from '../index.module.css';
import { useController } from './Controller';

enum SlidingAnimation {
  TOP_TO_BOTTOM = 'top_to_bottom',
  BOTTOM_TO_TOP = 'bottom_to_top',
  LEFT_TO_RIGHT = 'left_to_right',
  RIGHT_TO_LEFT = 'right_to_left',
  FADE = 'fade'
}

export interface AnimationsProps {
  initialSlidingAnimation?: `${SlidingAnimation}`;
  sliderFadeInDuration?: number;
  navbarFadeInDuration?: number;
  navbarFadeInDelay?: number;
  /**
   * When `true`, the `hero-slider` will know which animation should be set next. For example, if the user is selecting the next slide, the animation would be different to the one if the user had selected the previous slide. The animations will essentially be the same, but moving to different directions (e.g. left or right, or right to left).
   * @default true
   */
  shouldManageAnimationSequence?: boolean;
}

const getSlidingAnimationCssClass = (
  animation?: `${SlidingAnimation}`
): string => {
  switch (animation) {
    case SlidingAnimation.FADE:
      return HeroSliderModuleCss.Sliding_Fade_In;
    // Top to bottom.
    case SlidingAnimation.TOP_TO_BOTTOM:
      return HeroSliderModuleCss.Sliding_Top_To_Bottom;
    // Bottom to top.
    case SlidingAnimation.BOTTOM_TO_TOP:
      return HeroSliderModuleCss.Sliding_Bottom_To_Top;
    // Left to right.
    case SlidingAnimation.LEFT_TO_RIGHT:
      return HeroSliderModuleCss.Sliding_Left_To_Right;
    // Right to left, by default.
    case SlidingAnimation.RIGHT_TO_LEFT:
    default:
      return HeroSliderModuleCss.Sliding_Right_To_Left;
  }
};

type Action = { type: 'set-animation'; payload: SlidingAnimation };
type State = {
  activeSlidingAnimation: SlidingAnimation;
};
type ProviderProps = React.PropsWithChildren<{ animations?: AnimationsProps }>;

const defaultProps: Required<AnimationsProps> = {
  initialSlidingAnimation: SlidingAnimation.RIGHT_TO_LEFT,
  sliderFadeInDuration: 100,
  navbarFadeInDuration: 1000,
  navbarFadeInDelay: 500,
  shouldManageAnimationSequence: true
};

const AnimationsStateContext = React.createContext<
  | (Omit<
      Required<AnimationsProps>,
      'initialSlidingAnimation' | 'shouldManageAnimationSequence'
    > & {
      state: State;
      geSlidingAnimationCssClass(): string;
    })
  | undefined
>(undefined);

function animationsReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set-animation': {
      return { ...state, activeSlidingAnimation: action.payload };
    }
    default: {
      throw new Error(`Unhandled action: [${JSON.stringify(action, null, 2)}]`);
    }
  }
}

function AnimationsProvider({ children, animations }: ProviderProps) {
  const [state, dispatch] = React.useReducer(animationsReducer, {
    // TODO: This definitely depends on the `Orientation` module.
    activeSlidingAnimation:
      animations?.initialSlidingAnimation ||
      defaultProps.initialSlidingAnimation
  } as State);

  const { state: controller } = useController();

  /**
   * Sets the next animation depending on the current animation and a few other factors from the `Controller` module.
   * TODO: Get the `orientation` later from the Accessbilitiy module and then return the respective animations (horizontal/vertical).
   */
  const setNextAnimation = (): void => {
    switch (state.activeSlidingAnimation) {
      case SlidingAnimation.FADE:
        return;
      case SlidingAnimation.TOP_TO_BOTTOM:
      case SlidingAnimation.BOTTOM_TO_TOP:
        if (controller.slidingDirection === 'forward')
          dispatch({
            type: 'set-animation',
            payload: SlidingAnimation.BOTTOM_TO_TOP
          });
        else if (controller.slidingDirection === 'backward')
          dispatch({
            type: 'set-animation',
            payload: SlidingAnimation.TOP_TO_BOTTOM
          });
        else {
          const isSlidingForward =
            controller.activeSlide > controller.prevActiveSlide;
          if (isSlidingForward)
            dispatch({
              type: 'set-animation',
              payload: SlidingAnimation.BOTTOM_TO_TOP
            });
          else
            dispatch({
              type: 'set-animation',
              payload: SlidingAnimation.TOP_TO_BOTTOM
            });
        }
        break;
      case SlidingAnimation.RIGHT_TO_LEFT:
      case SlidingAnimation.LEFT_TO_RIGHT:
        if (controller.slidingDirection === 'forward')
          dispatch({
            type: 'set-animation',
            payload: SlidingAnimation.RIGHT_TO_LEFT
          });
        else if (controller.slidingDirection === 'backward')
          dispatch({
            type: 'set-animation',
            payload: SlidingAnimation.LEFT_TO_RIGHT
          });
        else {
          const isSlidingForward =
            controller.activeSlide > controller.prevActiveSlide;
          if (isSlidingForward)
            dispatch({
              type: 'set-animation',
              payload: SlidingAnimation.RIGHT_TO_LEFT
            });
          else
            dispatch({
              type: 'set-animation',
              payload: SlidingAnimation.LEFT_TO_RIGHT
            });
        }
        break;
    }
  };

  /**
   * Sets the next respective animation.
   */
  React.useEffect(() => {
    if (animations?.shouldManageAnimationSequence) setNextAnimation();
    return () => {};
  }, [controller.activeSlide]);

  const geSlidingAnimationCssClass = (): string => {
    return getSlidingAnimationCssClass(state.activeSlidingAnimation);
  };

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = {
    state,
    sliderFadeInDuration:
      animations?.sliderFadeInDuration || defaultProps.sliderFadeInDuration,
    navbarFadeInDuration:
      animations?.navbarFadeInDuration || defaultProps.navbarFadeInDuration,
    navbarFadeInDelay:
      animations?.navbarFadeInDelay || defaultProps.navbarFadeInDelay,
    geSlidingAnimationCssClass
  };

  return (
    <AnimationsStateContext.Provider value={value}>
      {children}
    </AnimationsStateContext.Provider>
  );
}

function useAnimations() {
  const context = React.useContext(AnimationsStateContext);

  if (context === undefined) {
    throw new Error('useAnimations must be used within a AnimationsProvider');
  }

  return context;
}

export { AnimationsProvider, useAnimations };
