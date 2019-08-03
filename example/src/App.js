import React from 'react'
// JSX
import BasicSlider from './components/BasicSlider/BasicSlider'
import VerticalSlider from './components/VerticalSlider/VerticalSlider'
import ZoomSlider from './components/ZoomSlider/ZoomSlider'
import SlidesChildrenSlider from './components/SlidesChildrenSlider/SlidesChildrenSlider'
import BlendModeSlider from './components/BlendModeSlider/BlendModeSlider'
import NavbarSlider from './components/NavbarSlider/NavbarSlider'
import ButtonsSlider from './components/ButtonsSlider/ButtonsSlider'
import AutoplayButtonSlider from './components/AutoplayButtonSlider/AutoplayButtonSlider'

const app = () => {
  return (
    <div style={{
      color: '#FFF',
      height: '500vh'
    }}>
      <BasicSlider />
      <VerticalSlider />
      <ZoomSlider />
      <SlidesChildrenSlider />
      <BlendModeSlider />
      <NavbarSlider />
      <ButtonsSlider />
      <AutoplayButtonSlider />
    </div>
  )
}

export default app
