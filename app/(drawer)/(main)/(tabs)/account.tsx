import { useTranslation } from 'react-i18next';

import { ScreenPlaceholder } from '@/src/components/ScreenPlaceholder';

export default function AccountScreen() {
  const { t } = useTranslation();

  return (
    <ScreenPlaceholder
      description={t('account.description')}
      title={t('navigation.account')}
    />
  );
}
