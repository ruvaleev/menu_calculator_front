import React, { useState } from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

import ButtonLink from './ButtonLink';
import { chooseNewLocale } from './functions';

function ToggleLocaleButton() {
  const [locale, setLocale] = useState(chooseNewLocale());

  const { t } = useTranslation();

  return (
    <ButtonLink
      title={t('change language')}
      callback={() => {
        i18next.changeLanguage(locale);
        setLocale(chooseNewLocale());
      }}
    />
  );
}

export default ToggleLocaleButton;
