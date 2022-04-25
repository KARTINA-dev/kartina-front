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
      profile: 'Профиль',
      logout: 'Выйти',
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
      items: {
        title: 'Коллекция',
        description: 'Вы можете просматривать товары, доступные для покупки на торговой площадке',
      },
      listed: {
        title: 'Выставленные',
        description: 'Ваши выставленные предметы на продажу, доступны в торговой площадке',
      },
      empty: {
        title: 'Нет предметов',
        description: 'Вы можете просматривать товары, доступные для покупки на торговой площадке',
      },
    },
    collections: {
      title: 'Коллекции',
      galleryPrefix: 'от {{gallery}}',
      viewAll: 'Посмотреть все',
    },
    item: {
      list: 'Список',
    },
    listing: {
      buy: 'Купить',
      remove: 'Удалить',
    },
    flow: {
      amount: '₣{{amount}} FLOW',
    },
  },
};
