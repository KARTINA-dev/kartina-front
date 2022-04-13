export const SCRIPT_ITEMS_GET = `import NonFungibleToken from 0xNonFungibleToken
import MetadataViews from 0xMetadataViews
import KartinaItems from 0xKartinaItems

pub struct KartinaItem {
    pub let name: String
    pub let description: String
    pub let thumbnail: String
    pub let artist: String
    pub let itemID: UInt64
    pub let resourceID: UInt64
    pub let owner: Address

    init(
        name: String,
        description: String,
        thumbnail: String,
        artist: String,
        itemID: UInt64,
        resourceID: UInt64,
        owner: Address,
    ) {
        self.name = name
        self.description = description
        self.thumbnail = thumbnail
        self.artist = artist
        self.itemID = itemID
        self.resourceID = resourceID
        self.owner = owner
    }
}

pub fun dwebURL(_ file: MetadataViews.IPFSFile): String {
    var url = "https://"
        .concat(file.cid)
        .concat(".ipfs.dweb.link/")

    if let path = file.path {
        return url.concat(path)
    }

    return url
}


pub fun main(address: Address): [KartinaItem] {
    let account = getAccount(address)

    let collection = account
        .getCapability<&KartinaItems.Collection{NonFungibleToken.CollectionPublic, KartinaItems.KartinaItemsCollectionPublic}>(
            KartinaItems.CollectionPublicPath
        )
        .borrow()
        ?? panic("Could not borrow public collection from address")

    let items : [KartinaItem] = []

    for item in collection.borrowItems() {

        if let view = item!.resolveView(Type<MetadataViews.Display>()) {

            let display = view as! MetadataViews.Display

            let owner: Address = item!.owner!.address

            let ipfsThumbnail = display.thumbnail as! MetadataViews.IPFSFile

            items.append(KartinaItem(
                    name: display.name,
                    description: display.description,
                    thumbnail: dwebURL(ipfsThumbnail),
                    artist: item!.artist,
                    itemID: item!.id,
                    resourceID: item!.uuid,
                    owner: address,
                ))
        }
    }

  return items
}
`;
