import { Routes } from '@/constants/routes';
import { RequestStatus } from '@/store/gallery/types';
import { ListingsSort } from '@/store/market/types';

export const ru = {
  name: 'ru',
  translation: {
    header: {
      languages: {
        ru: 'RU',
        jp: '中文',
        en: 'EN',
      },
      links: {
        [Routes.Main]: 'Главная',
        [Routes.Market]: 'Маркетплейс',
        [Routes.Manage]: 'Галерея',
      },
      login: 'Войти',
      profile: 'Профиль',
      tokyo: 'Tokyo',
      logout: 'Выйти',
    },
    footer: {
      company: 'KARTINA.DIGITAL',
      copyright: '2022 @ ITMO UNIVERSITY',
    },
    subscribeForm: {
      titleAll: 'Не пропускайте информацию о новых релизах',
      titleHottest: 'Узнайте о выходе коллекции первым',
      email: 'Email',
      subscribe: 'Подписаться',
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
      address: 'Адрес',
      balance: 'Баланс',
    },
    collections: {
      title: 'Коллекции',
      galleryPrefix: 'от {{gallery}}',
      viewAll: 'Посмотреть все',
    },
    collection: {
      artists: 'Художники',
      styles: 'Стили живописи',
      floorPrice: 'Минимальная цена',
      assets: 'Кол-во картин',
      notFound: 'Не удалось найти коллекцию',
    },
    market: {
      filter: {
        label: 'Фильтры',
        artist: 'Художник',
        country: 'Страна',
        price: 'Цена',
        searchPlaceholder: 'Найти NFT',
      },
      sort: {
        [ListingsSort.DATE_ASC]: 'Новинки',
        [ListingsSort.PRICE_ASC]: 'Сначала дешевые',
        [ListingsSort.PRICE_DESC]: 'Сначала дорогие',
      },
    },
    manage: {
      requests: {
        title: 'Заявки',
        description: 'Ваши заявки на создание коллекций',
      },
      create: {
        title: 'Создать',
        description: 'Создать заявку на новую коллекцию',
      },
      status: {
        [RequestStatus.Declined]: 'Отклонено',
        [RequestStatus.Waiting]: 'Ожидает',
        [RequestStatus.Listed]: 'Выставлено',
        [RequestStatus.Hottest]: 'Актуальная',
      },
      upload: {
        label: 'Добавить картины',
        help: 'Перетащите или загрузите фотографии картин для создания коллекции',
      },
      form: {
        image: {
          label: 'Создание картины',
          name: 'Картина',
          namePlaceholder: 'Название картины',
          artist: 'Художник',
          artistPlaceholder: 'Имя художника',
          description: 'Описание',
          descriptionPlaceholder: 'Описание картины',
          price: 'Цена',
        },
        collection: {
          name: 'Коллекция',
          namePlaceholder: 'Название коллекции',
          description: 'Описание',
          descriptionPlaceholder: 'Описание коллекции',
        },
        next: 'Далее',
        sendRequest: 'Отправить заявку',
        createCollection: 'Создание коллекции',
      },
      login: {
        label: 'Управление галереей',
        button: 'Войти',
      },
    },
    item: {
      list: 'Выставить',
      owner: 'Владелец',
      creator: 'Создатель',
      blockchain: 'Блокчейн',
      tokenId: 'ID токена',
    },
    listing: {
      buy: 'Перейти к покупке',
      remove: 'Удалить',
      offer: 'Предложить цену',
      details: 'Подробности',
      description: 'Описание',
      price: 'Цена',
    },
    list: {
      transactionInfo: 'Информация о транзакции',
      tokenType: 'Тип токена',
      contract: 'Контракт',
      list: 'Выставить',
      fees: 'Сборы',
      galleryFees: 'Сборы галлереи',
      serviceFees: 'Сервисный сбор',
      transactionStatus: 'Статус транзакции',
    },
    purchase: {
      buy: 'Купить',
      total: 'Всего',
    },
    flow: {
      amount: '{{amount}} FLOW',
    },
    drop: {
      notFound: 'Анонс коллекции не найден',
    },
  },
};
