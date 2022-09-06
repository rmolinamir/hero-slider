# hero-slider

> This package contains multiple components with a fair range of options to help developers quickly set up a hero slider.

[![NPM](https://img.shields.io/npm/v/hero-slider.svg)](https://www.npmjs.com/package/hero-slider) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![gzip size](https://img.shields.io/badge/gzip%20size-11.6kB-brightgreen.svg)](https://unpkg.com/hero-slider@latest/dist/index.es.js)

---

## Introduction

This package contains multiple components with a fair range of options to help developers quickly set up a hero slider. You can set the sliding animations, the background lazy loaded image animation, navs, buttons, callbacks, and even set your own buttons if you need to.

The idea behind the configurability was to set up clear boundaries between *modules* and *components*. The modules will control the behavior of the `hero-slider`, while the components themselves are self explanatory and mostly relevant to styling. The documentation will be divided in two main sections, `Module`, and `Components`.

[![Edit Hero Slider](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/z6kky9oy63?fontsize=14)

![Navbar Slider](https://media.giphy.com/media/KeW8omQCSShZdNQMuy/giphy.gif)
![Basic Slider](https://media.giphy.com/media/WpNrWjYJxCrl4O8btw/giphy.gif)
![Zoom Slider](https://media.giphy.com/media/dXG2hB3AtPg976vCE5/giphy.gif)
![Vertical Slider](https://media.giphy.com/media/kyXfZuna1AUWGrUlog/giphy.gif)

---

## Modules

The modules are clear boundaries that define the overall behavior of the `HeroSlider` component. You can configure these behaviors by passing the respective props to the `HeroSlider`.

### Controller

This module will define the behavior slide transitions. You can set up the duration of the transitions, delays before the transitions begin, the initial active slide, callbacks for the transition events, and pointers to methods that will slide to the previous or next slides relative to the active slide.

```ts
export interface ControllerProps {
  /**
   * Sliding duration, in milliseconds.
   * @default 500
   */
  slidingDuration?: number;
  /**
   * Sliding delay, in milliseconds.
   * @default 200
   */
  slidingDelay?: number;
  /**
   * The initial slide can also be set, but the slider starts at the first slide by default.
   * @default 1
   */
  initialSlide?: number;
  /**
   * Callback executed before sliding begins.
   * The previous and next slide numbers are received as arguments, since the sliding event can be delayed, this is useful to handle state changes from the outside (e.g. fire custom animations inside the active slide).
   * @param activeSlide
   * @param nextSlide
   * @default undefined
   */
  onBeforeSliding?(activeSlide: number, nextSlide: number): void;
  /**
   * Callback executed after the sliding ends similar to `onBeforeSliding`.
   * @param activeSlide
   * @param prevSlide
   * @default undefined
   */
  onSliding?(activeSlide: number, prevSlide: number): void;
  /**
   * Callback executed after the sliding ends similar to `onBeforeChange`.
   * @param activeSlide
   * @param prevSlide
   * @default undefined
   */
  onAfterSliding?(activeSlide: number, prevSlide: number): void;
  /**
   * Similar to pointers in C++, objects can work like pointers in JavaScript. React references are mutable objects that can be changed but will always point to an origin. If you declare an `object` and pass it as a reference, then the `current` property of the React reference `object` will be set to be equal to the `goToNextSlide` handler within the slider. This provides the developer with a way to change the slides "from the outside" of the bounds of the HeroSlider component.
   */
  goToNextSlidePointer?: React.MutableRefObject<GoToNextSlide | undefined>;
  /**
   * Similar to `nextSlide`, this sets the `object` to be equal to the `goToPreviousSlide` handler within the HeroSlider component.
   */
  goToPreviousSlidePointer?: React.MutableRefObject<
    GoToPreviousSlide | undefined
  >;
}
```

### Animations

Defines which sliding animations will be used during slide transitions.

```ts
export interface AnimationsProps {
  /**
   * The sliding animations during transitions.
   * @default 'wipe'
   */
  slidingAnimation?: 'fade' | 'wipe';
  /**
   * Fade in duration of the slider during mount, in milliseconds.
   * @default 100
   */
  sliderFadeInDuration?: number;
  /**
   * Navbars fade in duration, in milliseconds.
   * @default 1000
   */
  navbarFadeInDuration?: number;
  /**
   * Navbars fade in delay, in milliseconds.
   * @default 500
   */
  navbarFadeInDelay?: number;
  /**
   * When `true`, the `hero-slider` will know which animation should be set next.
   * For example, if the user is selecting the next slide, the animation would be different to the one if the user had selected the previous slide.
   * The animations will essentially be the same, but moving to different directions (e.g. left or right, or right to left).
   * @default true
   */
  shouldManageAnimationSequence?: boolean;
}
```

### Autoplay

Autoplay is a feature that the Slider will support if enabled, it is disabled by default. The autoplay will activate a slide transition periodically after a certain duration, and a debounce will happen every time the user interacts with the Slider. The debounce duration can also be configured.

```ts
interface Props {
  /**
   * Autoplay duration, interval or duration betweens slide transitions, in milliseconds.
   * If it's lower than the sliding cycle duration (sliding duration + sliding delay), then the sliding cycle duration will be used instead.
   * @default 8000
   */
  autoplayDuration?: number;
  /**
   * Time (in milliseconds) in which the autoplay will be debounced if the user interacts with the slider.
   * The autoplay resumes if the user stops interacting after this duration.
   * Set as 0 to disable this feature.
   * @default 4000
   */
  autoplayDebounce?: number;
}

export type AutoplayProps = Props | boolean;
```

### Accessability

Handles accessability behaviors such as the orientation of the Slider (which affects the swipe motions used to command slide transtisions), and whether to render next and previous buttons.

```ts
/**
 * `AccessabilityOrientation` definition used for the `SliderProps.orientation` prop.
 * Used to define which swipes (depending on directions) will change the slides,
 * and where and how will the buttons render, if set to render.
 */
export enum AccessabilityOrientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

export interface AccessabilityProps {
  /**
   * Controls render of the next and previous buttons.
   * @default true
   */
  shouldDisplayButtons?: boolean;
  /**
   * When an arrow key is pressed, the active slide will change respectively to the pressed arrow.
   * The left and down arrows will set the previous slide, and the right and up arrows will set the next slide.
   * The left and right will only work if the slider is horizontal, and the up and down arrows will only work if the slider is vertical.
   * @default true
   */
  shouldSlideOnArrowKeypress?: boolean;
  /**
   * The slider orientation can either set to be `horizontal` or `vertical`.
   * The orientation sets the slide buttons respective to the orientation (e.g. if vertical, the buttons will be at the top and at the bottom).
   * Swipe (touch) gestures in mobile devices to change slides will also be configured automatically depending on the orientation (e.g. if horizontal, swiping vertically won't change slides).
   * @default 'horizontal'
   */
  orientation?: `${AccessabilityOrientation}`;
  /**
   * Pixel threshold for the Slider to register a swiping command to change slides.
   * @default 50
   */
  thresholdToSlide?: number;
}
```

### Settings

The settings will allow you to set up CSS variables that will be available to HTML elements inside the slider, as well as debugging levels in case you are running into problems.

```ts
export interface SettingsProps {
  /**
   * Sets up the `--slider-color` CSS variable.
   * @default 'inherit'
   */
  sliderColor?: CSS.Properties['color'];
  /**
   * Inline CSS styling for the wrapper div element of the component.
   * @default {}
   */
  sliderStyle?: Omit<CSS.Properties, 'width' | 'height'>;
  /**
   * Aesthetics settings. You can configure the base color and the active color of all nav components within the `HeroSlider`. They can be set individually as well.
   * @default
   * {
   *    color: undefined,
   *    activeColor: undefined
   * }
   */
  navbarStyle?: {
    color?: CSS.Properties['color'];
    activeColor?: CSS.Properties['color'];
  };
  /**
   * Debugger logs level. Only useful if you need insights.
   * @default
   * {
   *    verbose: false,
   *    info: false,
   *    debug: false,
   *    warnings: true,
   *    errors: true
   * }
   */
  debug?: LoggerLevels | undefined;
}
```

### Manager

The `Manager` will juggle the `Slide` components and from other processes behind the scenes. You can optionally set up whether the user is on a mobile device, but this will default to a standard navigator validation.

```ts
export interface ManagerProps {
  /**
   * Determines if on a mobile device. If true, the control buttons at the sides of the slider won't render.
   * @default /Mobi|Android/i.test(navigator.userAgent)
   */
  isMobile?: boolean;
}
```

---

## Components

This package offers multiple components. Below you will find instructions for each component and their respective `props`.

### HeroSlider

The main component and default export of the package. The `HeroSlider` has wrap all of the other components, otherwise you will run into errors due to a lack of Context providers.

`HeroSlider` accepts the following props:

```ts
/**
 * `HeroSlider` props.
 */
export interface HeroSliderProps {
  // Styling
  /**
   * CSS property. Defines the width of the slider.
   * @default '100%'
   */
  width?: React.CSSProperties['width'];
  /**
   * CSS property. Defines the height of the slider.
   * @default '100vh'
   */
  height?: React.CSSProperties['height'];
  /**
   * Inline CSS styling.
   */
  style?: Omit<React.CSSProperties, 'width' | 'height'>;
  // Modules
  manager?: ManagerProps;
  settings?: SettingsProps;
  controller?: ControllerProps;
  accessability?: AccessabilityProps;
  animations?: AnimationsProps;
  autoplay?: AutoplayProps;
}
```

#### Example

```tsx
<HeroSlider
  height="100vh"
  autoplay
  controller={{
    initialSlide: 1,
    slidingDuration: 500,
    slidingDelay: 100,
    onSliding: (nextSlide: number) =>
      console.debug('onSliding(nextSlide): ', nextSlide),
    onBeforeSliding: (previousSlide: number, nextSlide: number) =>
      console.debug(
        'onBeforeSliding(previousSlide, nextSlide): ',
        previousSlide,
        nextSlide
      ),
    onAfterSliding: (nextSlide: number) =>
      console.debug('onAfterSliding(nextSlide): ', nextSlide)
  }}
>
...
```

### HeroSlider Slide

The `Slide` component holds whatever children you want to be part of each slide, you can also modify the background and its initial mount animation. Bear in mind that background images are lazy loaded.

The `Slide` component accepts the following props:

```ts
/**
 * `Slide` component props.
 */
export interface SlideProps {
  /**
   * Each slide has a "Mask" that serves as an adornment.
   * They mimic the background, then offsets it a bit. It has an animation during slide transitions.
   * @default false
   */
  shouldRenderMask?: boolean;
  /**
   * Defines the background of the `Slide`.
   * You may pass CSS properties just like you would style the background of a regular HTML element.
   * The main difference is that the `backgroundImage` property will work just like an image `src` property instead of the typical background image URL.
   */
  background?: Partial<BackgroundProps>;
  /**
   * If the developer is using a `MenuNav` or `ButtonsNav` component, a label for each slide may be passed.
   * These labels will be shown in the nav components.
   */
  label?: string;
  /**
   * Inline CSS styling.
   */
  style?: React.CSSProperties;
  /**
   * Callback that executes when the background image loads.
   */
  onBackgroundLoad?: BackgroundProps['onLoad'];
}
```

#### Slide Background prop

The background of the `Slide` components can be configured just as you would configure the background of any element, with the added bonus of lazy loading and being able to pass data to the `alt` image attribute.

```ts
/**
 * Type definition for `BackgroundProps.backgroundAnimation`.
 */
export enum BackgroundAnimation {
  FADE = 'fade',
  ZOOM = 'zoom'
}

/**
 * `BackgroundProps` interface for the `Background` JSX
 * component's props used inside the `Slide` components.
 * The `Slide` components `background` prop is also defined
 * by `BackgroundProps`.
 */
export interface BackgroundProps {
  /**
   * Boolean variable to allow or disable lazy loading.
   * @default true
   */
  shouldLazyLoad?: boolean;
  backdropFilter?: CSS.Properties['backdropFilter'];
  backfaceVisibility?: CSS.Properties['backfaceVisibility'];
  background?: CSS.Properties['background'];
  backgroundAttachment?: CSS.Properties['backgroundAttachment'];
  backgroundBlendMode?: CSS.Properties['backgroundBlendMode'];
  backgroundClip?: CSS.Properties['backgroundClip'];
  backgroundColor?: CSS.Properties['backgroundColor'];
  /**
   * Background image. **Not the same as the CSS property**, just pass the `string` uri, not the typical `url([link])`.
   */
  backgroundImage?: CSS.Properties['backgroundImage'];
  backgroundOrigin?: CSS.Properties['backgroundOrigin'];
  /**
   * CSS property. Defines the position of the background.
   * @default 'center top'
   */
  backgroundPosition?: CSS.Properties['backgroundPosition'];
  backgroundPositionX?: CSS.Properties['backgroundPositionX'];
  backgroundPositionY?: CSS.Properties['backgroundPositionY'];
  backgroundRepeat?: CSS.Properties['backgroundRepeat'];
  /**
   * CSS property. Defines the size of the background.
   * @default 'cover'
   */
  backgroundSize?: CSS.Properties['backgroundSize'];
  backgroundAnimationDuration?: CSS.Properties['backgroundSize'];
  backgroundAnimationDelay?: CSS.Properties['backgroundSize'];
  /**
   * Background animation after the image loads.
   * There are currently two options, a fade-in animation, or a zoom in animation that lasts 30 secs, the background zooms in until it reaches its original size.
   * @default 'fade'
   */
  backgroundAnimation?: `${BackgroundAnimation}`;
  /**
   * Background blend mode CSS property **for the optional mask that could render in each of the Slide components**.
   */
  maskBackgroundBlendMode?:
    | 'normal'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'saturation'
    | 'color'
    | 'luminosity';
  /**
   * CSS property. Defines the width of the background.
   * @default '100%'
   */
  width?: CSS.Properties['width'];
  /**
   * CSS property. Defines the height of the background.
   * @default '100%'
   */
  height?: CSS.Properties['height'];
  alt?: string;
  src?: string;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}
```

#### Slide Example

```tsx
<Slide
  background={{
    backgroundImage: salta
  }}
>
  <div>Salta - Argentina</div>
</Slide>
```

### Nav

The basic `Nav` component, worth noting that there are three other types of (slide) navigation components named `SideNav`, `MenuNav`, and `ButtonsNav`. This component is nothing more than a nagivation bar. By default the component is positioned at the bottom, centered.

```ts
/**
 * Defines the position of the navigation component.
 */
export interface NavPosition {
  top?: React.CSSProperties['top'];
  left?: React.CSSProperties['left'];
  bottom?: React.CSSProperties['bottom'];
  right?: React.CSSProperties['right'];
  transform?: React.CSSProperties['transform'];
}

/**
 * `Nav` component props.
 */
export interface NavProps {
  /**
   * Object of CSS properties `top`, `left`, `bottom`, and `right` used to absolutely position elements.
   * Aside from the former, you can also set the CSS `transform` property to help you center the element.
   * @default
   * {
   *    bottom: '1.5rem',
   *    left: '50%',
   *    transform: 'translateX(-50%)'
   * }
   */
  position?: NavPosition;
  /**
   * Defines `--nav-color` CSS variable.
   */
  color?: string;
  /**
   * Defines `--nav-active-color` CSS variable.
   */
  activeColor?: string;
}
```

#### NavPosition

The position settings are nothing more than the `top`, `left`, `bottom`, and `right` CSS properties used by absolutely position elements. Aside from the former, you can also set the CSS `transform` property to help you position the element.

#### NavExample

```tsx
<HeroSlider
  ...
>
  ...

  <Slide
    ...
  />

  <Slide
    ...
  />

  <Nav />
</HeroSlider>
```

### SideNav

When it comes to props it extends the props of the `Nav` component. There are a couple more props that can be passed to this component. Aside from that, it's worth mentioning that this component is intented to be placed at the sides of the slider.

```ts
/**
 * `SideNav` component props.
 */
export interface SideNavProps extends NavProps {
  /**
   * Defines the inline CSS property `right` of the component.
   */
  right?: React.CSSProperties['right'];
  /**
   * Defines the inline CSS property `left` of the component.
   */
  left?: React.CSSProperties['left'];
  /**
   * Defines the position. If you set it to the left, set this to false to disable any existing `right` CSS properties and avoid any conflicts.
   * @default true
   */
  isPositionedRight?: boolean;
  /**
   * Object of CSS properties `top`, `left`, `bottom`, and `right` used to absolutely position elements.
   * Aside from the former, you can also set the CSS `transform` property to help you center the element.
   * @default
   * {
   *    bottom: undefined,
   *    top: '50%',
   *    left: !isPositionedRight ? left || '1rem' : undefined,
   *    right: isPositionedRight ? right || '1rem' : undefined,
   *    transform: 'translateY(-50%)'
   * }
   */
  position?: NavPosition;
}
```

#### SideNav Example

This example would render two `SideNav` components at both sides of the screen:

```tsx
<HeroSlider
  ...
>
  ...

  <Slide
    ...
  />

  <SideNav
    isPositionedRight={false}
    position={{
      top: '50%',
      left: '0',
      transform: 'translateY(-50%)'
    }}
  />

  <SideNav />
</HeroSlider>
```

### MenuNav

Extends from the `Nav` component, with a few additional props.

```ts
/**
 * `MenuNav` component props.
 */
export interface MenuNavProps extends NavProps {
  /**
   * Determines how the browser distributes space between and around nav items along the component.
   */
  justifyContent?: React.CSSProperties['justifyContent'];
  /**
   * Given the nature of this component, it doesn't work well with devices of relatively small width.
   * The mobile threshold is the point in which this component turns into a basic `Nav` component or `null`.
   */
  mobileThreshold?: number;
  /**
   * Determines if the nav should render `null` or a basic `Nav` component after the threshold is reached.
   * @default false
   */
  isNullAfterThreshold?: boolean;
  /**
   * An extra button rendered among the nav items in case the developer may want any extra functionality in the component.
   */
  extraButton?: React.ReactNode;
  /**
   * Renders the button to the right side of the nav if true, otherwise it will appear at the left side.
   * @default true
   */
  isExtraButtonRight?: boolean;
}
```

#### MenuNav Example

```tsx
<HeroSlider
  ...
>
  ...

  <Slide
    ...
  />

  <MenuNav />
</HeroSlider>
```

### ButtonsNav

Extends from the previous `MenuNav` component props. It works the same, with the addition of additional props defined as `alignItems` and `backgroundColor`.
The `alignItems` prop will align the slide navigation items relative to the Slider.
The `backgroundColor` sets the background of the buttons, while the `color` prop is used for the color of the text, and the `activeColor` prop is used for the background of the active navigation item.

```ts
/**
 * `ButtonsNav` component props.
 */
export interface ButtonsNavProps extends MenuNavProps {
  /**
   * CSS background color property for the nav buttons.
   */
  backgroundColor?: React.CSSProperties['backgroundColor'];
  /**
   * Aligns the nav items to the center, top, or bottom of its container working exactly as how the CSS flex-box `align-items` property works.
   */
  alignItems?: React.CSSProperties['alignItems'];
}
```

### AutoplayButton

The `AutoplayButton` component allows the user to control the behavior of the `Autoplay` module. This button will play or pause the autoplay when clicked. It's really easy to setup.

You can position it just like you would position a navigation component by using passing the `position` prop, but you may also pass a CSS class or inline styling as props.

```ts
/**
 * `AutoplayButton` component props.
 */
export interface AutoplayButtonProps {
  /**
   * CSS class name.
   */
  className?: React.HTMLAttributes<HTMLElement>['className'];
  /**
   * Object of CSS properties `top`, `left`, `bottom`, and `right` used to absolutely position elements.
   * Aside from the former, you can also set the CSS `transform` property to help you center the element.
   * @default
   * {
   *    bottom: '0',
   *    left: '0'
   * }
   */
  position?: NavPosition;
  /**
   * Inline CSS styling.
   */
  style?: React.CSSProperties;
}
```

#### AutoplayButton Example

```tsx
<HeroSlider
  ...
>
  <Overlay>
    ...
    <AutoplayButton />
  </Overlay>

  ...
</HeroSlider>
```

### Overlay

The `Overlay` is a useful component that will superpose its children over the content of the `Slide` components.

#### Overlay Example

```tsx
<HeroSlider
  ...
>
  <Overlay>
    <div>On Top of the World</div>
  </Overlay>

  <Slide
    ...
  />

  <Nav />
</HeroSlider>
```

---

## License

MIT © [rmolinamir](https://github.com/rmolinamir)
