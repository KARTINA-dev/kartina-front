import React from 'react';
import cn from 'classnames';
import { AiOutlineLoading } from 'react-icons/ai';

import { Size } from '../../types/common';

import styles from './Spinner.module.scss';

export interface ISpinner extends React.HTMLAttributes<HTMLDivElement> {
  size?: Size;
}

export const Spinner: React.FC<ISpinner> = (props) => {
  const { className, size = Size.M, ...restProps } = props;

  return (
    <div
      {...restProps}
      className={cn(className, styles.spinner, {
        [styles.spinnerSizeXS]: size === Size.XS,
        [styles.spinnerSizeS]: size === Size.S,
        [styles.spinnerSizeM]: size === Size.M,
        [styles.spinnerSizeL]: size === Size.L,
      })}
    >
      <AiOutlineLoading className={styles.spinnerIcon} />
    </div>
  );
};
