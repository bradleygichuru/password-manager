
import fs from 'fs';
import { AES, enc } from 'crypto-js';

 function decrypt(data, key) {
    var decrypted = AES.decrypt(data, key).toString(enc.Utf8);
    return decrypted;
};

 function encrypt(data, key) {
    var ciphertext = AES.encrypt(data, key).toString();
    return ciphertext;
};
 function json2txtParser(jsonFilePath) {
    let dbdata = "";

    try {

        const data = fs.readFileSync(jsonFilePath, 'utf8');
        dbdata = data

    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }

    return dbdata

}
export default {json2txtParser,encrypt,decrypt}
//console.log(jsonParser(`./example-data.json`));
//cypherttxt = encrypt("swqadqdqwd", "kabecha7599")
//console.log(cypherttxt)
