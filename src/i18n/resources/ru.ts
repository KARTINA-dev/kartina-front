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
      tokyo: 'Tokyo',
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
        description: 'Ваши предметы, которые вы можете выставить на продажу',
      },
      listed: {
        title: 'Выставленные',
        description: 'Ваши предметы, выставленные на продажу, доступные на торговой площадке',
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
      list: 'Выложить',
    },
    listing: {
      buy: 'Купить сейчас',
      remove: 'Удалить',
      offer: 'Предложить цену',
      details: 'Подробности',
      description: 'Описание',
      price: 'Цена',
    },
    flow: {
      amount: '{{amount}} FLOW',
    },
  },
};
