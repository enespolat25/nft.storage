// script.js
const { NFTStorage, Blob } = require('nft.storage');
const fs = require('fs');

// (1)
const client = new NFTStorage({ token: "your-api-key" });

async function main() {
    // (2)
    fs.readFile('sample.txt', "utf-8", async (err, data) => {
        if (err) throw err;

        const url = await store(data);
        console.log("Stored NFT successfully!\nMetadata URL: ", url);
    });
}

async function store(data) {
    // (3)
    const fileCid = await client.storeBlob(new Blob([data]));
    const fileUrl = "https://ipfs.io/ipfs/" + fileCid;

    // (4)
    const obj = {
        "name": "Örnek bir dosya",
        "information": "This is a sample text file.",
        "creator": "Enes Polat",
        "file_url": fileUrl
    };

    // (5)
    const metadata = new Blob([JSON.stringify(obj)], { type: 'application/json' });
    const metadataCid = await client.storeBlob(metadata);
    const metadataUrl = "https://ipfs.io/ipfs/" + metadataCid;

    return metadataUrl;
}

main();
