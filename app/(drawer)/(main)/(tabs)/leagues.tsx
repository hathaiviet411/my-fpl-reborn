import { useTranslation } from 'react-i18next';

import { ScreenPlaceholder } from '@/src/components/ScreenPlaceholder';

export default function LeaguesScreen() {
  const { t } = useTranslation();

  return (
    <ScreenPlaceholder
      title={t('navigation.grades')}
      description={t('grades.description')}
    />
  );
}
