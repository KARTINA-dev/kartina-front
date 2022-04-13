export const TRANSACTION_ITEMS_MINT = `import NonFungibleToken from 0xNonFungibleToken
import KartinaItems from 0xKartinaItems

// This transction uses the NFTMinter resource to mint a new NFT.
//
// It must be run with the account that has the minter resource
// stored at path /storage/NFTMinter.

transaction(recipient: Address, name: String, artist: String, description: String, imageCID: String, imagePath: String) {

    // local variable for storing the minter reference
    let minter: &KartinaItems.NFTMinter

    prepare(signer: AuthAccount) {

        // borrow a reference to the NFTMinter resource in storage
        self.minter = signer.borrow<&KartinaItems.NFTMinter>(from: KartinaItems.MinterStoragePath)
            ?? panic("Could not borrow a reference to the NFT minter")
    }

    execute {
        // get the public account object for the recipient
        let recipient = getAccount(recipient)

        // borrow the recipient's public NFT collection reference
        let receiver = recipient
            .getCapability(KartinaItems.CollectionPublicPath)!
            .borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not get receiver reference to the NFT Collection")


        // mint the NFT and deposit it to the recipient's collection
        self.minter.mintNFT(
            recipient: receiver,
            name: name,
            artist: artist,
            description: description,
            imageCID: imageCID,
            imagePath: imagePath
        )
    }
}`;
