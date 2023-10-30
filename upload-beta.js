const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('31451f5694626bd6ab55', 'e2d1795ab014f46b6686885520c7df87c9b7ffd18ecfdb63127f17d1c926369c');
const dotenv = require('dotenv')
const result = dotenv.config()
const sourcePath = './build';

async function pin() {
    const options = {};

    return pinata.pinFromFS(sourcePath, options).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
}

async function main() {
    await pin();
}
main();