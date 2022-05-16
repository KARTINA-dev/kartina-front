import React from 'react';
import cn from 'classnames';
import { AiOutlineSearch } from 'react-icons/ai';
import { Checkbox, Slider } from 'antd';

import { ReactComponent as FlowIcon } from '@/assets/icons/flow_12.svg';
import { useTranslation } from '@/i18n';
import { Spinner } from '@/components/Spinner/Spinner';
import { Size } from '@/types/common';
import { Header } from '@/components/Header/Header';
import { Routes } from '@/constants/routes';
import { useFilter, useListings } from '@/pages/Market/hooks';
import { ListingCard } from '@/components/ListingCard/ListingCard';
import { InputNumber, InputString } from '@/components/Input/Input';
import { useAuthentication } from '@/helpers/useAuthentication';

import styles from './Market.module.scss';

const ARTISTS = [
  { label: 'Alfredo G.', value: 'Alfredo G.' },
  { label: 'Тишин В.', value: 'Тишин В.' },
  { label: 'Лазарев В.', value: 'Лазарев В.' },
  { label: 'Аршакуни В.', value: 'Аршакуни В.' },
];

const COUNTRIES = [{ label: 'Россия', value: 'ru' }];

const Market: React.VFC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, login, isLoading } = useAuthentication();
  const { filter, onFilterChange } = useFilter();
  const { listings } = useListings({ filter });

  if (isLoading) {
    return (
      <div className={cn(styles.main, styles.loading)}>
        <Spinner size={Size.L} />
      </div>
    );
  }

  return (
    <div className={styles.market}>
      <Header isAuthenticated={isAuthenticated} login={login} pathname={Routes.Main} />
      <div className={styles.content}>
        <div className={styles.filter}>
          <span className={styles.filterTitle}>{t((d) => d.market.filter.label)}</span>
          <div className={styles.filterItem}>
            <span className={styles.filterLabel}>{t((d) => d.market.filter.artist)}</span>
            <div className={styles.filterList}>
              <Checkbox.Group
                className={styles.checkboxGroup}
                options={ARTISTS}
                onChange={(value) => onFilterChange('artists', value)}
              />
            </div>
          </div>
          <div className={styles.filterItem}>
            <div className={styles.filterHeader}>
              <span className={styles.filterLabel}>{t((d) => d.market.filter.country)}</span>
            </div>
            <div className={styles.filterList}>
              <Checkbox.Group
                className={styles.checkboxGroup}
                options={COUNTRIES}
                onChange={(value) => onFilterChange('countires', value)}
              />
            </div>
          </div>
          <div className={styles.filterItem}>
            <span className={styles.filterLabel}>{t((d) => d.market.filter.price)}</span>
            <Slider
              className={styles.slider}
              value={filter.price}
              onChange={(value) => onFilterChange('price', value)}
              min={0}
              max={10000}
              tooltipVisible={false}
            />
            <InputNumber
              className={styles.filterInput}
              value={filter.price}
              prefix={<FlowIcon />}
              onChange={(value) => onFilterChange('price', value)}
              min={0}
              max={10000}
            />
          </div>
        </div>
        <div className={styles.list}>
          <InputString
            className={styles.search}
            value={filter.name}
            placeholder={t((d) => d.market.filter.searchPlaceholder)}
            prefix={<AiOutlineSearch />}
            onChange={(value) => onFilterChange('name', value)}
          />
          <div className={styles.listings}>
            {listings?.length
              ? listings.map((listing, index) => <ListingCard key={index} {...listing} size={Size.S} />)
              : null}
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <span className={styles.footerCompany}>{t((d) => d.footer.company)}</span>
        <span className={styles.footerCopyright}>{t((d) => d.footer.copyright)}</span>
      </footer>
    </div>
  );
};

export default Market;
