import express from "express";
import path from "path";
import {
  checkIfUserExists,
  addUser
} from "./src/js/pipeline.js";
//const path = require("path");
//const fs = require("fs");
var dirname = path.resolve("./");
console.log(dirname);

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
import { resourceLimits } from "worker_threads";

//var { graphqlHTTP } = require('express-graphql');
//var { buildSchema } = require('graphql');
const server = express();
const port = 3000;
const staticDir = path.join(dirname, `src`);
server.use(helmet());
server.use(bodyParser.urlencoded({
  extended: false
}));
server.use(express.json());
server.use(express.static(staticDir));
console.log(dirname);
server.get("/", (req, res) => {
  console.log(req.url);
  res
    .status(200)
    .type(".html")
    .sendFile(path.join(dirname, "src", "html", "index.html"));
});
server.get("/access", (req, res) => {
  console.log(req.url);
  res
    .status(200)
    .type(".html")
    .sendFile(path.join(dirname, "src", "html", "auth.html"));
});
server.post("/auth", async (req, res) => {
  console.log(req.body);
  let existence = await checkIfUserExists(req.body.username);
  if (req.body.password && req.body.username) {
    //TODO check if user ,if true send him to console if not , add him to the db;
    //for debug
    console.log({ existence: existence }); //debug log 
    if (existence) {
      console.log("user exists"); //debug log


      //console.log({ id: existence._id })//debug log
    } else if (!existence) {
      console.log("user does not exist"); //DEBUG log 


      //console.log({id:existence._id})//debug log
      addUser({
        username: req.body.username,
        password: req.body.password,
        payload: "",
        token: generateToken(
          req.body.password + req.body.username,
          "somePassword"
        ),
      });
    }



    res
      .status(200)
      .type(".html")
      .sendFile(path.join(dirname, "src", "html", "index.html"));
    //TODO add login logic and intergrate with db
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
  passwordData: () => {
    return `stringified object of password data`; //TODO add this
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