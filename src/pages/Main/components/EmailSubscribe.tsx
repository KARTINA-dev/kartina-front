import React, { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';

import { useTranslation } from '@/i18n';
import { InputString } from '@/components/Input/Input';
import api from '@/api';

import styles from './EmailSubscribe.module.scss';

interface IEmailSubscribeProps {
  dropId?: string;
  title: string;
}

export const EmailSubscribe: React.FC<IEmailSubscribeProps> = ({ dropId, title }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { t } = useTranslation();

  const subscribeEmail = () => {
    if (email) {
      if (dropId) {
        api.requests
          .subscribeHottestRequest(email, dropId)
          .then(() => setSubscribed(true))
          .catch(console.error);

        return;
      }
      api.mail
        .subscribeEmail(email)
        .then(() => setSubscribed(true))
        .catch(console.error);
    }
  };

  return (
    <div className={styles.subscribe}>
      <h2 className={styles.subscribeTitle}>{title}</h2>
      <div className={styles.subscribeForm}>
        {subscribed ? (
          <AiOutlineCheck className={styles.subscribeFormIcon} />
        ) : (
          <>
            <InputString
              type={'email'}
              className={styles.subscribeInput}
              placeholder={t((d) => d.subscribeForm.email)}
              onChange={setEmail}
            />
            <button className={styles.subscribeButton} onClick={subscribeEmail}>
              {t((d) => d.subscribeForm.subscribe)}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
