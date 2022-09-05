import React from 'react';
import { useInView } from 'react-intersection-observer';

type ProviderProps = React.PropsWithChildren;

const IntersectionObserverStateContext = React.createContext<
  | {
      elementObservedRef: (node?: Element | null | undefined) => void;
      isInView: boolean;
    }
  | undefined
>(undefined);

function IntersectionObserverProvider({ children }: ProviderProps) {
  const [ref, inView] = useInView({ threshold: 0 });

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = {
    elementObservedRef: ref,
    isInView: inView
  };

  return (
    <IntersectionObserverStateContext.Provider value={value}>
      {children}
    </IntersectionObserverStateContext.Provider>
  );
}

function useIntersectionObserver() {
  const context = React.useContext(IntersectionObserverStateContext);

  if (context === undefined) {
    throw new Error(
      'useIntersectionObserver must be used within a IntersectionObserverProvider'
    );
  }

  return context;
}

export { IntersectionObserverProvider, useIntersectionObserver };
