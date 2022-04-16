export const TRANSACTION_SETUP_ITEMS = `
import NonFungibleToken from 0xNonFungibleToken
import KartinaItems from 0xKartinaItems

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
    }
}
`;
