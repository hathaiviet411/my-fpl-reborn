import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/theme/colors';

export function SignUpFooter() {
  return (
    <View style={styles.row}>
      <Text style={styles.text}>Don&apos;t have an account?</Text>
      <Pressable
        onPress={() => Alert.alert('Coming soon', 'Sign up is not available yet.')}
      >
        <Text style={styles.link}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.grey,
  },
  link: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.link,
  },
});
