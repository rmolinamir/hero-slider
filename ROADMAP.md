# Roadmap

## v3.0.0-alpha

- [x] Import `hero-slider` changes from v2.x, improvements, and hot fixes, and everything else except for the `styled-components` addition.
  - [x] Props should be optional.
  - [x] Change name of `SliderContext` to something like `SliderStateContext`.
  - [x] Replace `React.useContext(SliderContext);` calls for a custom hook that returns the state of the context.
  - [x] Improve the `Slider.tsx` component, split logic into different hooks for different behavior-driven modules such as settings, dimensions, slide manager, transitions/animations, touch event handlers, and autoplay.
- [x] There is a race condition between the `Slide` *animation* CSS classes being applied and the *active* CSS classes. This leads to jankiness when doing slides, because if the z-index changes happen before the animation CSS classes are applied, the next slide will flash on top of the current slide then disappear and slide in afterwards.
  - [x] The weird thing is that this **only** seems to happen when changing **sliding directions**. Not sure why...
- [x] Currently in the modules, there is a shitty pattern that mixes the props with the state, and that forces too much data replication to update state if props change, this should be fixed. A solution is to simply update the first generic of the `React.createContext` function and add the props that should be exposed and proxied in there.
- [x] Deal with TODOs.
- [x] Add classes to `hero-slider` such as `.Slider`, `.Slide`, etc. The goal is to allow other developers to target my components through CSS and customize their styling.
- [x] Address the open issues of v2.x.
- [ ] Optimize the `hero-slider` if it's worth it, optimize for performance but **only when and where** it makes sense. COFL. Code First, Optimize Later.
  - [ ] Implement a Logger singleton to easily hide telemetry, this will help to analyze re-render chain to improve performance.
    - [ ] Telemetry static class could contain decorators to analyze rerenders and performance, not sure if possible in React though.
- [ ] Improve the way Slide `label` works (previously `navDescription`). I think the nav should be the component getting the descriptions, or maybe support both ways with one taking priority over the other. But having it in the Slider, at least, feels awkward.
- [ ] **(MAYBE - Depends on how much time I will ultimately invest)** Unit tests for `hero-slider`, especially for the different modules.
- [ ] The case when a Slides is dynamically unmounted is not supported. The issue is that this would affect the slide number sequences used by the modules. A fix to this would be to, instead of using a number to identify slides, use the Slide refs. This would affect the `Controller` module however, and everything that consumes its behavior functions, and possibly other modules, such as `Autoplay`. Another option is to always "reshuffle" the slide numbers, although this might be necessary anyway. Either way, there is no rush to support this edge case. This is a **hero-slider** after all, where data will be static in the vast majority of scenarios.
- [ ] Add `onDebounce: 'reset' | 'resume'` option/prop to the `Autoplay` module.
