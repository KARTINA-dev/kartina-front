import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import * as fcl from '@onflow/fcl';
import * as ft from '@onflow/types';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Routes } from '@/constants/routes';
import { Header } from '@/components/Header/Header';
import { useAuthentication } from '@/helpers/useAuthentication';
import { Spinner } from '@/components/Spinner/Spinner';
import { Size } from '@/types/common';
import { MARKET_PURCHASE_LISTING } from '@/cadence/market/purchase_listing';
import { useListingInfo } from '@/pages/Listing/hooks';
import { ReactComponent as BackIcon } from '@/assets/icons/back.svg';
import { ReactComponent as QuestionIcon } from '@/assets/icons/question.svg';
import { ReactComponent as OpenIcon } from '@/assets/icons/open.svg';
import { getIPFSImage } from '@/helpers/getIPFSImage';
import { TransactionStatus, TTransaction } from '@/pages/Purchase/types';
import ProgressBar from '@/components/ProgressBar/ProgressBar';

import styles from './Purchase.module.scss';

const Purchase: React.FC = () => {
  const { isAuthenticated, login } = useAuthentication();
  const [isProceeding, setIsProceeding] = useState<boolean>(false);
  const [txStatus, setTxStatus] = useState<TransactionStatus>(TransactionStatus.Unknown);
  const [txID, setTxID] = useState<string>('');
  const [txErrors, setTxErrors] = useState<string[]>([]);
  const { address, listingID } = useParams();
  const { listing, isLoading } = useListingInfo(address, Number(listingID));
  const navigate = useNavigate();

  const buyListing = useCallback(async (listingID: number, ownerAccount: string) => {
    setIsProceeding(true);

    let response = '';

    try {
      response = await fcl.mutate({
        cadence: MARKET_PURCHASE_LISTING,
        args: () => [fcl.arg(listingID, ft.UInt64), fcl.arg(ownerAccount, ft.Address)],
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

  if (isLoading || !listing) {
    return (
      <div className={cn(styles.checkoutPage, styles.loading)}>
        <Spinner size={Size.L} />
      </div>
    );
  }

  const isButtonVisible = txStatus !== TransactionStatus.Sealed || Boolean(txErrors.length);

  const { imageCID, imagePath, owner, name, price, artist, itemID } = listing;

  return (
    <div className={styles.purchase}>
      <Header isAuthenticated={isAuthenticated} login={login} pathname={Routes.Main} />
      <div className={styles.content}>
        <button className={styles.back} onClick={() => navigate(-1)}>
          <BackIcon className={styles.backIcon} />
          <span className={styles.backText}>Back to listing</span>
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
                <span className={styles.colTitle}>Owned by</span>
                <span>{owner}</span>
              </div>
              <div className={styles.col}>
                <span className={styles.colTitle}>Contract</span>
                <span>KartinaItems</span>
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
                  Поздравляем! Вы купили NFT {`"name"`}. <Link to={`${Routes.Profile}`}>Нажмите</Link>, чтобы перейти к
                  своей коллекции
                </div>
              ))}
          </div>

          <div className={styles.item}>
            <img src={getIPFSImage({ imageCID, imagePath })} alt={`Listing ID Image`} className={styles.image} />
            <div className={styles.details}>
              <div className={styles.detailsDescription}>
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

              <div className={cn(styles.detailsBlock, styles.detailsBlockPrice)}>
                <div className={styles.detailsBlockRow}>
                  <span className={styles.subtitle}>Всего</span>
                  <span>{parseFloat(price).toFixed(3)} FLOW</span>
                </div>
              </div>
              <div className={styles.detailsButton}>
                {isButtonVisible && (
                  <button
                    className={cn(styles.buy, { [styles.proceedingButton]: isProceeding })}
                    onClick={() => buyListing(Number(listingID), owner)}
                  >
                    {isProceeding ? <Spinner className={styles.proceedingLoader} size={Size.M} /> : 'Купить'}
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

export default Purchase;
