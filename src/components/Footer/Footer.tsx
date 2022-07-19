import React from 'react';

import { useTranslation } from '@/i18n';

import styles from './Footer.module.scss';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <span className={styles.footerCompany}>{t((d) => d.footer.company)}</span>
      <span className={styles.footerCopyright}>{t((d) => d.footer.copyright)}</span>
    </footer>
  );
};
