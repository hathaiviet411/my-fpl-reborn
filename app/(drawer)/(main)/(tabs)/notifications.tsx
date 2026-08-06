import { useTranslation } from 'react-i18next';

import { ScreenPlaceholder } from '@/src/components/ScreenPlaceholder';

export default function NotificationsScreen() {
  const { t } = useTranslation();

  return (
    <ScreenPlaceholder
      description={t('notifications.description')}
      title={t('navigation.notifications')}
    />
  );
}
