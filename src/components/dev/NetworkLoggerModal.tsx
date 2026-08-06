import { Modal, StyleSheet, Text, View } from 'react-native';
import NetworkLogger from 'react-native-network-logger';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppPressable } from '@/src/components/ui/AppPressable';
import { colors } from '@/src/theme/colors';

type NetworkLoggerModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function NetworkLoggerModal({
  visible,
  onClose,
}: NetworkLoggerModalProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="fullScreen"
      statusBarTranslucent={false}
      visible={visible}
    >
      <View
        style={[
          styles.root,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <View style={styles.header}>
          <Text accessibilityRole="header" style={styles.title}>
            Network Logger
          </Text>
          <AppPressable
            accessibilityLabel="Close network logger"
            accessibilityRole="button"
            onPress={onClose}
            style={styles.closeButton}
          >
            <Text style={styles.closeLabel}>Close</Text>
          </AppPressable>
        </View>

        <View style={styles.logger}>
          <NetworkLogger theme="light" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.stroke,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.headline,
  },
  closeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.primaryMuted,
  },
  closeLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },
  logger: {
    flex: 1,
  },
});
