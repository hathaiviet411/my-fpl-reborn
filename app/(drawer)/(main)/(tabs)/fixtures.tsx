import { useTranslation } from 'react-i18next';

import { ScreenPlaceholder } from '@/src/components/ScreenPlaceholder';

export default function FixturesScreen() {
  const { t } = useTranslation();

  return (
    <ScreenPlaceholder
      title={t('navigation.fixtures')}
      description={t('fixtures.description')}
    />
  );
}
