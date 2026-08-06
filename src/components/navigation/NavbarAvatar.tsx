import { Image, StyleSheet, View } from 'react-native';

import {
  NAVBAR_ACTION_SIZE,
  NAVBAR_AVATAR_BORDER_WIDTH,
} from '@/src/components/navigation/navbarConfig';
import { useAvatarImageSource } from '@/src/features/avatar/hooks/useAvatarImageSource';
import { useAuthStore } from '@/src/stores/authStore';
import { colors } from '@/src/theme/colors';

type NavbarAvatarProps = {
  avatarImage?: string | null;
};

export function NavbarAvatar({ avatarImage = null }: NavbarAvatarProps) {
  const user = useAuthStore((state) => state.user);
  const { source, isLoading } = useAvatarImageSource({
    avatarImage,
    userKey: user?.email,
  });

  const imageSize =
    NAVBAR_ACTION_SIZE - NAVBAR_AVATAR_BORDER_WIDTH * 2;

  return (
    <View style={styles.shell}>
      {source && !isLoading ? (
        <Image
          accessibilityLabel={user?.name ?? 'Student avatar'}
          resizeMode="cover"
          source={source}
          style={[styles.image, { width: imageSize, height: imageSize }]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    width: NAVBAR_ACTION_SIZE,
    height: NAVBAR_ACTION_SIZE,
    borderRadius: NAVBAR_ACTION_SIZE / 2,
    borderWidth: NAVBAR_AVATAR_BORDER_WIDTH,
    borderColor: colors.white,
    backgroundColor: 'rgba(221, 221, 221, 0.87)',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderRadius: (NAVBAR_ACTION_SIZE - NAVBAR_AVATAR_BORDER_WIDTH * 2) / 2,
  },
});
