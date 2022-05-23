import React from 'react';
import cn from 'classnames';
import { AiOutlineSearch } from 'react-icons/ai';
import { Checkbox, Select, Slider } from 'antd';

import { ReactComponent as FlowIcon } from '@/assets/icons/flow_12.svg';
import { useTranslation } from '@/i18n';
import { Spinner } from '@/components/Spinner/Spinner';
import { Size } from '@/types/common';
import { Header } from '@/components/Header/Header';
import { Routes } from '@/constants/routes';
import { useArtistsOptions, useFilter, useListings } from '@/pages/Market/hooks';
import { ListingCard } from '@/components/ListingCard/ListingCard';
import { InputNumber, InputString } from '@/components/Input/Input';
import { useAuthentication } from '@/helpers/useAuthentication';
import { ListingsSort } from '@/store/market/types';

import styles from './Market.module.scss';

const COUNTRIES = [{ label: 'Россия', value: 'ru' }];
const MAX_PRICE = 50000;

const Market: React.VFC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, login, isLoading } = useAuthentication();
  const { filter, onFilterChange, sortOptions } = useFilter();
  const { listings } = useListings({ filter });
  const artistsOptions = useArtistsOptions();

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
                value={filter.artists}
                className={styles.checkboxGroup}
                options={artistsOptions}
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
              max={MAX_PRICE}
              tooltipVisible={false}
            />
            <InputNumber
              className={styles.filterInput}
              value={filter.price}
              prefix={<FlowIcon />}
              onChange={(value) => onFilterChange('price', value)}
              min={0}
              max={MAX_PRICE}
            />
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.header}>
            <InputString
              className={styles.search}
              value={filter.name}
              placeholder={t((d) => d.market.filter.searchPlaceholder)}
              prefix={<AiOutlineSearch />}
              onChange={(value) => onFilterChange('name', value)}
            />
            <Select
              className={styles.sort}
              value={filter.sort}
              options={sortOptions}
              onChange={(value: ListingsSort) => onFilterChange('sort', value)}
            />
          </div>
          <div className={styles.listings}>
            {listings?.length ? listings.map((listing) => <ListingCard key={listing.listingID} {...listing} />) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
