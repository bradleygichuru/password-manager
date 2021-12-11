import express from 'express';
import path from 'path';
//const path = require("path");
//const fs = require("fs");
var dirname = path.resolve('./');
console.log(dirname)

import { generateToken } from './src/js/authinit.js';
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
//var { graphqlHTTP } = require('express-graphql');
//var { buildSchema } = require('graphql');
const server = express();
const port = 3000;
const staticDir = path.join(dirname, `src`);
server.use(express.json())
server.use(express.static(staticDir));
console.log(dirname);
server.get("/", (req, res) => {
  console.log(req.url);
  res
    .status(200)
    .type(".html")
    .sendFile(path.join(dirname,"src", "html", "index.html"));
});
server.get("/access", (req, res) => {
  console.log(req.url);
  res
    .status(200)
    .type(".html")
    .sendFile(path.join(dirname,"src", "html", "auth.html"));
});
server.post("/auth", (req, res) => {
  console.log(req.body)
  if (req.body.password == query && req.body.password == password) {
    let token = generateToken(req.body.password + req.body.username, somePassword);
    //debug log 
    console.log({password:req.body.password,username:req.body.username,token:token} );
    res.status(200)
    .type(".html")
    .sendFile(path.join( dirname,"src", "html", "index.html"));
    //TODO add login logic and intergrate with db 
  }

})

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    passwordData: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  passwordData: () => {
    return `stringified object of password data` //TODO add this 
  }
};


server.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

server.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`) })