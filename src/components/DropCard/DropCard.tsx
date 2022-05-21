import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Routes } from '@/constants/routes';
import { Size } from '@/types/common';
import { getMediaImage } from '@/helpers/getMediaImage';
import { TRequest } from '@/store/gallery/types';

import styles from './DropCard.module.scss';

interface IHottestCard extends TRequest {
  size?: Size;
}

export const DropCard: React.FC<IHottestCard> = (props) => {
  const { _id, name, images, gallery, size = Size.XS } = props;

  return (
    <Link to={`${Routes.Drop}/${_id}`} className={cn(styles.drop, styles[`dropSize${size}`])}>
      <img src={getMediaImage(images[0].fileName)} alt={`Listing ID Image`} className={styles.image} />
      <div className={styles.content}>
        <div className={styles.info}>
          <span className={styles.name}>{name}</span>
          <span className={styles.gallery}>{gallery.name}</span>
        </div>
      </div>
    </Link>
  );
};
