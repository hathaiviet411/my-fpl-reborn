import type { ComponentType } from 'react';
import { StyleSheet, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

type TabBarIconProps = {
  Icon: ComponentType<SvgProps>;
  color: string;
  size: number;
};

export function TabBarIcon({ Icon, color, size }: TabBarIconProps) {
  return (
    <View style={[styles.wrapper, { width: size, height: size }]}>
      <Icon color={color} height={size} width={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
