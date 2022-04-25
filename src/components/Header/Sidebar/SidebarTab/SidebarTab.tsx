import React from 'react';
import cn from 'classnames';
import { Menu, MenuItemProps } from 'antd';

import styles from './SidebarTab.module.scss';

export interface ISidebarTab extends MenuItemProps {
  label: string;
}

export const SidebarTab: React.FC<ISidebarTab> = (props) => {
  const { className, label, ...restProps } = props;

  return (
    <Menu.Item {...restProps} className={cn(styles.tab, className)}>
      {label}
    </Menu.Item>
  );
};
