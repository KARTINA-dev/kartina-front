import React from 'react';
import { Tabs as TabsComponent, TabsProps, TabPaneProps } from 'antd';
import cn from 'classnames';

import styles from './Tabs.module.scss';

export type TTabs = TabsProps;
export type TTabsPane = TabPaneProps;

export const Tabs: React.FC<TTabs> = (props) => {
  return <TabsComponent {...props} className={cn(styles.tabs, props.className)} />;
};

export const TabsPane: React.FC<TTabsPane> = TabsComponent.TabPane;
