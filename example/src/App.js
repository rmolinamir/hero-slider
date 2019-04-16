import React from 'react'
// JSX
import BlendModeSlider from './components/BlendModeSlider/BlendModeSlider'
import BasicSlider from './components/BasicSlider/BasicSlider'
import ZoomSlider from './components/ZoomSlider/ZoomSlider'
import VerticalSlider from './components/VerticalSlider/VerticalSlider'
import NavbarSlider from './components/NavbarSlider/NavbarSlider'

const app = () => {
  return (
    <div style={{
      color: '#FFF'
    }}>
      <BasicSlider />
      <VerticalSlider />
      <ZoomSlider />
      <BlendModeSlider />
      <NavbarSlider />
    </div>
  )
}

export default app
