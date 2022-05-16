import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Header } from '@/components/Header/Header';
import { Routes } from '@/constants/routes';
import { useTranslation } from '@/i18n';

import styles from './Collection.module.scss';

const Collection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.collection}>
      <Header pathname={Routes.Collections} />
      <div className={styles.content}>
        <h1 className={styles.name}>
          UI kit
          <Link className={styles.gallery} to={'#'}>
            {t((d) => d.collections.galleryPrefix, { gallery: '345 Gallery' })}
          </Link>
        </h1>
        <div className={styles.info}>
          <table className={styles.details}>
            <tr className={styles.row}>
              <td className={cn(styles.cell, styles.fieldName)}>Artists</td>
              <td className={cn(styles.cell, styles.fieldValue)}>Playboy Cart, Saluki Gog, G. Alfredo, Vincent V.</td>
            </tr>
            <tr className={styles.row}>
              <td className={cn(styles.cell, styles.fieldName)}>Painting styles</td>
              <td className={cn(styles.cell, styles.fieldValue)}>Expressionism, Abstraction</td>
            </tr>
            <tr className={styles.row}>
              <td className={cn(styles.cell, styles.fieldName)}>Floor price</td>
              <td className={cn(styles.cell, styles.fieldValue)}>3205.43 FLOW</td>
            </tr>
            <tr className={styles.row}>
              <td className={cn(styles.cell, styles.fieldName)}>Assets</td>
              <td className={cn(styles.cell, styles.fieldValue)}>7</td>
            </tr>
          </table>
          <div className={styles.description}>
            This scene, dated 1849, shows the first ploughing or dressing, which was done in early autumn to break the
            surface of the soil and aerate it during the winter. The pretty rolling countryside with wooded hills in the
            distance provides the background for two teams of oxen pulling heavy ploughs. The freshly turned soil scores
            the foreground. Attention is focused on the first team of Charolais-Nivernais cattle, whose light russet and
            white coats gleam in the cold, pale light. <br />
            <br /> It is primarily an animal painting, and the heroes are the oxen themselves, leaving little room for
            the men: the cowherd is a diminutive figure. It is a hymn to agricultural labour, whose grandeur was
            magnified because, in these post-revolutionary days, it was easy to contrast with the corruption of the
            city. It is also tribute to provincial regions – here the Nivernais, with its agricultural traditions and
            rural landscapes.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
