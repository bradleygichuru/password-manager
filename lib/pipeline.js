import {MongoClient} from "mongodb";
const uri =
  "mongodb+srv://brad-kabecha:LfmLb9K9SC7Cjnft@cluster0.bvlyn.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const options = { upsert: true };
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
export async function removeUser(username) {
  MongoClient.connect(uri, {
    useNewUrlParser: true
  }, (err, client) => {
    let dbo = client.db("pswm");
    dbo.collection("users").deleteOne(username, (err, ress) => {
      if (err) throw err;
    });
  });
}
export async function addPassword(update, token) {

  const client = new MongoClient(uri, {
    useNewUrlParser: true
  });

  try {

    let passwords = await retrieveUserData(token)
    if (passwords) {
      //if passwords is not null ,user exists,then update the users passwords array 
      console.log({
        usersessionstring: token
      }) //DEBUG log
      await client.connect()
      let db = client.db("pswm")
      let users = db.collection("users")
      

      passwords = passwords.payload

      console.log({ update })//DEBUG log 
      passwords.push(update)

      //console.log({ passwords })
      let result = await users.findOneAndUpdate({ token: token }, { $set: { payload: passwords } }, options)
      console.log({ result })//degug log 
      return result
    }

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
    console.log({ result: result })//debug log 
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
export async function removePassword(token, candidate) {
  //TODO candidate of refactoring since it provides functionlity that is not needed 
  const client = new MongoClient(uri, {
    useNewUrlParser: true
  });
  try {

    let passwords = await retrieveUserData(token)
    console.log({
      usersessionstring: token
    }) //DEBUG log
    await client.connect()
    let db = client.db("pswm")
    let users = db.collection("users")
 
    let update = []
    passwords = passwords.payload
    passwords.forEach(element => {
      if (element.site != candidate) {
        update.push(element)
        //console.log(`search hit ${candidate} in ${element}`);//DEBUG log
      }
      //DEBUG log
    });
    passwords = update
    //console.log({ update })//DEBUG log 
    //passwords.push(update)

    //console.log({ passwords })
    let result = await users.findOneAndUpdate({ token: token }, { $set: { payload: passwords } }, options)
    console.log({ result })//debug log 
    return result
    
  } 
  catch (error) {

  } finally {
    await client.close()
  }
}

export async function editPassword(token, update) {
  //TODO test if works 
  const client = new MongoClient(uri, {
    useNewUrlParser: true
  });
  try {

    let passwords = await retrieveUserData(token)
    console.log({
      usersessionstring: token
    }) //DEBUG log
    await client.connect()
    let db = client.db("pswm")
    let users = db.collection("users")

    let pswdUpdate = []
    let candidates = Object.keys(update)
    passwords = passwords.payload
    passwords.forEach(element => {

      Object.keys(element).forEach(field => {
        if (candidates.includes(field)) {
          element.field = update.field
        }
      })
      pswdUpdate.push(element)
      //DEBUG log
    });
    passwords = pswdUpdate
    //console.log({ update })//DEBUG log 
    //passwords.push(update)

    //console.log({ passwords })
    let result = await users.findOneAndUpdate({ token: token }, { $set: { payload: passwords } }, options)
    console.log({ result })//debug log 
    if (error) throw error
  } catch (error) {

  } finally {
    await client.close()
  }
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
