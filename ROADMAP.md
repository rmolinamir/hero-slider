# Roadmap

## v3.X

- [ ] Fix an issue where in the case of there being two `hero-slider` components rendered at once, the Singleton will have conflicts when used by each of the rendered Sliders.
- [ ] Export the behavior hooks from the Modules so that users can make their own customized `hero-slider` components.
- [ ] Improve the way `Slide` component `label` prop works (previously `navDescription`). I think the nav should be the component getting the descriptions, or maybe support both ways with one taking priority over the other. But having it in the `Slider`, at least, feels awkward.
- [ ] Add `onDebounce: 'reset' | 'resume'` option/prop to the `Autoplay` module.
- [ ] Unit tests for `hero-slider`, especially for the most complicated modules.
- [ ] The case when a `Slide` is dynamically unmounted is not tested. I suspect an issue would arise where it would affect the slide number sequences created by the `Manager` moduled and consumed used by the modules. A fix to this would be to, instead of using a number to identify slides, use the Slide refs. This would affect the `Controller` module however, and everything that consumes its behavior functions, and possibly other modules, such as `Autoplay`. Another option is to always "reshuffle" the slide numbers, although this might be necessary anyway. Either way, there is no rush to support this edge case. I expect data to be static in the vast majority of scenarios.
- [ ] Optimize the `hero-slider` if it's worth it, optimize for performance but **only when and where** it makes sense. COFL. Code First, Optimize Later.
- [x] Implement a Logger singleton to easily hide logs, this will help to analyze re-render chain to improve performance.
- [ ] Profiling.
