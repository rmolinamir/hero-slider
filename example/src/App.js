import React from 'react'
// JSX
import MarvelSlider from './components/MarvelSlider/MarvelSlider'
import NatureSlider from './components/NatureSlider/NatureSlider'
import MaskNatureSlider from './components/MaskNatureSlider/MaskNatureSlider'

const app = () => {
  return (
    <div>
      <NatureSlider />
      <MarvelSlider />
      <MaskNatureSlider />
    </div>
  )
}

export default app
