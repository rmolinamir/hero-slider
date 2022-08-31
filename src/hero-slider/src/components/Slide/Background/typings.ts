import type CSS from 'csstype';
import { TAnyFunction } from '../../../typings/definitions';

/**
 * Type definition for `BackgroundProps.backgroundAnimation`.
 */
export enum EBackgroundAnimations {
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
  shouldLazyLoad?: boolean;
  lazyLoadingOffset?: number;
  backdropFilter?: CSS.Properties['backdropFilter'];
  backfaceVisibility?: CSS.Properties['backfaceVisibility'];
  background?: CSS.Properties['background'];
  backgroundAttachment?: CSS.Properties['backgroundAttachment'];
  backgroundBlendMode?: CSS.Properties['backgroundBlendMode'];
  backgroundClip?: CSS.Properties['backgroundClip'];
  backgroundColor?: CSS.Properties['backgroundColor'];
  backgroundImage?: CSS.Properties['backgroundImage'];
  backgroundOrigin?: CSS.Properties['backgroundOrigin'];
  backgroundPosition?: CSS.Properties['backgroundPosition'];
  backgroundPositionX?: CSS.Properties['backgroundPositionX'];
  backgroundPositionY?: CSS.Properties['backgroundPositionY'];
  backgroundRepeat?: CSS.Properties['backgroundRepeat'];
  backgroundSize?: CSS.Properties['backgroundSize'];
  backgroundAnimationDuration?: CSS.Properties['backgroundSize'];
  backgroundAnimationDelay?: CSS.Properties['backgroundSize'];
  backgroundAnimation?: EBackgroundAnimations;
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
  width?: CSS.Properties['width'];
  height?: CSS.Properties['height'];
  alt?: string;
  src?: string;
  onLoad?: TAnyFunction;
}
