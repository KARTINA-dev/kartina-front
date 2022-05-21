import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { useAuthentication } from '@/helpers/useAuthentication';
import { Routes } from '@/constants/routes';
import { Header } from '@/components/Header/Header';
import { useDrop } from '@/pages/Drop/hooks';
import { getMediaImage } from '@/helpers/getMediaImage';
import { useTranslation } from '@/i18n';
import { EmailSubscribe } from '@/pages/Main/components/EmailSubscribe';

import styles from './Drop.module.scss';

const Drop: React.FC = () => {
  const { login, isAuthenticated } = useAuthentication();
  const { dropId } = useParams();
  const { drop } = useDrop(dropId);
  const { t } = useTranslation();

  return (
    <div className={styles.dropPage}>
      <Header pathname={Routes.Drop} login={login} isAuthenticated={isAuthenticated} />
      {drop ? (
        <div>
          <div className={styles.drop}>
            <img src={getMediaImage(drop.images[0].fileName)} className={styles.image} alt={'Drop main image'} />
            <div className={styles.info}>
              <div className={styles.mainInfo}>
                {drop.name}
                <Link to={'#'}>
                  <span className={styles.artist}>
                    {t((d) => d.collections.galleryPrefix, { gallery: drop.gallery.name })}
                  </span>
                </Link>
              </div>
              <span>{drop.description}</span>
            </div>
          </div>
          <EmailSubscribe dropId={drop._id} title={t((d) => d.subscribeForm.titleHottest)} />
        </div>
      ) : (
        <h1 className={styles.notFound}>{t((d) => d.drop.notFound)}</h1>
      )}
    </div>
  );
};

export default Drop;
