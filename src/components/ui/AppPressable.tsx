import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

/** Matches the common TouchableOpacity feel used across the app. */
export const DEFAULT_ACTIVE_OPACITY = 0.7;

type AppPressableProps = PressableProps & {
  activeOpacity?: number;
  /** Use when the control already has custom press feedback (e.g. scale animation). */
  disableFeedback?: boolean;
};

function resolveStyle(
  style: StyleProp<ViewStyle> | ((state: { pressed: boolean }) => StyleProp<ViewStyle>),
  pressed: boolean,
): StyleProp<ViewStyle> {
  return typeof style === 'function' ? style({ pressed }) : style;
}

export function AppPressable({
  style,
  disabled,
  activeOpacity = DEFAULT_ACTIVE_OPACITY,
  disableFeedback = false,
  ...props
}: AppPressableProps) {
  return (
    <Pressable
      {...props}
      disabled={disabled}
      style={(state) => {
        const resolvedStyle = resolveStyle(style, state.pressed);

        if (disableFeedback || !state.pressed || disabled) {
          return resolvedStyle;
        }

        return [resolvedStyle, { opacity: activeOpacity }];
      }}
    />
  );
}
