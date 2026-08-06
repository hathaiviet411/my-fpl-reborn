import { useEffect, useState } from 'react';
import type { ImageSourcePropType } from 'react-native';

import { resolvePersistedDefaultAvatarSource } from '@/src/features/avatar/persistedDefaultAvatar';

type UseAvatarImageSourceParams = {
  avatarImage?: string | null;
  userKey?: string | null;
};

export function useAvatarImageSource({
  avatarImage,
  userKey,
}: UseAvatarImageSourceParams) {
  const [defaultSource, setDefaultSource] = useState<ImageSourcePropType | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(!avatarImage);

  useEffect(() => {
    if (avatarImage) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    void resolvePersistedDefaultAvatarSource(userKey?.trim() || 'guest').then(
      (source) => {
        if (!cancelled) {
          setDefaultSource(source);
          setIsLoading(false);
        }
      },
    );

    return () => {
      cancelled = true;
    };
  }, [avatarImage, userKey]);

  if (avatarImage) {
    return {
      source: { uri: avatarImage } satisfies ImageSourcePropType,
      isLoading: false,
    };
  }

  return {
    source: defaultSource,
    isLoading,
  };
}
