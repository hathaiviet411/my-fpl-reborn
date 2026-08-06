import { useTranslation } from 'react-i18next';

import { ScreenPlaceholder } from '@/src/components/ScreenPlaceholder';

export default function LeaguesScreen() {
  const { t } = useTranslation();

  return (
    <ScreenPlaceholder
      title={t('navigation.leagues')}
      description={t('leagues.description')}
    />
  );
}
