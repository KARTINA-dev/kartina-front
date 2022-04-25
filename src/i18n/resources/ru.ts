import { Routes } from '@/constants/routes';

export const ru = {
  name: 'ru',
  translation: {
    header: {
      languages: {
        ru: 'RU',
        jp: '中文',
        en: 'EN',
      },
      login: 'Войти',
      profile: 'Profile',
      logout: 'Logout',
    },
    sidebar: {
      [Routes.Main]: 'Главная',
      [Routes.Market]: 'Магазин',
      [Routes.Profile]: 'Профиль',
    },
    footer: {
      company: 'KARTINA.DIGITAL',
      copyright: '2022 @ ITMO UNIVERSITY',
    },
    main: {
      subscribeForm: {
        title: 'Не пропускайте информацию о новых релизах',
        email: 'Email',
        subscribe: 'Подписаться',
      },
    },
    hottestDrops: {
      title: 'Новые релизы',
    },
    profile: {
      collection: {
        title: 'Collection',
        description: 'You can browse items available for purchase on the marketplace',
      },
      listed: {
        title: 'Listed',
        description: 'Your precious items for sale on the marketplace',
      },
      empty: {
        title: 'No items',
        description: 'You can browse items available for purchase on the marketplace',
      },
    },
    collections: {
      title: 'Коллекции',
      galleryPrefix: 'от {{gallery}}',
      viewAll: 'Посмотреть все',
    },
    item: {
      list: 'List',
    },
    listing: {
      buy: 'Buy',
      remove: 'Remove',
    },
    flow: {
      amount: '₣{{amount}} FLOW',
    },
  },
};
