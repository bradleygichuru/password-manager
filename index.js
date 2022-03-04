import express, { json } from "express";
import path from "path";
import {
  checkIfUserExists,
  addUser, retrieveUserData, addPassword
} from "./src/js/pipeline.js";
//const path = require("path");
//const fs = require("fs");
//TODO write test for github CI
var dirname = path.resolve("./");
console.log(dirname);
import cookieParser from "cookie-parser";
import {
  generateToken
} from "./src/js/authinit.js";
import cors from "cors"
import bodyParser from "body-parser";
import helmet from "helmet";



const server = express();
const port = process.env.PORT || 3000
const staticDir = path.join(dirname, `src`);
/*server.use(helmet({
  contentSecurityPolicy: false,
}));*///
server.use(cors({
  origin: '*'
}))
server.use(cookieParser())
server.use(bodyParser.urlencoded({
  extended: false
}));
server.use(express.json());
server.use(express.static(staticDir));
console.log(dirname);

server.get("/", (req, res) => {

  if (req.cookies['authtoken']) {
    console.log({ cookie: req.cookies['authtoken'] })//debug logs
    res.
      status(200)
    redirect(`/console/${req.cookies['authtoken']}`)
  }
  else {
    console.log(req.url);
    res
      .status(200)
      .type(".html")
      .sendFile(path.join(dirname, "src", "html", "index.html"));
  }
});
server.get("/access", (req, res) => {
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
server.get("/console/:identifier", async (req, res) => {
  console.log(req.url);

  res
    .status(200)
    .type(".html")

    .sendFile(path.join(dirname, "src", "html", "console.html"));

});

server.get("/api/:apiIdentifier", async (req, res) => {
  console.log(req.body);
  let data = await retrieveUserData(req.params.apiIdentifier)
  console.log({ requestedData: data })
  res
    .status(200)
    .json(data)
})

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
        payload: "",
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
server.post("/addpswd", async (req, res) => {

  let token = req.cookies['authtoken']
  addPassword(token, { site: req.body.siteurl, username: req.body.username, password: req.body.password }, token)
  res
    .status(200)
    .redirect(`/console/${token}`)


})


server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);//Debug log 
});