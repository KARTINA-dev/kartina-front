import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import * as fcl from '@onflow/fcl';
import * as ft from '@onflow/types';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { Routes } from '@/constants/routes';
import { Header } from '@/components/Header/Header';
import { useAuthentication } from '@/helpers/useAuthentication';
import { Spinner } from '@/components/Spinner/Spinner';
import { Size } from '@/types/common';
import { useTranslation } from '@/i18n';
import { ReactComponent as BackIcon } from '@/assets/icons/back.svg';
import { ReactComponent as QuestionIcon } from '@/assets/icons/question.svg';
import { ReactComponent as OpenIcon } from '@/assets/icons/open.svg';
import { getIPFSImage } from '@/helpers/getIPFSImage';
import { TransactionStatus, TTransaction } from '@/pages/Purchase/types';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { useItemInfo } from '@/pages/Item/hooks';
import { MARKET_CREATE_LISTING } from '@/cadence/market/create_listing';
import { ProfileTabs } from '@/pages/Profile/types';

import styles from './List.module.scss';

interface ListLocationState {
  price: string;
}

const List: React.FC = () => {
  const { isAuthenticated, login } = useAuthentication();
  const [isProceeding, setIsProceeding] = useState<boolean>(false);
  const [txStatus, setTxStatus] = useState<TransactionStatus>(TransactionStatus.Unknown);
  const [txID, setTxID] = useState<string>('');
  const [txErrors, setTxErrors] = useState<string[]>([]);
  const { address, itemID } = useParams();
  const { t } = useTranslation();
  const { item, isLoading } = useItemInfo(address, Number(itemID));
  const navigate = useNavigate();
  const locationState = useLocation().state as ListLocationState;
  const price = locationState.price;

  const list = useCallback(async (itemID: number, price: string) => {
    setIsProceeding(true);

    let response = '';

    try {
      response = await fcl.mutate({
        cadence: MARKET_CREATE_LISTING,
        args: () => [fcl.arg(itemID, ft.UInt64), fcl.arg(price, ft.UFix64)],
        limit: 9999,
      });

      setTxID(response);
    } catch (err) {
      setIsProceeding(false);

      return;
    }

    try {
      fcl.tx(response).subscribe((tx: TTransaction) => {
        if (tx.statusString !== TransactionStatus.Unknown) {
          setTxStatus(tx.statusString);

          if (tx.statusString === TransactionStatus.Sealed) {
            setIsProceeding(false);
          }
        }
      });

      await fcl.tx(response).onceSealed();
    } catch (err) {
      setTxErrors((prevState) => [...prevState, JSON.stringify(err)]);
    }
  }, []);

  if (isLoading || !item) {
    return (
      <div className={cn(styles.checkoutPage, styles.loading)}>
        <Spinner size={Size.L} />
      </div>
    );
  }

  const isButtonVisible = txStatus !== TransactionStatus.Sealed || Boolean(txErrors.length);

  const { imageCID, imagePath, name, artist } = item;

  return (
    <div className={styles.checkoutPage}>
      <Header isAuthenticated={isAuthenticated} login={login} pathname={Routes.Main} />
      <div className={styles.content}>
        <button className={styles.back} onClick={() => navigate(-1)}>
          <BackIcon className={styles.backIcon} />
          <span className={styles.backText}>Back to item</span>
        </button>
        <div className={styles.info}>
          <div className={styles.transaction}>
            <span className={styles.title}>Transaction info</span>
            <div className={styles.row}>
              <div className={styles.col}>
                <span className={styles.colTitle}>Item ID</span>
                <span>{itemID}</span>
              </div>
              <div className={styles.col}>
                <span className={styles.colTitle}>Item type</span>
                <span>KartinaItem</span>
              </div>
              <div className={styles.col}>
                <span className={styles.colTitle}>Contract</span>
                <span>NFTStorefront</span>
              </div>
              <div className={styles.col}>
                <span className={styles.colTitle}>Blockchain</span>
                <span>FLOW</span>
              </div>
            </div>
            {txID && (
              <div className={styles.col}>
                <div className={styles.row}>
                  <span className={styles.subtitle}>Transaction status</span>
                  {txStatus === TransactionStatus.Sealed ? (
                    <a
                      target='_blank'
                      rel='noreferrer'
                      className={styles.transactionLink}
                      href={`https://testnet.flowscan.org/transaction/${txID}`}
                    >
                      <span className={styles.transactionLinkStatus}>{txStatus}</span>
                      <OpenIcon className={styles.openIcon} />
                    </a>
                  ) : (
                    <span>{txStatus}</span>
                  )}
                </div>

                <ProgressBar status={txStatus} />
              </div>
            )}
            {txStatus === TransactionStatus.Sealed &&
              (txErrors.length ? (
                <div className={styles.errorContainer}>
                  <span className={styles.subtitle}>Execution failed</span>
                  <div>
                    {txErrors.map((error, index) => (
                      <span key={index}>{error}</span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={styles.congrats}>
                  Поздравляем! Вы выставили NFT "{name}".{' '}
                  <Link to={`${Routes.Profile}`} state={{ activeTab: ProfileTabs.Listed }}>
                    Нажмите
                  </Link>
                  , чтобы перейти к своему маркетплейсу
                </div>
              ))}
          </div>

          <div className={styles.item}>
            <img src={getIPFSImage({ imageCID, imagePath })} alt={`Listing ID Image`} className={styles.image} />
            <div className={styles.details}>
              <div className={styles.detailsBlock}>
                <span className={styles.title}>{name}</span>
                <span>{artist}</span>
              </div>
              <div className={styles.detailsBlock}>
                <div className={styles.detailsBlockRow}>
                  <span className={styles.subtitle}>Cборы</span>
                  <QuestionIcon className={styles.question} />
                </div>
                <div className={styles.detailsBlockRow}>
                  <span>Royalties (10%)</span>
                  <span>{(parseFloat(price) * 0.1).toFixed(3)} FLOW</span>
                </div>
                <div className={styles.detailsBlockRow}>
                  <span>KARTINA fees (3%)</span>
                  <span>{(parseFloat(price) * 0.03).toFixed(3)} FLOW</span>
                </div>
              </div>

              <div className={styles.detailsBlock}>
                <div className={styles.detailsBlockRow}>
                  <span className={styles.subtitle}>Всего</span>
                  <span>{parseFloat(price).toFixed(3)} FLOW</span>
                </div>
              </div>
              <div className={styles.detailsBlock}>
                {isButtonVisible && (
                  <button
                    className={cn(styles.buy, { [styles.proceedingButton]: isProceeding })}
                    onClick={() => list(Number(itemID), price)}
                  >
                    {isProceeding ? (
                      <Spinner className={styles.proceedingLoader} size={Size.M} />
                    ) : (
                      t((d) => d.item.list)
                    )}
                  </button>
                )}
                {isProceeding ? <div className={styles.proceedingMessage}>Proceeding your order...</div> : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
