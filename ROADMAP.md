# v3.0.0-alpha Roadmap

- [ ] Import `hero-slider` changes from v2.x, improvements, and hot fixes, and everything else except for the `styled-components` addition.
  - [x] Props should be optional.
  - [ ] Improve the `Slider.tsx` component, split logic into different hooks for different behavior-driven modules such as settings, dimensions, slide manager, transitions/animations, touch event handlers, and autoplay.
  - [ ] Change name of `SliderContext` to something like `SliderStateContext`.
  - [ ] Replace `React.useContext(SliderContext);` calls for a custom hook that returns the state of the context.
  - [ ] Logger singleton to easily hide telemetry.
  - [ ] Deal with TODOs.
- [ ] Improve the `hero-slider` logic such as the hooks and the root component, optimize for performance ONLY when and where it makes sense. Code First, Optimize Later.
- [ ] Address the open issues and PRs of v2.x.
- [ ] Add classes to `hero-slider` such as `.Slider`, `.Slide`, etc. The goal is to allow other developers to target my components through CSS and customize their styling.
- [ ] The space of the next/prev slide arrows of the slider on where the user can click does not match their actual rendered image.
- [ ] **(MAYBE - Depends on how much time I will ultimately invest)** Unit tests for `hero-slider`, especially for the timeout and autoplay modules.
