import { useTranslation } from 'react-i18next';

import { ScreenPlaceholder } from '@/src/components/ScreenPlaceholder';

export default function SquadScreen() {
  const { t } = useTranslation();

  return (
    <ScreenPlaceholder
      title={t('navigation.squad')}
      description={t('squad.description')}
    />
  );
}
