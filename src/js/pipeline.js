import mongodb, { MongoClient } from "mongodb"
const monngoClient = mongodb.MongoClient;

var uri = "mongodb+srv://<username>:<password>@cluster0.bvlyn.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
 function addUser(data){
     MongoClient.connect(uri,{ useNewUrlParser: true },(err,client)=>{
        let dbo = client.db('pswm')
        dbo.collection('users').insertOne(data,(err,result)=>{
            if (err) throw err
        })
        client.close()
     })
 }
 function removeUser(userId){
     MongoClient.connect(uri,{useNewUrlParser:true},(err,client)=>{
         let dbo = client.db('pswm')
         dbo.collection('users').deleteOne(userId,(err,ress)=>{
             if (err) throw err 
         })
     })
    
 }
 function addPassword(userId){
    MongoClient.connect(uri,{ useNewUrlParser: true },(err,client)=>{
        let dbo = client.db('pswm')
        dbo.collection('users').updateOne(userId,update)
        client.close()
    })
 }
 function removeData(){
    MongoClient.connect(uri,{ useNewUrlParser: true },(err,client)=>{
         
    })
 }
 function retrieveAllpasswords(){
    MongoClient.connect(uri,{ useNewUrlParser: true },(err,client)=>{
         
    })
 }