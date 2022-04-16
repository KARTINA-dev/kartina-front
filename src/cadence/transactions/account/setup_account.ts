export const SETUP_ACCOUNT = `
import NonFungibleToken from 0xNonFungibleToken
import KartinaItems from 0xKartinaItems
import NFTStorefront from 0xStorefront

// This transaction configures an account to hold Kartina Items.

transaction {
    prepare(signer: AuthAccount) {
        // if the account doesn't already have a collection
        if signer.borrow<&KartinaItems.Collection>(from: KartinaItems.CollectionStoragePath) == nil {

            // create a new empty collection
            let collection <- KartinaItems.createEmptyCollection()

            // save it to the account
            signer.save(<-collection, to: KartinaItems.CollectionStoragePath)

            // create a public capability for the collection
            signer.link<&KartinaItems.Collection{NonFungibleToken.CollectionPublic, KartinaItems.KartinaItemsCollectionPublic}>(KartinaItems.CollectionPublicPath, target: KartinaItems.CollectionStoragePath)
        }
        
        if signer.borrow<&NFTStorefront.Storefront>(from: NFTStorefront.StorefrontStoragePath) == nil {

            // Create a new empty .Storefront
            let storefront <- NFTStorefront.createStorefront()

            // save it to the account
            signer.save(<-storefront, to: NFTStorefront.StorefrontStoragePath)

            // create a public capability for the .Storefront
            signer.link<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(NFTStorefront.StorefrontPublicPath, target: NFTStorefront.StorefrontStoragePath)
        }
    }
}
`;
