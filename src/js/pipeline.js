const cryptohelper = require('./cryptohelper');
const fs = require('fs');



function readFileContents(filepath, key) {
    //read , decrypt ,send
    try {

        var data = fs.readFileSync(filepath, 'utf-8');
        if (data) {
            var reqdata = cryptohelper.decrypt(data, key)

        } else {
            console.log("data was not retreived")
        }

    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
    console.log(reqdata)//debug log

    return reqdata;

}
function writeDetails(filepath, key, newData) {
    //decrypt archive and append data !!!appending not overiding!!!!
    var finalData;
    try {

        var data = fs.readFileSync(filepath, 'utf-8');
        if (data) {
            var reqdata = cryptohelper.decrypt(data, key)

        } else {
            console.log("data was not retreived")
        }

    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
    console.log({ data })
    console.log({ reqdata })
    var target = JSON.parse(newData)
    console.log({ target })
    var source = JSON.parse(reqdata);
    console.log({ source })
    finalData = Object.assign(target, source);
    console.log({ "finaldata before encryption": finalData })//debug logs remember to remove 

    try {
        finalData = JSON.stringify(finalData);
        finalData = cryptohelper.encrypt(finalData, key)
        console.log({ "finaldata after encryption": finalData })
        fs.writeFileSync(filepath, finalData)
        //debug logs remember to remove 

    } catch (err) {
        console.error(err)
    }
}
/*writeDetails('../tests/test.txt',"bradleygichuru",`{
    "something.com":{
        "username":"personx",
       "password":"giberish69"
    },
    "things.com":{
        "username":"brad",
       "password":"giberish69"
    }
    
}`)*/
readFileContents('../tests/test.txt', "bradleygichuru")

module.exports = { readFileContents, writeDetails }