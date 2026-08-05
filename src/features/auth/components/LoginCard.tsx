import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/src/theme/colors';

type LoginCardProps = {
  children: ReactNode;
};

export function LoginCard({ children }: LoginCardProps) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardGlass,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 12,
    padding: 24,
    overflow: 'hidden',
  },
});
