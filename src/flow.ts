import { config } from '@onflow/fcl';

import {
  FLOW_ACCESS_URL,
  FLOW_TOKEN_ADDRESS,
  FUNGIBLE_TOKEN_ADDRESS,
  METADATA_ADDRESS,
  NONFUNGIBLE_TOKEN_ADDRESS,
  STOREFRONT_ADDRESS,
  DISCOVERY_WALLET,
  KARTINAITEMS_ADDRESS,
} from './constants/env';

config({
  'accessNode.api': FLOW_ACCESS_URL,
  'discovery.wallet': DISCOVERY_WALLET,
  '0xFungibleToken': FUNGIBLE_TOKEN_ADDRESS,
  '0xNonFungibleToken': NONFUNGIBLE_TOKEN_ADDRESS,
  '0xFlowToken': FLOW_TOKEN_ADDRESS,
  '0xMetadataViews': METADATA_ADDRESS,
  '0xNFTStorefront': STOREFRONT_ADDRESS,
  '0xKartinaItems': KARTINAITEMS_ADDRESS,
});
