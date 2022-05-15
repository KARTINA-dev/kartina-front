import React, { ChangeEvent, useState } from 'react';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';

import { TItem } from '@/store/user/types';
import { useTranslation } from '@/i18n';
import { getIPFSImage } from '@/helpers/getIPFSImage';
import { Routes } from '@/constants/routes';

import styles from './ItemCard.module.scss';

interface IItemCard extends TItem {
  createListing?: (id: number, price: string) => Promise<void>;
}

export const ItemCard: React.FC<IItemCard> = (props) => {
  const { name, imageCID, imagePath, itemID, owner, createListing, resourceID } = props;
  const { t } = useTranslation();
  const [listModalVisible, setListModalVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [newListingPrice, setNewListingPrice] = useState<string>('0.0');

  const handleConfirmList = async (itemId: number, newListingPrice: string) => {
    setConfirmLoading(true);
    await createListing!(itemId, parseFloat(newListingPrice).toFixed(3).toString());
    setConfirmLoading(false);
    setListModalVisible(false);
  };

  return (
    <Link to={`${Routes.Item}/${owner}/${itemID}`}>
      <div className={styles.item}>
        <img src={getIPFSImage({ imageCID, imagePath })} alt={`Item ${itemID}`} className={styles.image} />
        <span className={styles.owner}>{owner}</span>
        <div className={styles.content}>
          <div className={styles.info}>
            <span className={styles.name}>{name}</span>
            <span>{`#${itemID}`}</span>
          </div>
          {createListing && (
            <>
              <button className={styles.button} onClick={() => setListModalVisible(true)}>
                {t((d) => d.item.list)}
              </button>
              <Modal
                visible={listModalVisible}
                onOk={() => handleConfirmList(itemID, newListingPrice)}
                confirmLoading={confirmLoading}
                onCancel={() => setListModalVisible(false)}
              >
                <label>
                  Enter price:
                  <input
                    type='number'
                    value={newListingPrice}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewListingPrice(e.target.value)}
                  />
                </label>
              </Modal>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
