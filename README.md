# hero-slider

> A hero slider component inline with how you would expect most React components to work. Includes autoplay, lazy loaded backgrounds, detecs touch swiping and direction to change slides, multiple navs, settings, memoization, event callbacks, among other features.

[![NPM](https://img.shields.io/npm/v/react-formalized.svg)](https://www.npmjs.com/package/react-formalized) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![gzip size](https://img.shields.io/badge/gzip%20size-14.0kB-brightgreen.svg)](https://unpkg.com/react-formalized@latest/dist/index.es.js)

---

## Introduction

This package contains multiple components with a fair range of options to help developers quickly set up a hero slider. In short, it functions just how you would expect a package of React components. In short, all you have to do is import the Slider & Slide components. You can set the sliding animations, the background lazy loaded image animation, navs, buttons, callbacks, and even set your own buttons if you need to. The style and animations were inspired by different sliders from websites such as Lamborghini's, Lonely Planet, Kreativa Studio.

---

## Install

```bash
npm install --save hero-slider
```

---

## [Showcase](https://www.robertmolina.dev/codelab/hero-slider)

[![Edit React Formalized](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/6l4w83xqpk?fontsize=14)

#### Hero Slider

![Input Elements](https://i.imgur.com/Pnw7QEo.gif)

---

## Instructions

This package contains multiple exports, each used differently and some similarly. Below you will find instructions for each components and their respective `props`. Here's a list of all the possible components you may import:

```jsx
import HeroSlider, {
  Slide,
  Nav,
  SideNav,
  MenuNav,
  ButtonsNav
} from 'hero-slider'
```

## HeroSlider

The main component of the package. Also the default export. With this component, none of the other components will work as intended, so be sure to wrap them all inside, you can think of this component as the operations center. 

HeroSlider accepts the following props:

| Prop | Type | Default | Definition |
|:----------------:|:--------------------------------------------------:|:--------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| settings | object | (Shown below) | The slider settings, features like autoplay, sliding duration and delay, color, animation durations, navbar animations, and others, can be configured. More detailed information below this table. |
| orientation | string | `'horizontal'` | The slider orientation. It can either set to be `horizontal` or `vertical`. The orientation sets the slide buttons respective to the orientation (e.g. if vertical, the buttons will be at the top and at the bottom). Swipe (touch) gestures in mobile devices to change slides will also be configured automatically depending on the orientation (e.g. if horizontal, swiping vertically won't change slides). |
| slidingAnimation | string | Horizontal clip-path animations. | The sliding animations during changes. There are multiple possible types of animations, they can be hard-set through settings if `isSmartSliding` is `false`. Otherwise, depending on the initial animation, the rest of the animations will be the same except the origin will change respective to which slide is being selected (meaning after of previous to current slide). |
| isSmartSliding | boolean | `true` | With smart sliding, the hero slider will know which animation should be set next, meaning if the user is selecting the next slide, the animation would be different to the one if the user had selected the previous slide. The animations will essentially be the same, but with different origins (e.g. translate left or right). |
| initialSlide | number | `1` | The initial slide can also be set, but the slider starts at the first slide by default, being 1 and **not 0**. |
| nextSlide | React.MutableRefObject | `null` | Similar to pointers in C++, objects can work like pointers in JavaScript. React references are mutable objects that can be changed but will always point to an origin. If you declare an object and pass it as a reference, then the `current` property of the React reference object will be set to be equal to the nextSlide handler within the slider. This provides the developer with a way to change the slides "from the outside" of the bounds of the HeroSlider component. |
| previousSlide | React.MutableRefObject | `null` | Similar to `nextSlide`, this sets the object to be equal to the previousSlide handler within the HeroSlider component. |
| navbarSettings | object | (Shown below) | Aesthetics settings. You can configure the base color and the active color of all nav components within the HeroSlider. They can be set individually as well. |
| style | React.CSSProperties | `null` | Inline CSS styling for the wrapper div element of the component. |
| onBeforeChange | (previousSlide: number, nextSlide: number) => void | `null` | Callback executed before sliding begins. The previous and next slide numbers are received as arguments, since the sliding event can be delayed, this is useful to handle state changes from the outside (e.g. fire custom animations inside the active slide). |
| onChange | (nextSlide: number) => void | `null` | Callback executed when the sliding begins similar to `onBeforeChange`. |
| onAfterChange | (currentSlide: number) => void | `null` | Callback executed after the sliding ends similar to `onBeforeChange`. |
| children | `any` | `null` | React children. If the children are not Nav or Slide components, they will be rendered inside the HeroSlider overlapping all of the other components. Think of them like having a higher `z-index` property. |

### HeroSlider settings

Through the settings props, you can configure multiple features of the slider. These settings/features are:

| Setting | Type | Definition |
|:----------------------:|:---------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| slidingDuration | `number` | Sliding duration, in milliseconds. |
| slidingDelay | `number` | Sliding delay, in milliseconds. |
| sliderColor | `string` | Sliding color, the CSS color property. |
| sliderFadeInDuration | `number` | Fade in duration of the slider during mount, in milliseconds. |
| navbarFadeInDuration | `number` | Navbars fade in duration, in milliseconds. |
| navbarFadeInDelay | `number` | Navbars fade in delay, in milliseconds. |
| isSmartSliding | `boolean` | Smart sliding. |
| shouldDisplayButtons | `boolean` | Next and previous buttons rendering. |
| shouldAutoplay | `boolean` | Autoplay. |
| autoplayDuration | `number` | Autoplay duration, interval or duration betweens executions to change slides, in milliseconds. |
| autoplayHandlerTimeout | `number` | Time (in milliseconds) in which the autoplay will be disabled if the user interacts with the slider. The autoplay resumes if the user stops interacting. Set as 0 to disable this feature. |
| width | `string` | CSS inline width of the div element wrapper. |
| height | `string` | CSS inline height of the div element wrapper. |

**The following are the default settings:**

```tsx
  slidingDuration: 500,
  slidingDelay: 200,
  sliderColor: 'inherit',
  sliderFadeInDuration: 100,
  navbarFadeInDuration: 1000,
  navbarFadeInDelay: 500,
  isSmartSliding: true,
  shouldDisplayButtons: true,
  shouldAutoplay: true,
  autoplayDuration: 8000,
  autoplayHandlerTimeout: 1000,
  width: '100%',
  height: '100%',
```

### Nav components settings

The nav components colors can be set from within the HeroSlider settings. These will affect **all** of the Navs. However, you may individually set a nav component different by passing these very same settings as props to said component.

---

## Slide

The Slide component holds whatever children you want to be part of each slide, you can also modify the background and its initial mount animation. Bear in mind that background images are lazy loaded.

The Slide component accepts the following props:

| Prop | Type | Default | Definition |
|:----------------:|:------------------------------------:|---------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| shouldRenderMask | `boolean` | `false` | Each slidas has a "Mask" that serves as an adornment. They mimic the background, then offsets it a bit, and animate during slide transitions. |
| background | `object` | (Shown below) | The background settings. You may pass CSS background properties just like you would style the background of an HTML element. The main difference is that the `backgroundImage` property will work just like an image tag `src` property instead of the typical background image URL. More information about these settings below this table. |
| navDescription | `string` | `null` | If the developer is using a MenuNav or ButtonsNav component, a description for each slide may be passed. These descriptions will be shown in the nav components. |
| style | React.CSSProperties | `null` | Inline CSS styling for the wrapper div element of the component. |
| onBackgroundLoad | (event: React.SyntheticEvent) => any | `null` | Callback that executes when the background image loads. |
| children | `any` | `null` | React children. |

### Slide background settings

The background of the Slide components can be configured just as you would configure the background of any element, with the added bonus of lazy loading and being able to pass data to the `alt` image attribute. Here are the allowed settings

| Setting | Type | Definition |
|:---------------------------:|:--------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| backdropFilter | `string` | Backdrop filter CSS property. |
| backfaceVisibility | `string` | Backface visibility CSS property. |
| background | `string` | Background CSS property. |
| backgroundAttachment | `string` | Background attachment CSS property. |
| backgroundBlendMode | `string` | Background blend mode CSS property. |
| backgroundClip | `string` | Background clip CSS property. |
| backgroundColor | `string` | Background color CSS property. |
| backgroundImage | `string` | Background image. **Not the same as the CSS property**, just pass the string uri, not the typical `url([link])`. |
| backgroundOrigin | `string` | Background origin CSS property. |
| backgroundPosition | `string` | Background position CSS property. |
| backgroundPositionX | `string` | Background position X CSS property. |
| backgroundPositionY | `string` | Background position Y CSS property. |
| backgroundRepeat | `string` | Background repeat CSS property. |
| backgroundSize | `string` | Background size CSS property. |
| backgroundAnimationDuration | `string` | Background animation duration after the image loads. |
| backgroundAnimationDelay | `string` | Background animation delay after the image loads. |
| backgroundAnimation | `string` | Background animation after the image loads. There are currently two options, a fade-in animation, or a zoom in animation that lasts 30 secs, the background zooms in until it reaches its original size. **To select the fade-in animation this prop must be equal to `'fade'`, to select the zoom animation, this prop must be equal to `'zoom'`**. |
| width | `string` | Width CSS property. |
| height | `string` | Height CSS property. |
| alt | `string` | HTML `img` element alt attribute. |

---

## Select

Based on the HTML `<select>` element with some differences. The main difference is that in actuality it's a common input of type `'text'`, and the list is rendered through a React state. It's easy to set-up since the options are passed as an array, and you may also set up values with different display names. It can also validate.

Closing the list is user friendly. An user may click on the background, on the arrow button, or press the ESC key if not on a mobile device to close it.

The `<Select />` datalist prop type is defined as:

```ts
// props.datalist
type datalist = (value | ISelectValue)[]

// props.datalist
interface ISelectValue {
  value: value
  displayValue: string | number
}
```

It is based on the HTML `<datalist>` element that contains a set of  `<option>` elements which represent the values available for other controls. Except, instead of a set of `<option>` elements, the datalist is an array of options.

**What this means is that the datalist is an `array` that accepts a `value` for each array item (options), or an object structured like the `ISelectValue` interface shown above**. The `displayValue` will be the value displayed on the input, but the `value` will be the value returned from the `onChange` callbacks. If `displayValue` is null it will simply fallback to `value`.

`<Select />` accepts the following props:

| Props | Type | Default | Definition |
|:-----------------------:|:-----------------------------:|:-----------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| identifier | `string` | Generated string based on props. | The identifier is used to let the Form component assign a namespace for the input values, essentially to identify the form data. More info on the Form section. |
| value | *value | Empty string `('')`. | Input value. |
| datalist | (*value or *datalist `object`)[] | [] | Based on the HTML `<datalist>` element that contains a set of  `<option>` elements which represent the values available for other controls. Each array item will be an available option, for more information about the value type options, see the paragraphs above for an explanation. |
| onChange | *onChange `function` | Undefined. | Callback that executes after the input change event is fired. |
| elementConfig | *elementConfig  `object` | Undefined. | HTML input common attributes. [More information available in the MDN official documentation about inputs ](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes ). |
| disabled | `boolean` | Undefined. | HTML input disabled attribute. Also provides additional styling for the component, to better indicate it's disabled. |
| placeholder | `string` | Undefined. | Placeholder displayed on the label element tag. |
| required | `boolean` | Undefined. | HTML input required attribute. |
| shouldValidate | `boolean` | If `required` is true then `shouldValidate` is true, otherwise `false`. | Determines if the component validates the value or not. |
| shouldCloseListOnChange | `boolean` | `true` | Determines if the list should close after an option is selected, defaults to `true`. |

---

## Numeric

A simple component intended to handle small natural numbers or integers while also managing to look elegant.

This component accepts the following props. Note that the Numeric component `onChange` prop is a function defined as:

```ts
type onChange = (value: number) => void;
```

| Props | Type | Default | Definition |
|:-------------:|:--------------------:|:----------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| value | `number` | `0` | Input value. |
| minValue | `number` | `0` | The minimum permitted value. |
| maxValue | `number` | `true` | The maximum permitted value. |
| style | `CSSProperties` | Undefined. | CSS properties for the wrapper fieldset element. |
| shouldNotType | `boolean` | `true` | Disables typing on the input field. The only way to modify the input value would be by using the buttons. |
| onChange | *onChange `function` | Undefined. | Callback that executes after the input change event is fired. Only receives the value as an argument unlike the other `onChange` callbacks. The type definition is above. |

---

## Checkbox

Based on the `<input>` elements of type **checkbox** and **radio**. The main difference is that the type will primarily will be styling, looks, and pre-set configurations, but bear in mind that a a `<Checkbox />` component of type **radio** can function as an input type **checkbox** and vice versa. There is also an input of type **bubble** which functions as an input of type **checkbox** by default, but can function as an input type **radio** as well.

The guideline is the following:

- `<Checkbox />` component of type **checkbox** will function as a normal `<input>` element of type **checkbox**, but can be configured otherwise through props.
- `<Checkbox />` component of type **radio** will function as a normal `<input>` element of type **radio**, but can too be configured otherwise through props.
- `<Checkbox />` component of type **checkbox** follows the same principles, but by default it's configured as an `<input>` element of type **checkbox**.

To configure a `<Checkbox />` component of type **radio** as a **checkbox** input element you need to pass a prop defined as `multiple` of type boolean, as `true`. Otherwise if you want to configure `<Checkbox />` component of type **checkbox** or **bubble** to work as a **checkbox** input element you need to pass a prop defined as `single` of type boolean, as `true`.

If you pass the `single` prop as `true` and are using more than one set of checkboxes, I recommend also passing the same `name` of type `string` prop to all of the components.

Handling all of these props for multiple `<Checkbox />` components is way easier by using the `<CheckboxGroup />` component, more information about this in its respective section directly below this one.

Note that the Checkbox component `onChange` prop is a function defined as:

```ts
type onChange = (identifier: string, checked: boolean, value: value) => void
```

The difference is that the second value is the checked status instead of the value as of the other onChange callbacks. The value, if it exists, will be the third argument. The reason for this change is because `<input>` elements of type **checkbox** or **radio** don't always require values.

The `<Checkbox />` component accepts the following props:

| Props | Type | Default | Definition |
|:----------:|:--------------------:|:--------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| label | `string` | Undefined. | Similar to a placeholder, it's displayed on the label element tag. |
| identifier | `string` | Generated string based on props. | The identifier is used to let the Form component assign a namespace for the input values, essentially to identify the form data. More info on the Form section. |
| checked | `boolean` | `false` | The HTML `defaultChecked` attribute of the input, basically, the initially status. |
| type | `CSSProperties` | Undefined. | CSS properties for the wrapper fieldset element. |
| name | `string` | Undefined. | The input's name, to identify the input in the data submitted with the form's data. It's even more important on input elements of type `'radio'` and `'checkbox'` to set up their behavior. |
| disabled | `boolean` | Undefined. | HTML input disabled attribute. Also provides additional styling for the component, to better indicate it's disabled. |
| multiple | `boolean` | Depends on type. | Configures the checkbox to behave as an `<input>` of type **checkbox**. Only necessary if the component's type is `'radio'`. |
| single | `boolean` | Depends on type. | Configures the checkbox to behave as an `<input>` of type **radio**. Only necessary if the component's type is `'checkbox'` or `'bubble'`. |
| inline | `boolean` | Undefined. | The `<Checkbox />` rendered element is a block element by default, if you pass this prop they'll be rendered as inline elements. |
| value | *value | Undefined. | Input value. |
| required | `boolean` | Undefined. | HTML input required attribute. |
| style | `CSSProperties` | Undefined. | CSS properties for the wrapper fieldset element. |
| className | `string` | Undefined. | CSS class name string. |
| onChange | *onChange `function` | Undefined. | Callback that executes after the input change event is fired. Only receives the value as an argument unlike the other `onChange` callbacks. The type definition is above. |

---

## CheckboxGroup

`<CheckboxGroup />` copies the same props passed to it to all of its children, it can only be used only for the `Checkbox` functional components, everything else will be rendered as **null**. This means that every prop (that `<CheckboxGroup />` supports) passed to `<CheckboxGroup />` will be copied and passed down to the `Checkbox` components. **Keep in mind that any `Checkbox` existing prop will be overwritten**. We can copy and pass the following props:

1. `name`,
2. `type`,
3. `style`,
4. `className`,
5. `single`,
6. `required`.

Their type and definitions are obviously the same as the `Checkbox` props, respectively.

**Copying props is not the only benefit that `<CheckboxGroup />` offers though**, by passing the `required` property as `true`, the `<CheckboxGroup />` will monitor if any of its children are `checked`. If true, then the `require` attribute of all of its children `<input>` elements will be removed, to allow the form to be submitted without trouble.

Finally, the `onChange` callback prop is defined as:

```ts
type onChange = (identifier: string, value: value, valid: boolean) => void;
```

It executes after any of the `Checkbox` children change, the `value` argument will be the data of every of its `Checkbox` children, identified by their respective `name` attribute props, or a generated fallback.

An example of what the value argument may look like is as follows:

```js
"favorite-ice-creams": {
    shouldValidate: true,
    value: {
        chocolate: {
          checked: true,
          value: "FLAV_01"
        },
        vanilla: {
          checked: true,
          value: "FLAV_02"
        },
        strawberry: {
          checked: false,
          value: "FLAV_03"
        }
      },
    bIsInputValid: true
  },
  isValid:true
}
```

For more information, you may look at the example displayed on the showcase, along with its code snippet.

---

## Form

The `<Form />` component works similarly to how `<CheckboxGroup />` works, by keeping track of its **direct** children components' `onChange` events from the `react-formalized` library components (e.g. `<Input />`, `<CheckboxGroup/ >`), and data values. It's really simple to use, almost all of the logic is handled without the need of prior setup. Also, **components that are not part of the `react-formalized` library will still be rendered, but they won't receive any of the functionality that `<Form />` offers**.

I will refer to the form data as the `formState`. There are three ways to access the `formState` and it's simple, either you add an `onChange` callback, an `onSubmit` callback, or both. I think it's safe to say their names are self explanatory when it comes to explaining when do they execute.

Here are the types of `onChange`, `onSubmit`, and the object structure of `formState`:

```ts
interface IFormState {
  isValid: boolean
  [inputName: string]: IInputState
}

interface IInputState {
  value: value
  bIsInputValid: boolean
  shouldValidate: boolean
}

type onChange = (state: IFormState) => void;

type onSubmit = (event: React.SyntheticEvent, state: IFormState) => void;
```

It's worth noting that the `onSubmit` *event* argument is exactly the same as the event argument you would get after submitting a form, for example you are able to prevent its default behavior by running
`event.preventDefault()`.

Here's an example of what printing `formState` would look on the console:

```js
"form-state": {
  isValid: true,
  email: {
    bIsInputValid: true,
    shouldValidate: true,
    value: "rmolinamir@gmail.com"
  },
  password: {
    bIsInputValid: true,
    shouldValidate: true,
    value: "123123"
  }
  // ...
}
```

That being said, the `<Form />` component accepts the following props:

| Props | Type | Default | Definition |
|:---------:|:--------------------:|:--------------------------------:|:-------------------------------------------------------------------------------:|
| onChange | *onChange `function` | Undefined. | Callback that executes after any of the input children change events are fired. |
| onSubmit | *onSubmit `function` | Generated string based on props. | Callback that executes after the form is submitted. |
| style | `string` | Undefined. | CSS properties for the `<form>` element. |
| className | `string` | Undefined. | CSS class name string for the `<form>` element. |

As a final note, the `<Form />` component currently only keeps track of the following components:

1. `<Input />`
2. `<Select />`
3. `<CheckboxGroup/ >`

---

## Context

The `Context` and `Provider` exports are used to set up the CSS color themes by using CSS variables behind the scene. As you may have realized, `Context` is the React Context object generated by `React.createContext(initialContext)`.

The initial context is defined as:

```ts
const initialContext: IInputContext = {
  theme: defaultTheme,
  setTheme: function(newTheme) {
    this.theme = {
      ...this.theme,
      ...newTheme
    }
  }
}
```

---

## Provider and CSS Themes

As you may know, every `Context` object comes with a `Provider` React component that allows consuming components to subscribe to context changes. The `Provider` from the `react-formalized` library may also receive an initial theme passed to it as four different props each targetting a respecive element from the library. Here's the object structure and definition for the props that contain the CSS variables:

```ts
interface ITheme {
  general: IThemeGeneral
  input: IThemeInput
  range: IThemeRange
  checkbox: IThemeCheckbox
}

declare interface IInputContext {
  theme: ITheme
  setTheme: (CSSProps: ITheme) => void
}

declare interface IThemeGeneral {
  '--my-highlight-color': string
  '--my-icon-color': string
}

/**
 * Input components, including the Select and Numeric components.
 */
interface IThemeInput {
  '--input-border-radius': string
  '--input-border-color': string
  '--input-background-color': string
  '--input-focused-color': string
  '--input-label-color': string
  '--input-valid-color': string
  '--input-invalid-color': string
}

/**
 * Range component.
 */
interface IThemeRange {
  '--range-progressbar-background-color': string
  '--range-indicator-background-color': string
  '--range-indicator-color': string
}

/**
 * Checkbox component.
 */
interface IThemeCheckbox {
  '--checkbox-color': string
  '--checkbox-hover-color': string
  '--checkbox-animation-duration': string
  '--checkbox-background-color': string
}

```

The names are self explanatory as to which CSS properties they affect and how/when they trigger, although it is worth mentioning that `--my-highlight-color` is the color an input changes to when focused, and `--my-icon-color` is the color of certain icons such as the arrow of the `<Select />` component and the checkmarks of the `<Checkbox />` component.

Next is a collection of the currently two available CSS themes.

### Themes

Currently there are only two available themes, although you are welcomed to come up with your own and even share them, I'll gladly post them here and give due credit. These themes are showcased in the showcase, excuse the redundancy.

#### Default theme

```ts
const defaultTheme: ITheme = {
  general: {
    '--my-highlight-color': '#1EA3CC',
    '--my-icon-color': '#FFF',
  },
  input: {
    '--input-border-radius': '4px',
    '--input-border-color': '#EBEBEB',
    '--input-background-color': '#FAFBFC',
    '--input-focused-color': '#FFF',
    '--input-label-color': '#A4A4A4',
    '--input-valid-color': '#28A745',
    '--input-invalid-color': '#DC3545'
  },
  range: {
    '--range-progressbar-background-color': '#EBEBEB',
    '--range-indicator-background-color': '#484848',
    '--range-indicator-color': '#FFF',
  },
  checkbox: {
    '--checkbox-color': '#FFF',
    '--checkbox-hover-color': '#CCC',
    '--checkbox-animation-duration': '200ms',
    '--checkbox-background-color': '#E6E6E6',
  }
}
```

#### Dark theme

```ts
const darkTheme: ITheme = {
  general: {
    '--my-highlight-color': '#E87C03',
    '--my-icon-color': '#484848'
  },
  input: {
    '--input-border-radius': '4px',
    '--input-border-color': '#EBEBEB',
    '--input-background-color': '#383838',
    '--input-focused-color': '#2F2F2F',
    '--input-label-color': '#C4C4C4',
    '--input-valid-color': '#E87C03',
    '--input-invalid-color': '#E87C03'
  },
  range: {
    '--range-progressbar-background-color': '#2F2F2F',
    '--range-indicator-background-color': '#2F2F2F',
    '--range-indicator-color': '#FFF',
  },
  checkbox: {
    '--checkbox-color': '#FFF',
    '--checkbox-hover-color': '#383838',
    '--checkbox-animation-duration': '200ms',
    '--checkbox-background-color': '#2F2F2F'
  }
}
```

---

## License

MIT © [rmolinamir](https://github.com/rmolinamir)
