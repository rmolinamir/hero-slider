import HeroSlider from 'hero-slider';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import '../index.css';
import BasicSlider from './BasicSlider';
import { Page } from '../ui/Page';
import VerticalSlider from './VerticalSlider/VerticalSlider';

export default {
  title: 'Example/hero-slider',
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
