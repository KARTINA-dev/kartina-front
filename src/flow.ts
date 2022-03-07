import { config } from '@onflow/fcl';

import { FLOW_ACCESS_URL, WALLET_DISCOVERY } from './constants/env';

config({ 'accessNode.api': FLOW_ACCESS_URL, 'discovery.wallet': WALLET_DISCOVERY });
