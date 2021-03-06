import { RequestStatus } from '@/store/gallery/types';
import { Routes } from '@/constants/routes';
import { ListingsSort } from '@/store/market/types';

export const jp = {
  name: 'jp',
  translation: {
    header: {
      languages: {
        ru: 'RU',
        jp: '中文',
        en: 'EN',
      },
      links: {
        [Routes.Main]: 'メイン',
        [Routes.Market]: '市場',
        [Routes.Manage]: 'ギャラリー',
      },
      login: '入力',
      profile: 'プロフィール',
      tokyo: 'Tokyo',
      logout: 'お出かけ',
    },
    footer: {
      company: 'KARTINA.DIGITAL',
      copyright: '2022 @ 大学',
    },
    subscribeForm: {
      titleAll: '新規販売に関する情報をお見逃しなく',
      titleHottest: 'コレクションのドロップをお見逃しなく',
      email: 'メール',
      subscribe: '購読する',
    },
    hottestDrops: {
      title: '最もホットな絵画',
    },
    profile: {
      collection: {
        title: 'コレクション',
        description: 'マーケットプレイスで購入可能なアイテムを閲覧できます',
      },
      listed: {
        title: 'リストされている',
        description: '市場での販売のためのあなたの貴重なアイテム',
      },
      empty: {
        title: 'アイテムなし',
        description: 'マーケットプレイスで購入可能なアイテムを閲覧できます',
      },
      address: '住所',
      balance: 'バランス',
    },
    collections: {
      title: 'コレクション',
      galleryPrefix: '{{gallery}}による',
      viewAll: 'すべて表示',
    },
    collection: {
      artists: 'アーティスト',
      styles: '絵画のスタイル',
      floorPrice: '最低料金',
      assets: '資産',
      notFound: 'コレクションが見つかりません',
    },
    market: {
      filter: {
        label: 'フィルター',
        artist: 'アーティスト',
        country: '国',
        price: '価格',
        searchPlaceholder: 'NFTを検索',
      },
      sort: {
        [ListingsSort.DATE_ASC]: '最近掲載された',
        [ListingsSort.PRICE_ASC]: '低価格-高価格',
        [ListingsSort.PRICE_DESC]: '価格ハイ-ロー',
      },
    },
    manage: {
      requests: {
        title: 'リクエスト',
        description: 'コレクションミントのリクエスト',
      },
      create: {
        title: '作成',
        description: '新しいコレクションのリクエストを作成する',
      },
      status: {
        [RequestStatus.Declined]: '拒否されました',
        [RequestStatus.Waiting]: '待っている',
        [RequestStatus.Listed]: 'リストされている',
        [RequestStatus.Hottest]: '一番ホットなのは',
      },
      upload: {
        label: '画像を追加',
        help: '絵画の写真をドラッグ＆ドロップまたはアップロードしてコレクションを作成します',
      },
      form: {
        image: {
          label: 'アイテムの作成',
          name: 'アイテム',
          namePlaceholder: 'アイテム名',
          artist: 'アーティスト',
          artistPlaceholder: 'アーティスト名',
          description: '説明',
          descriptionPlaceholder: '商品説明',
          price: '価格',
        },
        collection: {
          name: 'コレクション',
          namePlaceholder: 'コレクション名',
          description: '説明',
          descriptionPlaceholder: 'コレクションの説明',
        },
        next: '次へ',
        sendRequest: 'リクエストの送信',
        createCollection: 'コレクションの作成',
      },
      login: {
        label: 'ギャラリーの管理',
        button: 'ログイン',
      },
    },
    item: {
      list: 'リスト',
      owner: 'オーナー',
      creator: 'クリエイター',
      blockchain: 'ブロックチェーン',
      tokenId: 'トークンID',
    },
    listing: {
      buy: '今買う',
      remove: '削除',
      offer: '価格を提供する',
      details: '詳細',
      description: '説明',
      price: '価格',
    },
    list: {
      transactionInfo: '取引情報',
      tokenType: 'アイテムタイプ',
      contract: '契約',
      list: 'リスト',
      fees: '料金',
      galleryFees: 'ギャラリー料金',
      serviceFees: 'サービス料',
      transactionStatus: '取引状況',
    },
    purchase: {
      buy: '買う',
      total: '合計',
    },
    flow: {
      amount: '₣{{amount}} FLOW',
    },
    drop: {
      notFound: 'ドロップが見つかりません',
    },
  },
};
