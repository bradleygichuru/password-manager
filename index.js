import 'dotenv/config';
import path from 'path';
import cors from 'cors';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
//serving static resources
app.use(express.static(path.join(__dirname, './src')));
app.get('/', (req,res) => {
  res.sendFile('indexV2.html', {root:'./src/html'});
});
//AUTHENTICATION AND ENCRYPTION
//???to be reviewed-START???
import {
  checkIfUserExists,
  addUser, retrieveUserData, addPassword
} from "./src/js/pipeline.js";
//const path = require("path");
//const fs = require("fs");
//TODO write test for github CI

import cookieParser from "cookie-parser";
import {
  generateToken
} from "./src/js/authinit.js";
import bodyParser from "body-parser";
import helmet from "helmet";
//???To be reviewed- END???

app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.json());

app.get('/', (req, res) => {

  if (req.cookies['authtoken']) {
    console.log({ cookie: req.cookies['authtoken'] })//debug logs
    res
      .status(200)
      .redirect(`/console/${req.cookies['authtoken']}`);
  }
  else {
    console.log(req.url);
    res
      .status(200)
      .type(".html")
      .sendFile(path.join('${staticDir}/src/html/indexV2.html'));
  }
});
app.get("/access", (req, res) => {
  console.log(req.url);//debug Log
  if (req.cookies['authtoken']) {
    console.log({ cookie: req.cookies['authtoken'] })//debug logs
    res.redirect(`/console/${req.cookies['authtoken']}`)
  }
  else {
    res
      .status(200)
      .type(".html")
      .sendFile(path.join(dirname, "src", "html", "auth.html"));
  }

});
app.get("/console/:identifier", async (req, res) => {
  console.log(req.url);

  res
    .status(200)
    .type(".html")

    .sendFile(path.join(dirname, "src", "html", "console.html"));

});

app.get("/api/:apiIdentifier", async (req, res) => {
  console.log(req.body);
  let data = await retrieveUserData(req.params.apiIdentifier)
  console.log({ requestedData: data })
  res
    .status(200)
    .json(data)
})

app.post("/auth", async (req, res) => {
  //Authentication route handles new sign is and logins
  console.log(req.body);

  let existence = await checkIfUserExists(req.body.username);

  if (req.body.password && req.body.username) {
    //TODO add cookie functionality and check if jwt token is expired
    //for debug
    console.log({ existence: existence });
    //debug log 
    if (existence) {
      //TODD fix invalid password functionality 
      console.log("user exists");//debug log
      let test = generateToken(`${req.body.password + req.body.username}`, req.body.password)
      let data = await retrieveUserData(test);
      console.log({ usertoken: data.token })//debug log
      res
        .cookie('authtoken', data.token)
        .status(200)
        .redirect(`/console/${data.token}`)

      //console.log({ id: existence._id })//debug log
    } else if (!existence) {
      console.log("user does not exist"); //DEBUG log 



      let token = generateToken(
        req.body.password + req.body.username,
        req.body.password
      )
      //console.log({id:existence._id})//debug log
      addUser({
        username: req.body.username,
        password: req.body.password,
        payload: [],
        token: token,
      });

      res
        .status(200)
        .type(".html")
        .cookie('authtoken', token)
        .redirect(`/console/${token}`);
    }


  } else {
    res.status(404).type(".html").send("error");
  }
});
app.post("/addpswd", async (req, res) => {
  //receive password details from the frontend and add them to the database 
  let token = req.cookies['authtoken']
  console.log({ site: req.body.siteurl, username: req.body.username, password: req.body.password })
  addPassword({ site: req.body.siteurl, username: req.body.username, password: req.body.password }, token)
  res
    .status(200)
    .redirect(`/console/${token}`)
//AUTHENTICATION AND ENCRYPTION END

})

app.listen(process.env.PORT, () => 
  console.log(`search http://localhost:${process.env.PORT} on your browser to use the app :-) `),
);