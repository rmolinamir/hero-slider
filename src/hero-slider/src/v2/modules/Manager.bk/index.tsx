import * as React from 'react';
import { isMobile as setDefaultIsMobile } from '../../dependencies/isMobile';
import {
  SliderContext as ISliderContext,
  EActionTypes,
  ReducerState,
  ReducerAction
} from './typings';

const initialContext: ISliderContext = {
  isMobile: undefined, // Setting
  slidesArray: [],
  dispatch: () => undefined,
  generateNewSlideId: () => undefined,
  removeSlideId: () => undefined
};

export const SliderContext = React.createContext(initialContext);

const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
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
    default:
      return state;
  }
};

const SliderContextProvider = (props: SliderProviderProps) => {
  const { children } = props;

  const slideUniqueIdsArrayRef = React.useRef<number[]>([]);
  const slideUniqueIdsArray = slideUniqueIdsArrayRef.current;

  const generateNewSlideId = React.useCallback((): number => {
    const newSlideId = slideUniqueIdsArray.length + 1;
    slideUniqueIdsArray.push(newSlideId);
    return newSlideId;
  }, [slideUniqueIdsArray]);

  const removeSlideId = React.useCallback(
    (removedSlideId: number): void => {
      slideUniqueIdsArrayRef.current = slideUniqueIdsArray.filter(
        (slideId) => removedSlideId !== slideId
      );
    },
    [slideUniqueIdsArray]
  );

  const [sliderContextProps, dispatchProps]: [
    ReducerState,
    React.Dispatch<ReducerAction>
  ] = React.useReducer<React.Reducer<ReducerState, ReducerAction>>(reducer, {
    // Creating a new array to not affect other context values due to immutability.
    slidesArray: [...initialContext.slidesArray],
    slideProps: initialContext.slideProps,
    navProps: initialContext.navProps,
    autoplayButtonProps: initialContext.autoplayButtonProps
  });

  const { slideProps, slidesArray, navProps, autoplayButtonProps } =
    sliderContextProps;

  const [isMobile, setIsMobile] = React.useState<boolean>();

  // When mounting, if `isMobile` is undefined, then set the default is mobile
  // based on the browser user agent.
  React.useEffect(() => {
    if (typeof isMobile === 'undefined') {
      setIsMobile(setDefaultIsMobile());
    }
  }, [isMobile]);

  return (
    <SliderContext.Provider
      value={{
        dispatchProps,
        isMobile,
        slidesArray,
        slideProps,
        navProps,
        autoplayButtonProps,
        generateNewSlideId,
        removeSlideId
      }}
    >
      {children}
    </SliderContext.Provider>
  );
};

export default SliderContextProvider;
