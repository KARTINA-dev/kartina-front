import cn from 'classnames';
import React from 'react';

import { RequestStatus } from '@/store/gallery/types';
import { getMediaImage } from '@/helpers/getMediaImage';
import { useSelector } from '@/store/hooks';
import { useTranslation } from '@/i18n';

import { useRequests } from './hooks';
import styles from './Requests.module.scss';

export const Requests: React.VFC = () => {
  const { t } = useTranslation();
  const { _id: galleryId } = useSelector((state) => state.gallery);
  const { requests } = useRequests(galleryId);

  return (
    <>
      <p>{t((d) => d.manage.requests.description)}</p>
      <div className={styles.requests}>
        {requests.length > 0 &&
          requests.map(({ _id, name, images, status }) => (
            <div key={_id} className={styles.request}>
              <div className={styles.header}>
                <div className={styles.label}>
                  <h3 className={styles.name}>{name}</h3>
                  <span className={cn(styles.status, { [styles.statusError]: status === RequestStatus.Declined })}>
                    {t((d) => d.manage.status[status])}
                  </span>
                </div>
              </div>

              <div className={styles.images}>
                {images?.length
                  ? images.map(({ name, artist, price, fileName }) => (
                      <div key={fileName} className={styles.imageCard}>
                        <img src={getMediaImage(fileName)} alt={`Request Image`} className={styles.image} />
                        <div className={styles.content}>
                          <span className={styles.name}>{name}</span>
                          <span className={styles.artistName}>{artist}</span>
                          <span className={styles.price}>
                            {t((d) => d.flow.amount, { amount: parseFloat(price).toFixed(3) })}
                          </span>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
