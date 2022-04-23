import React, { ChangeEvent, useState, FormEvent } from 'react';
import { NFTStorage } from 'nft.storage';
import * as fcl from '@onflow/fcl';
import * as ft from '@onflow/types';

import { TRANSACTION_ITEMS_MINT } from '@/cadence/transactions/items/mint';
import { useSelector } from '@/store/hooks';
import { TArtItem } from '@/store/items/types';

import styles from './MintForm.module.scss';

const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEY2ODNEN0Y1MjkyQ0NmRDUxMTcwNDg3ODQyOTlGMjkzNzZiNDE3N0IiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0Njg0ODQxNzg1NSwibmFtZSI6ImthcnRpbmFTZXJnZXkifQ.GhItH0IC2tMxzebn6IjOR_QIJjMr4xkiouyd6PY4Bro';

export const MintForm: React.FC = () => {
  const user = useSelector((state) => state.user);
  const storage = new NFTStorage({ token: API_KEY });
  const [artItem, setArtItem] = useState<TArtItem>({} as TArtItem);
  const [recipient, setRecipient] = useState<string>('');

  const setItemField = (e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const fieldVal = e.target.value;
    const fieldName = e.target.id;

    setArtItem({ ...artItem, [fieldName]: fieldVal });
  };

  const setImage = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files![0];

    setArtItem({ ...artItem, image });
  };

  const mintArtItem = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    const metadata = await storage.store({
      ...artItem,
    });
    const { image, name, description, artist } = metadata.data;
    const [_, imageCID, imagePath] = image.href.split(/\/{2}|(?<!\/)\//);

    const response = await fcl.mutate({
      cadence: TRANSACTION_ITEMS_MINT,
      args: () => [
        fcl.arg(recipient, ft.Address),
        fcl.arg(name, ft.String),
        fcl.arg(artist, ft.String),
        fcl.arg(description, ft.String),
        fcl.arg(imageCID, ft.String),
        fcl.arg(imagePath, ft.String),
      ],
      limit: 9999,
    });

    await fcl.tx(response).onceSealed();
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={mintArtItem}>
      <div className={styles['mint']}>
        <label className={styles['label']}>
          Recipient:
          <input
            id='recipient'
            type='text'
            onChange={(e) => {
              setRecipient(e.target.value);
            }}
            className={styles['field']}
          />
        </label>

        <label className={styles['label']}>
          Title:
          <input id='name' type='text' onChange={setItemField} className={styles['field']} />
        </label>

        <label htmlFor='artist' className={styles['label']}>
          Artist:
          <input id='artist' onChange={setItemField} className={styles['field']} />
        </label>

        <label htmlFor='description' className={styles['label']}>
          Description:
          <textarea id='description' onChange={setItemField} className={styles['field']} />
        </label>

        <label htmlFor='image' className={styles['label']}>
          Image:
          <input id='image' type='file' onChange={setImage} className={styles['field']} />
        </label>

        <input type='submit' value='Mint' className={styles['button']} />
      </div>
    </form>
  );
};
