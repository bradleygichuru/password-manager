const cryptohelper = require('../src/js/cryptohelper')
const passPhrase = "bradleygichuru"

var data = cryptohelper.json2txtParser(`example-data.json`)
if (data) {
    var cipherText = cryptohelper.encrypt(data, passPhrase)
    var decryptedText = cryptohelper.decrypt(cipherText, passPhrase)
    console.log({ "data": data, "ciphertext": cipherText, "decryptedText": decryptedText })
    var mutableObj = JSON.parse(decryptedText)
    console.log(Object.keys(mutableObj).length)

    if (data == decryptedText) {
        console.log("test passed")
    }

} else {
    console.log("error fetching data ")
}