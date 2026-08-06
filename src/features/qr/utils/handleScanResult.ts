import { Linking } from 'react-native';

export function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export type ScanResultAction =
  | { type: 'opened_url'; url: string }
  | { type: 'invalid'; data: string };

export async function handleScanResult(data: string): Promise<ScanResultAction> {
  const trimmed = data.trim();

  if (!isHttpUrl(trimmed)) {
    return { type: 'invalid', data: trimmed };
  }

  const canOpen = await Linking.canOpenURL(trimmed);
  if (!canOpen) {
    return { type: 'invalid', data: trimmed };
  }

  await Linking.openURL(trimmed);
  return { type: 'opened_url', url: trimmed };
}
