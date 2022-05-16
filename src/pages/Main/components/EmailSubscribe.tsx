import React, { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';

import { useTranslation } from '@/i18n';
import { InputString } from '@/components/Input/Input';
import api from '@/api';
import styles from './EmailSubscribe.module.scss';

export const EmailSubscribe: React.VFC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { t } = useTranslation();

  const subscribeEmail = () => {
    if (email) {
      api.mail
        .subscribeEmail(email)
        .then(() => setSubscribed(true))
        .catch(console.error);
    }
  };

  return (
    <div className={styles.subscribe}>
      <h2 className={styles.subscribeTitle}>{t((d) => d.main.subscribeForm.title)}</h2>
      <div className={styles.subscribeForm}>
        {subscribed ? (
          <AiOutlineCheck className={styles.subscribeFormIcon} />
        ) : (
          <>
            <InputString
              type={'email'}
              className={styles.subscribeInput}
              placeholder={t((d) => d.main.subscribeForm.email)}
              onChange={setEmail}
            />
            <button className={styles.subscribeButton} onClick={subscribeEmail}>
              {t((d) => d.main.subscribeForm.subscribe)}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
