import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/theme/colors';

import type { SidebarItem } from './sidebarItems';

type SidebarSourceRowProps = {
  item: SidebarItem;
  selected: boolean;
  onPress: () => void;
};

export function SidebarSourceRow({
  item,
  selected,
  onPress,
}: SidebarSourceRowProps) {
  const iconName = selected
    ? (item.icon.replace('-outline', '') as typeof item.icon)
    : item.icon;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        selected && styles.rowSelected,
        pressed && styles.rowPressed,
      ]}
    >
      <Ionicons
        name={iconName}
        size={18}
        color={selected ? colors.primary : colors.sidebarTextSecondary}
        style={styles.icon}
      />
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {item.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 34,
    marginHorizontal: 8,
    marginVertical: 1,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  rowSelected: {
    backgroundColor: colors.sidebarSelection,
  },
  rowPressed: {
    opacity: 0.85,
  },
  icon: {
    width: 22,
  },
  label: {
    fontSize: 15,
    color: colors.sidebarText,
  },
  labelSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
});
