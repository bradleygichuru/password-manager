import express from "express";
import path from "path";
import {
  checkIfUserExists,
  addUser,retrieveUserData
} from "./src/js/pipeline.js";
//const path = require("path");
//const fs = require("fs");
var dirname = path.resolve("./");
console.log(dirname);
import cookieParser from "cookie-parser";
import {
  generateToken
} from "./src/js/authinit.js";
import {
  buildSchema
} from "graphql";
import {
  graphqlHTTP
} from "express-graphql";
import bodyParser from "body-parser";
import helmet from "helmet";


//var { graphqlHTTP } = require('express-graphql');
//var { buildSchema } = require('graphql');
const server = express();
const port = 3001;
const staticDir = path.join(dirname, `src`);
server.use(helmet());
server.use(cookieParser())
server.use(bodyParser.urlencoded({
  extended: false
}));
server.use(express.json());
server.use(express.static(staticDir));
console.log(dirname);

server.get("/", (req, res) => {
  //TODO if cookie exists send user direct to console 
  console.log(req.url);
  res
    .status(200)
    .type(".html")
    .sendFile(path.join(dirname, "src", "html", "index.html"));
});
server.get("/access", (req, res) => {
  console.log(req.url);//debug Log
  if (req.cookies['authtoken']) {
    console.log({cookie:req.cookies['authtoken']})//debug logs
    res.redirect(`/console/${req.cookies['authtoken']}`)
  }
  else  {
    res
    .status(200)
    .type(".html")
    .sendFile(path.join(dirname, "src", "html", "auth.html"));
  } 
  
});
server.get("/console/:identifier", async (req, res) => {
  console.log(req.url);
  let data = await retrieveUserData(req.params.identifier)
  console.log({data_to_console:data})
  //TODO functionality to display user passwords in console.html
  res
    .status(200)
    .type(".html")
    .sendFile(path.join(dirname, "src", "html", "console.html"));
});

server.post("/auth", async (req, res) => {
  console.log(req.body);
  
  let existence = await checkIfUserExists(req.body.username);
  
  if (req.body.password && req.body.username) {
    //TODO add cookie functionality and check if jwt token is expired
    //for debug
    console.log({ existence: existence });
     //debug log 
    if (existence) {
      console.log("user exists");//debug log
      let test = generateToken(`${req.body.password + req.body.username}`,req.body.password)
      let  data = await retrieveUserData(test);
      console.log({usertoken:data.token})//debug log
      res
      .cookie('authtoken',data.token)
      .redirect(`/console/${data.token}`)

      //console.log({ id: existence._id })//debug log
    } else if (!existence) {
      console.log("user does not exist"); //DEBUG log 
     
    //TODO add login logic and intergrate with db
  
      let token =  generateToken(
        req.body.password + req.body.username,
        req.body.password
      )
      //console.log({id:existence._id})//debug log
      addUser({
        username: req.body.username,
        password: req.body.password,
        payload: "",
        token:token,
      });

      res
      .status(200)
      .type(".html")
      .cookie('authtoken',token)
      .redirect(`/console/${token}`);
    }



   
    
  } else {
    res.status(404).type(".html").send("error");
  }
});

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    passwordData: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  passwordData: async () => {
    return await retrieveUserData('eyJhbGciOiJIUzI1NiJ9.a2FiZWNoYTc1OTlicmFk.mW1dR3LaMUyrstdO3wmWZWojO714IH9Kk2F8HGR7HP8'); //TODO add this
  },
};

server.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});