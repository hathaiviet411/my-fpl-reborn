import Constants from 'expo-constants';

export function getExpoProjectId(): string | null {
  const envProjectId = process.env.EXPO_PUBLIC_EAS_PROJECT_ID;
  const projectId =
    (typeof envProjectId === 'string' && envProjectId.length > 0
      ? envProjectId
      : null) ??
    Constants.expoConfig?.extra?.eas?.projectId ??
    Constants.easConfig?.projectId;

  return typeof projectId === 'string' && projectId.length > 0
    ? projectId
    : null;
}
