# Roadmap

## v3.0.0-alpha

- [ ] Import `hero-slider` changes from v2.x, improvements, and hot fixes, and everything else except for the `styled-components` addition.
  - [x] Props should be optional.
  - [x] Change name of `SliderContext` to something like `SliderStateContext`.
  - [x] Replace `React.useContext(SliderContext);` calls for a custom hook that returns the state of the context.
  - [ ] Improve the `Slider.tsx` component, split logic into different hooks for different behavior-driven modules such as settings, dimensions, slide manager, transitions/animations, touch event handlers, and autoplay.
  - [ ] Logger singleton to easily hide telemetry.
  - [ ] Telemetry static class containing decorators to analyze rerenders and performance, not sure if possible in React tho.
  - [ ] Deal with TODOs.
- [ ] Optimize the `hero-slider` if it's worth it, optimize for performance but **only when and where** it makes sense. COFL. Code First, Optimize Later.
- [ ] Add classes to `hero-slider` such as `.Slider`, `.Slide`, etc. The goal is to allow other developers to target my components through CSS and customize their styling.
- [ ] The space of the next/prev slide arrows of the slider on where the user can click does not match their actual rendered image.
- [ ] Improve the way `navDescription` works. I think the nav should be the component getting the descriptions, or maybe support both ways with one taking priority over the other. But having it in the Slider, at least, feels awkward.
- [ ] Address the open issues of v2.x.
- [ ] **(MAYBE - Depends on how much time I will ultimately invest)** Unit tests for `hero-slider`, especially for the different modules.
- [ ] The edge case when a Slides is dynamically unmounted is not supported. The issue is that this would affect the slide number sequences used by the modules. A fix to this would be to, instead of using a number to identify slides, use the Slide refs. This would affect the `Controller` module however, and everything that consumes its behavior functions, and possibly other modules, such as `Autoplay`. Another option is to always "reshuffle" the slide numbers, although this might be necessary anyway. Either way, there is no rush to support this edge case. This is a **hero-slider** after all, where data will be static in the vast majority of scenarios.
