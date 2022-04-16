export const MARKET_CREATE_LISTING = `
import FungibleToken from 0xFungibleToken
import NonFungibleToken from 0xNonFungibleToken
import FlowToken from 0xFlowToken
import KartinaItems from 0xKartinaItems
import NFTStorefront from 0xStorefront

pub fun getOrCreateStorefront(account: AuthAccount): &NFTStorefront.Storefront {
    if let storefrontRef = account.borrow<&NFTStorefront.Storefront>(from: NFTStorefront.StorefrontStoragePath) {
        return storefrontRef
    }

    let storefront <- NFTStorefront.createStorefront()

    let storefrontRef = &storefront as &NFTStorefront.Storefront

    account.save(<-storefront, to: NFTStorefront.StorefrontStoragePath)

    account.link<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(NFTStorefront.StorefrontPublicPath, target: NFTStorefront.StorefrontStoragePath)

    return storefrontRef
}

transaction(saleItemID: UInt64, saleItemPrice: UFix64) {

    let flowReceiver: Capability<&FlowToken.Vault{FungibleToken.Receiver}>
    let KartinaItemsProvider: Capability<&KartinaItems.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>
    let storefront: &NFTStorefront.Storefront

    prepare(account: AuthAccount) {
        // We need a provider capability, but one is not provided by default so we create one if needed.
        let KartinaItemsCollectionProviderPrivatePath = /private/KartinaItemsCollectionProvider

        self.flowReceiver = account.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)!

        assert(self.flowReceiver.borrow() != nil, message: "Missing or mis-typed FLOW receiver")

        if !account.getCapability<&KartinaItems.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(KartinaItemsCollectionProviderPrivatePath)!.check() {
            account.link<&KartinaItems.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(KartinaItemsCollectionProviderPrivatePath, target: KartinaItems.CollectionStoragePath)
        }

        self.KartinaItemsProvider = account.getCapability<&KartinaItems.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(KartinaItemsCollectionProviderPrivatePath)!

        assert(self.KartinaItemsProvider.borrow() != nil, message: "Missing or mis-typed KartinaItems.Collection provider")

        self.storefront = getOrCreateStorefront(account: account)
    }

    execute {
        let saleCut = NFTStorefront.SaleCut(
            receiver: self.flowReceiver,
            amount: saleItemPrice
        )
        self.storefront.createListing(
            nftProviderCapability: self.KartinaItemsProvider,
            nftType: Type<@KartinaItems.NFT>(),
            nftID: saleItemID,
            salePaymentVaultType: Type<@FlowToken.Vault>(),
            saleCuts: [saleCut]
        )
    }
}
`;
