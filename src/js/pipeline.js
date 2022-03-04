//FIXME addPassword() not modifying passwords 
import {
  MongoClient
} from "mongodb";
const uri =
  "mongodb+srv://brad-kabecha:LfmLb9K9SC7Cjnft@cluster0.bvlyn.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

export async function addUser(data) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true
  });
  try {
    await client.connect()
    let db = client.db("pswm")
    let users = db.collection("users")
    let result = await users.insertOne(data)
    if (result.insertedId) return true;
    else throw error;;

  } catch (error) {

  } finally {
    await client.close()
  }
}
export function removeUser(username) {
  MongoClient.connect(uri, {
    useNewUrlParser: true
  }, (err, client) => {
    let dbo = client.db("pswm");
    dbo.collection("users").deleteOne(username, (err, ress) => {
      if (err) throw err;
    });
  });
}
export async function addPassword(username, update, token) {
  
  const client = new MongoClient(uri, {
    useNewUrlParser: true
  });
  let passwords = await retrieveUserData(token)
  try {
    console.log({
      userToUpdate: username
    }) //DEBUG log
    await client.connect()
    let db = client.db("pswm")
    let users = db.collection("users")
    const options = { upsert: true };
    
    passwords = passwords.payload
    console.log({passwords})
    console.log({update})
    passwords.push({update})
    
    console.log({passwords})
    let result = await users.updateOne({ username: username }, { $set:{payload:passwords} },options)
    console.log({ result })//degug log 
    if (error) throw error
  } catch (error) {

  } finally {
    await client.close()
  }
}
export async function checkIfUserExists(username) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true
  });

  try {
    /*console.log({
      usernametocheck: username
    }) //debug log*/
    await client.connect()
    let db = client.db("pswm")
    let users = db.collection("users")
    let result = await users.findOne({
      username: username
    })
    console.log({ result: result })//degug log 
    if (result.username == username) {
      return true
    }
    else if (!result.username) {
      return false
    }
    if (error) throw error
  } catch (error) {

  } finally {
    await client.close()
  }

}
export function removePasswords() {
  MongoClient.connect(uri, {
    useNewUrlParser: true
  }, (err, client) => { });
}
export function retrieveAllpasswords() {
  MongoClient.connect(uri, {
    useNewUrlParser: true
  }, (err, client) => { });
}
export async function retrieveUserData(query) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true
  });

  try {
    console.log({
      query: query
    }) //debug log
    await client.connect()
    let db = client.db("pswm")
    let users = db.collection("users")
    let result = await users.findOne({
      token: query
    })
    console.log({ result_data: result })//degug log 

    return result


    if (error) throw error
  } catch (error) {

  } finally {
    await client.close()
  }

}
addPassword("eyJhbGciOiJIUzI1NiJ9.a2FiZWNoYTc1OTlicmFk.mW1dR3LaMUyrstdO3wmWZWojO714IH9Kk2F8HGR7HP8",{ site: 'marx.com', username: 'marx', password: 'nZaSYJ8V8dujAkj' },"eyJhbGciOiJIUzI1NiJ9.a2FiZWNoYTc1OTlicmFk.mW1dR3LaMUyrstdO3wmWZWojO714IH9Kk2F8HGR7HP8")
