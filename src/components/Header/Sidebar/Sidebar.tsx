import React from 'react';
import cn from 'classnames';
import { Menu } from 'antd';

import { useTranslation } from '@/i18n';
import { Routes } from '@/constants/routes';

import { SidebarTab } from './SidebarTab/SidebarTab';
import styles from './Sidebar.module.scss';

interface ISidebar {
  open: boolean;
}

export const Sidebar: React.FC<ISidebar> = (props) => {
  const { open } = props;
  const { t } = useTranslation();

  return (
    <div className={cn(styles.sidebar, { [styles.sidebarOpen]: open })}>
      <Menu className={cn(styles.sidebarMenu)} mode='inline'>
        <SidebarTab key={Routes.Main} label={t((d) => d.sidebar[Routes.Main])} />
        <SidebarTab key={Routes.Market} label={t((d) => d.sidebar[Routes.Market])} />
      </Menu>
    </div>
  );
};
