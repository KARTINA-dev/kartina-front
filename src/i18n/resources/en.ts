import { RequestStatus } from '@/store/gallery/types';
import { Routes } from '@/constants/routes';
import { ListingsSort } from '@/store/market/types';

export const en = {
  name: 'en',
  translation: {
    header: {
      languages: {
        ru: 'RU',
        jp: '中文',
        en: 'EN',
      },
      links: {
        [Routes.Main]: 'Main',
        [Routes.Market]: 'Market',
        [Routes.Manage]: 'Gallery',
      },
      login: 'Login',
      profile: 'Profile',
      tokyo: 'Tokyo',
      logout: 'Logout',
    },
    footer: {
      company: 'KARTINA.DIGITAL',
      copyright: '2022 @ ITMO UNIVERSITY',
    },
    subscribeForm: {
      titleAll: 'Never miss a drop',
      titleHottest: `Don't miss the drop of collection`,
      email: 'Email',
      subscribe: 'Subscribe',
    },
    hottestDrops: {
      title: 'Hottest Drops',
    },
    profile: {
      items: {
        title: 'Collection',
        description: 'Your precious items that you can list on marketplace',
      },
      listed: {
        title: 'Listed',
        description: 'Your precious items for sale on the marketplace',
      },
      empty: {
        title: 'No items',
        description: 'You can browse items available for purchase on the marketplace',
      },
      address: 'Address',
      balance: 'Balance',
    },
    collections: {
      title: 'Collections',
      galleryPrefix: 'by {{gallery}}',
      viewAll: 'View all',
    },
    collection: {
      artists: 'Artists',
      styles: 'Painting styles',
      floorPrice: 'Floor price',
      assets: 'Assets',
      notFound: `Can't find collection`,
    },
    market: {
      filter: {
        label: 'Filters',
        artist: 'Artist',
        country: 'Country',
        price: 'Price',
        searchPlaceholder: 'Search NFT',
      },
      sort: {
        [ListingsSort.DATE_ASC]: 'Recently listed',
        [ListingsSort.PRICE_ASC]: 'Price low - high',
        [ListingsSort.PRICE_DESC]: 'Price high - low',
      },
    },
    manage: {
      requests: 'Requests',
      create: 'Create',
      status: {
        [RequestStatus.Declined]: 'Declined',
        [RequestStatus.Waiting]: 'Waiting',
        [RequestStatus.Listed]: 'Listed',
        [RequestStatus.Hottest]: 'Hottest',
      },
      upload: {
        label: 'Add picture',
        help: 'Drag and drop or upload pictures of paintings to create a collection',
      },
      form: {
        image: {
          label: 'Creating an item',
          name: 'Item',
          namePlaceholder: 'Item name',
          artist: 'Artist',
          artistPlaceholder: 'Artist name',
          description: 'Description',
          descriptionPlaceholder: 'Item description',
          price: 'Price',
        },
        collection: {
          name: 'Collection',
          namePlaceholder: 'Collection name',
          description: 'Description',
          descriptionPlaceholder: 'Collection description',
        },
        next: 'Next',
        sendRequest: 'Send request',
        createCollection: 'Create a collection',
      },
      login: {
        label: 'Manage gallery',
        button: 'Login',
      },
    },
    item: {
      list: 'List',
      owner: 'Owner',
      creator: 'Creator',
      blockchain: 'Blockchain',
      tokenId: 'Token ID',
    },
    listing: {
      buy: 'Buy Now',
      remove: 'Remove',
      offer: 'Make Offer',
      details: 'Details',
      description: 'Description',
      price: 'Price',
    },
    list: {
      transactionInfo: 'Transaction info',
      tokenType: 'Item type',
      contract: 'Contract',
      list: 'List',
      fees: 'Fees',
      galleryFees: 'Gallery fees',
      serviceFees: 'Service fees',
      transactionStatus: 'Transaction status',
    },
    flow: {
      amount: '{{amount}} FLOW',
    },
    drop: {
      notFound: `Can't find the drop`,
    },
  },
};
