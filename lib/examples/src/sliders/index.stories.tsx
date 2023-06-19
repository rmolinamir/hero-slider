import HeroSlider from 'hero-slider';
import { Story, ComponentMeta } from '@storybook/react';
import '../index.css';
import { Page } from '../ui/Page';
import BasicSlider from './BasicSlider';
import SlidesChildrenSlider from './SlidesChildrenSlider';
import AutoplayButtonSlider from './AutoplayButtonSlider';
import ButtonsSlider from './ButtonsSlider';
import BlendModeSlider from './BlendModeSlider';
import NavbarSlider from './NavbarSlider';
import VerticalSlider from './VerticalSlider';
import DebugSlider from './DebugSlider';
import ZoomSlider from './ZoomSlider';

export default {
  title: 'Example/hero-slider',
  component: HeroSlider,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof Page>;

export const Basic: Story = (args) => (
  <main>
    <BasicSlider {...args} />
    <Page />
  </main>
);

export const SlidesChildren: Story = (args) => (
  <main>
    <SlidesChildrenSlider {...args} />;
    <Page />
  </main>
);

export const AutoplayButton: Story = (args) => (
  <main>
    <AutoplayButtonSlider {...args} />
    <Page />
  </main>
);

export const Buttons: Story = (args) => (
  <main>
    <ButtonsSlider {...args} />;
    <Page />
  </main>
);

export const BlendMode: Story = (args) => (
  <main>
    <BlendModeSlider {...args} />;
    <Page />
  </main>
);

export const Zoom: Story = (args) => (
  <main>
    <ZoomSlider {...args} />;
    <Page />
  </main>
);

export const Navbar: Story = (args) => <NavbarSlider {...args} />;

export const Vertical: Story = (args) => <VerticalSlider {...args} />;

export const Debug: Story = (args) => (
  <main>
    <DebugSlider {...args} />;
    <Page />
  </main>
);
