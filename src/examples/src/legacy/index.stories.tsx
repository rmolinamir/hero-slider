import HeroSlider from 'hero-slider';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import '../index.css';
import { Page } from '../ui/Page';
import BasicSlider from './BasicSlider';
import VerticalSlider from './VerticalSlider';
import NavbarSlider from './NavbarSlider';
import BlendModeSlider from './BlendModeSlider';
import AutoplayButtonSlider from './AutoplayButtonSlider';
import ButtonsSlider from './ButtonsSlider';

export default {
  title: 'Example/hero-slider-legacy',
  component: HeroSlider,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof Page>;

export const Basic: ComponentStory<typeof Page> = (args) => (
  <main>
    <BasicSlider {...args} />
    <Page />
  </main>
);

export const Vertical: ComponentStory<typeof Page> = (args) => (
  <main>
    <VerticalSlider {...args} />
    <Page />
  </main>
);

export const Navbar: ComponentStory<typeof Page> = (args) => (
  <main>
    <NavbarSlider {...args} />
    <Page />
  </main>
);

export const BlendMode: ComponentStory<typeof Page> = (args) => (
  <main>
    <BlendModeSlider {...args} />
    <Page />
  </main>
);

export const AutoplayButton: ComponentStory<typeof Page> = (args) => (
  <main>
    <AutoplayButtonSlider {...args} />
    <Page />
  </main>
);

export const Buttons: ComponentStory<typeof Page> = (args) => (
  <main>
    <ButtonsSlider {...args} />
    <Page />
  </main>
);
