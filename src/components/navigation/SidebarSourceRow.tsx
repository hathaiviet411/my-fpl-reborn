import { StyleSheet, Text, View } from 'react-native';

import { AppPressable } from '@/src/components/ui/AppPressable';
import { colors } from '@/src/theme/colors';

import { TabBarIcon } from './TabBarIcon';
import { SIDEBAR_ICON_SIZE, type SidebarItem } from './sidebarItems';

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
  const iconColor = selected ? colors.primary : colors.sidebarTextSecondary;

  return (
    <AppPressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.row, selected && styles.rowSelected]}
    >
      <View style={styles.iconSlot}>
        <TabBarIcon
          Icon={item.Icon}
          color={iconColor}
          size={SIDEBAR_ICON_SIZE}
        />
      </View>
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {item.label}
      </Text>
    </AppPressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 40,
    marginHorizontal: 8,
    marginVertical: 1,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  rowSelected: {
    backgroundColor: colors.sidebarSelection,
  },
  iconSlot: {
    width: 28,
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    marginLeft: 10,
    color: colors.sidebarText,
  },
  labelSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
});
