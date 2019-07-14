import * as React from 'react'
import { isMobile as setDefaultIsMobile } from '../isMobile'
// Types
import {
  ISliderContext,
  ISliderProviderProps
} from '../typings'

const initialContext: ISliderContext = {
  isMobile: undefined
}
const { useState, useEffect } = React

export const SliderContext = React.createContext(initialContext)

const SliderContextProvider = (props: ISliderProviderProps) => {
  const {
    isMobile: mobile,
    children
  } = props

  const [isMobile, setIsMobile] = useState<boolean>(mobile)

  // When mounting, if `isMobile` is undefined, then set the default is mobile
  // based on the browser user agent.
  useEffect(() => {
    if (typeof isMobile === 'undefined') {
      setIsMobile(setDefaultIsMobile())
    }
  }, [isMobile])

  return (
    <SliderContext.Provider
      value={{
        isMobile
      }}
    >
      {children}
    </SliderContext.Provider>
  )
}

export default SliderContextProvider
