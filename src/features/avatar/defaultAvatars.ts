export const DEFAULT_AVATAR_KEYS = [
  'alien',
  'cat',
  'cow',
  'dog',
  'koala',
  'ninja',
  'owl',
  'rabbit',
  'tiger',
] as const;

export type DefaultAvatarKey = (typeof DEFAULT_AVATAR_KEYS)[number];

export const defaultAvatarSources: Record<
  DefaultAvatarKey,
  number
> = {
  alien: require('@/assets/avatar-default/alien.png'),
  cat: require('@/assets/avatar-default/cat.png'),
  cow: require('@/assets/avatar-default/cow.png'),
  dog: require('@/assets/avatar-default/dog.png'),
  koala: require('@/assets/avatar-default/koala.png'),
  ninja: require('@/assets/avatar-default/ninja.png'),
  owl: require('@/assets/avatar-default/owl.png'),
  rabbit: require('@/assets/avatar-default/rabbit.png'),
  tiger: require('@/assets/avatar-default/tiger.png'),
};

export function isDefaultAvatarKey(value: string): value is DefaultAvatarKey {
  return (DEFAULT_AVATAR_KEYS as readonly string[]).includes(value);
}

export function pickRandomDefaultAvatarKey(): DefaultAvatarKey {
  const index = Math.floor(Math.random() * DEFAULT_AVATAR_KEYS.length);
  return DEFAULT_AVATAR_KEYS[index] ?? 'cat';
}

export function getDefaultAvatarSource(key: DefaultAvatarKey) {
  return defaultAvatarSources[key];
}
