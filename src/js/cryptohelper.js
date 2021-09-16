const fs = require('fs')
const cryptojs = require('crypto-js')

 function decrypt(data, key) {
    var decrypted = cryptojs.AES.decrypt(data, key).toString(cryptojs.enc.Utf8);
    return decrypted;
};

 function encrypt(data, key) {
    var ciphertext = cryptojs.AES.encrypt(data, key).toString();
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
module.exports = {json2txtParser,encrypt,decrypt}
//console.log(jsonParser(`./example-data.json`));
//cypherttxt = encrypt("swqadqdqwd", "kabecha7599")
//console.log(cypherttxt)
