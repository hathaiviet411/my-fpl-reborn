import { useEffect, useMemo, useState } from 'react';
import type { ImageSourcePropType } from 'react-native';

import { resolvePersistedDefaultAvatarSource } from '@/src/features/avatar/persistedDefaultAvatar';

type UseAvatarImageSourceParams = {
  avatarImage?: string | null;
  userKey?: string | null;
};

const avatarSourceCache = new Map<string, ImageSourcePropType>();

function resolveCacheKey(userKey?: string | null) {
  if (!userKey) {
    return null;
  }

  const trimmed = userKey.trim();
  return trimmed.length > 0 ? trimmed : 'guest';
}

export function useAvatarImageSource({
  avatarImage,
  userKey,
}: UseAvatarImageSourceParams) {
  const cacheKey = useMemo(() => resolveCacheKey(userKey), [userKey]);
  const cachedSource = cacheKey ? avatarSourceCache.get(cacheKey) : null;

  const [defaultSource, setDefaultSource] = useState<ImageSourcePropType | null>(
    cachedSource,
  );
  const [isLoading, setIsLoading] = useState(
    !avatarImage && Boolean(cacheKey) && !cachedSource,
  );

  useEffect(() => {
    if (avatarImage) {
      setIsLoading(false);
      return;
    }

    if (!cacheKey) {
      setDefaultSource(null);
      setIsLoading(true);
      return;
    }

    const cached = avatarSourceCache.get(cacheKey);
    if (cached) {
      setDefaultSource(cached);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    void resolvePersistedDefaultAvatarSource(cacheKey).then((source) => {
      if (cancelled) {
        return;
      }

      avatarSourceCache.set(cacheKey, source);
      setDefaultSource(source);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [avatarImage, cacheKey]);

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
