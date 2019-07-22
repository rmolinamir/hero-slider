import {
  BackdropFilterProperty,
  BackfaceVisibilityProperty,
  BackgroundProperty,
  BackgroundAttachmentProperty,
  BackgroundClipProperty,
  BackgroundColorProperty,
  BackgroundImageProperty,
  BackgroundOriginProperty,
  BackgroundPositionProperty,
  BackgroundPositionXProperty,
  BackgroundPositionYProperty,
  BackgroundRepeatProperty,
  BackgroundSizeProperty,
  BackgroundBlendModeProperty,
  WidthProperty,
  HeightProperty,
  TAnyFunction,
} from '../../../typings/definitions';

/**
 * Type definition for `IBackgroundProps.backgroundAnimation`.
 */
export enum EBackgroundAnimations {
  FADE = 'fade',
  ZOOM = 'zoom',
}

/**
 * `IBackgroundProps` interface for the `Background` JSX
 * component's props used inside the `Slide` components.
 * The `Slide` components `background` prop is also defined
 * by `IBackgroundProps`.
 */
export interface IBackgroundProps {
  shouldLazyLoad?: boolean;
  lazyLoadingOffset?: number;
  backdropFilter?: BackdropFilterProperty;
  backfaceVisibility?: BackfaceVisibilityProperty;
  background?: BackgroundProperty<string | number>;
  backgroundAttachment?: BackgroundAttachmentProperty;
  backgroundBlendMode?: BackgroundBlendModeProperty;
  backgroundClip?: BackgroundClipProperty;
  backgroundColor?: BackgroundColorProperty;
  backgroundImage?: BackgroundImageProperty;
  backgroundOrigin?: BackgroundOriginProperty;
  backgroundPosition?: BackgroundPositionProperty<string | number>;
  backgroundPositionX?: BackgroundPositionXProperty<string | number>;
  backgroundPositionY?: BackgroundPositionYProperty<string | number>;
  backgroundRepeat?: BackgroundRepeatProperty;
  backgroundSize?: BackgroundSizeProperty<string | number>;
  backgroundAnimationDuration?: number;
  backgroundAnimationDelay?: number;
  backgroundAnimation?: EBackgroundAnimations;
  maskBackgroundBlendMode?: BackgroundBlendModeProperty;
  width?: WidthProperty<string | number>;
  height?: HeightProperty<string | number>;
  alt?: string;
  src: string | undefined;
  onLoad: TAnyFunction;
}
