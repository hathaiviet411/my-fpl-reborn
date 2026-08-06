import { useTranslation } from 'react-i18next';

import { ScreenPlaceholder } from '@/src/components/ScreenPlaceholder';

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <ScreenPlaceholder
      title={t('navigation.home')}
      description={t('home.description')}
    />
  );
}
