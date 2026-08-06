import { Image, StyleSheet, Text, View } from 'react-native';

import { useAvatarImageSource } from '@/src/features/avatar/hooks/useAvatarImageSource';
import { colors } from '@/src/theme/colors';

export type AvatarCardProps = {
  /** Remote image URL. When omitted, a persisted random default avatar is used. */
  avatarImage?: string | null;
  studentName?: string | null;
  studentEmail?: string | null;
};

const AVATAR_SIZE = 60;
const CARD_MIN_HEIGHT = 76;

export function AvatarCard({
  avatarImage = null,
  studentName = null,
  studentEmail = null,
}: AvatarCardProps) {
  const { source, isLoading } = useAvatarImageSource({
    avatarImage,
    userKey: studentEmail,
  });

  const hasName = Boolean(studentName?.trim());
  const hasEmail = Boolean(studentEmail?.trim());

  return (
    <View style={styles.card}>
      <View style={styles.avatarShell}>
        {source && !isLoading ? (
          <Image
            accessibilityLabel={
              hasName ? `${studentName} avatar` : 'Student avatar'
            }
            resizeMode="cover"
            source={source}
            style={styles.avatarImage}
          />
        ) : null}
      </View>

      {(hasName || hasEmail) && (
        <View style={styles.textColumn}>
          {hasName ? (
            <Text numberOfLines={1} style={styles.studentName}>
              {studentName}
            </Text>
          ) : null}
          {hasEmail ? (
            <Text numberOfLines={1} style={styles.studentEmail}>
              {studentEmail}
            </Text>
          ) : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: CARD_MIN_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 12,
  },
  avatarShell: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: 'rgba(221, 221, 221, 0.87)',
    overflow: 'hidden',
  },
  avatarImage: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
  textColumn: {
    flex: 1,
    justifyContent: 'center',
    gap: 2,
  },
  studentName: {
    fontSize: 12,
    color: '#1E1E1E',
    textTransform: 'uppercase',
  },
  studentEmail: {
    fontSize: 12,
    color: 'rgba(30, 30, 30, 0.76)',
  },
});
