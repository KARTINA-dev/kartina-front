import { config } from '@onflow/fcl';

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
