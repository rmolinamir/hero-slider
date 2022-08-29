import React from 'react';
import { isMobile as setDefaultIsMobile } from '../../dependencies/isMobile';
import {
  ISliderContext,
  ISliderProviderProps,
  EActionTypes,
  IReducerState,
  IReducerAction
} from './typings';

const initialContext: ISliderContext = {
  isMobile: undefined,
  slidesArray: [],
  slideProps: undefined,
  navProps: undefined,
  autoplayButtonProps: undefined,
  dispatchProps: () => undefined
};
const { useState, useEffect, useReducer } = React;

export const SliderContext = React.createContext(initialContext);

const reducer = (
  state: IReducerState,
  action: IReducerAction
): IReducerState => {
  const newState = { ...state };
  switch (action.type) {
    case EActionTypes.SET_SLIDE_DATA: {
      const { payload } = action;
      const { slideNumber, navDescription } = payload;
      if (
        !newState.slidesArray.find(
          ({ slideNumber: number }) => number === slideNumber
        )
      ) {
        newState.slidesArray.push({
          slideNumber,
          navDescription
        });
        return newState;
      }
      return state;
    }
    case EActionTypes.SET_SLIDE_PROPS: {
      const { payload } = action;
      const { activeSlide, isDoneSliding, slidingAnimation } = payload;
      newState.slideProps = {
        activeSlide,
        isDoneSliding,
        slidingAnimation
      };
      return newState;
    }
    case EActionTypes.SET_NAVBAR_PROPS: {
      const { payload } = action;
      const { changeSlide, activeSlide, totalSlides, sliderWidth } = payload;
      newState.navProps = {
        changeSlide,
        activeSlide,
        totalSlides,
        sliderWidth
      };
      return newState;
    }
    case EActionTypes.SET_AUTOPLAY_BUTTON_PROPS: {
      const { payload } = action;
      const {
        setIsManuallyPaused,
        autoplayHandlerTimeout,
        shouldAutoplay,
        autoplay
      } = payload;
      newState.autoplayButtonProps = {
        setIsManuallyPaused,
        autoplayHandlerTimeout,
        shouldAutoplay,
        autoplay
      };
      return newState;
    }
    default:
      return state;
  }
};

const SliderContextProvider = (props: ISliderProviderProps) => {
  const { isMobile: mobile, children } = props;

  const [sliderContextProps, dispatchProps]: [
    IReducerState,
    React.Dispatch<IReducerAction>
  ] = useReducer<React.Reducer<IReducerState, IReducerAction>>(reducer, {
    // Creating a new array to not affect other context values due to immutability.
    slidesArray: [...initialContext.slidesArray],
    slideProps: initialContext.slideProps,
    navProps: initialContext.navProps,
    autoplayButtonProps: initialContext.autoplayButtonProps
  });

  const { slideProps, slidesArray, navProps, autoplayButtonProps } =
    sliderContextProps;

  const [isMobile, setIsMobile] = useState<boolean>(mobile);

  // When mounting, if `isMobile` is undefined, then set the default is mobile
  // based on the browser user agent.
  useEffect(() => {
    if (typeof isMobile === 'undefined') setIsMobile(setDefaultIsMobile());
  }, [isMobile]);

  return (
    <SliderContext.Provider
      value={{
        dispatchProps,
        isMobile,
        slidesArray,
        slideProps,
        navProps,
        autoplayButtonProps
      }}
    >
      {children}
    </SliderContext.Provider>
  );
};

export default SliderContextProvider;
