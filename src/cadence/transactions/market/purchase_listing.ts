export const MARKET_PURCHASE_LISTING = `
import FungibleToken from 0xFungibleToken
import NonFungibleToken from 0xNonFungibleToken
import FlowToken from 0xFlowToken
import KartinaItems from 0xKartinaItems
import NFTStorefront from 0xNFTStorefront

pub fun getOrCreateCollection(account: AuthAccount): &KartinaItems.Collection{NonFungibleToken.Receiver} {
    if let collectionRef = account.borrow<&KartinaItems.Collection>(from: KartinaItems.CollectionStoragePath) {
        return collectionRef
    }

    // create a new empty collection
    let collection <- KartinaItems.createEmptyCollection() as! @KartinaItems.Collection

    let collectionRef = &collection as &KartinaItems.Collection

    // save it to the account
    account.save(<-collection, to: KartinaItems.CollectionStoragePath)

    // create a public capability for the collection
    account.link<&KartinaItems.Collection{NonFungibleToken.CollectionPublic, KartinaItems.KartinaItemsCollectionPublic}>(KartinaItems.CollectionPublicPath, target: KartinaItems.CollectionStoragePath)

    return collectionRef
}

transaction(listingResourceID: UInt64, storefrontAddress: Address) {

    let paymentVault: @FungibleToken.Vault
    let KartinaItemsCollection: &KartinaItems.Collection{NonFungibleToken.Receiver}
    let storefront: &NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}
    let listing: &NFTStorefront.Listing{NFTStorefront.ListingPublic}

    prepare(account: AuthAccount) {
        self.storefront = getAccount(storefrontAddress)
            .getCapability<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(
                NFTStorefront.StorefrontPublicPath
            )!
            .borrow()
            ?? panic("Could not borrow Storefront from provided address")

        self.listing = self.storefront.borrowListing(listingResourceID: listingResourceID)
            ?? panic("No Listing with that ID in Storefront")

        let price = self.listing.getDetails().salePrice

        let mainFLOWVault = account.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
            ?? panic("Cannot borrow FLOW vault from account storage")

        self.paymentVault <- mainFLOWVault.withdraw(amount: price)

        self.KartinaItemsCollection = getOrCreateCollection(account: account)
    }

    execute {
        let item <- self.listing.purchase(
            payment: <-self.paymentVault
        )

        self.KartinaItemsCollection.deposit(token: <-item)

        self.storefront.cleanup(listingResourceID: listingResourceID)
    }
}
`;
