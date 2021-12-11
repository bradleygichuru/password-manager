//wconst cryptohelper = require('./cryptohelper.js');

import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { readFileSync, writeFileSync } from 'fs';

export async function firstTimeInit() {
    const db = await open({
        filename: './rango.db',
        driver: sqlite3.Database
      });
      await db.exec('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT,email text,pwsdString text,token text )'); 
      await db.close()
}

export async function openDB(){
    return(
        await open({
            filename: './rango.db',
            driver: sqlite3.cached.Database
          })
    )
}

export async function addRow(data){
//TODO add logic to add rows to the database 
    let db = await openDB();
    db.exec(`${sf}`);
    db.close()
}
export async function updateToken (id,token){
    let db = await openDB();
    db.exec(`UPDATE users`)
//TODO add logic to add update user tokens a login 
}

function readFileContents(filepath, key) {
    //read , decrypt ,send
    try {

        var data = readFileSync(filepath, 'utf-8');
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

        var data = readFileSync(filepath, 'utf-8');
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
        writeFileSync(filepath, finalData)
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
//readFileContents('../tests/test.txt', "bradleygichuru")
init()

export default { readFileContents, writeDetails }