import { config } from '@onflow/fcl';

import {
  FLOW_ACCESS_URL,
  FLOW_TOKEN_ADDRESS,
  FUNGIBLE_TOKEN_ADDRESS,
  KITTYITEMS_ADDRESS,
  METADATA_ADDRESS,
  NONFUNGIBLE_TOKEN_ADDRESS,
  STOREFRONT_ADDRESS,
  WALLET_DISCOVERY,
} from './constants/env';

config({
  'accessNode.api': FLOW_ACCESS_URL,
  'discovery.wallet': WALLET_DISCOVERY,
  '0xFungibleToken': FUNGIBLE_TOKEN_ADDRESS,
  '0xNonFungibleToken': NONFUNGIBLE_TOKEN_ADDRESS,
  '0xFlowToken': FLOW_TOKEN_ADDRESS,
  '0xMetadataViews': METADATA_ADDRESS,
  '0xStorefront': STOREFRONT_ADDRESS,
  '0xKittyItems': KITTYITEMS_ADDRESS,
});
