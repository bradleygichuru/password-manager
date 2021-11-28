import express from 'express';
import path from 'path';
//const path = require("path");
//const fs = require("fs");
var __dirname = path.dirname.toString()
//const { generateToken } = require("./src/js/authinit");
//import { generateToken } from './src/js/authinit.js';//TODO some error 
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
//var { graphqlHTTP } = require('express-graphql');
//var { buildSchema } = require('graphql');
const server = express();
const port = 3000;
const staticDir = path.join(__dirname, `public`);
server.use(express.json())
server.use(express.static(staticDir));
server.get("/", (req, res) => {
  console.log(req.url);
  res
    .status(200)
    .type(".html")
    .sendFile(path.join(__dirname, "src", "html", "index.html"));
});

server.post("/auth", (req, res) => {
  if (req.body.password == query && req.body.password == password) {
    //let token = generateToken(req.body.password + req.body.username, somePassword);
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