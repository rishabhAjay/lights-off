import dotenv from "dotenv";
dotenv.config(); //initialize dotenv
import clientConfig from "./config/clientConfig.js";
import help from "./components/help.js";
import transformImage from "./components/transformImage.js";
import createInvite from "./components/createInvite.js";
import cron from "node-cron";
import http from "http";
import url from "url";
//exported functions
help();
transformImage();
createInvite();
clientConfig.on("ready", () => {
  console.log(`Logged in as ${clientConfig.user.tag}!`);
  cron.schedule("*/5 * * * *", () => {
    clientConfig.user.setActivity("=/help");
  });
});

const port = process.env.PORT || 3000;

const requestHandler = (request, response) => {
  const baseURL = req.protocol + "://" + req.headers.host + "/";
  const reqUrl = new URL(req.url, baseURL);
  if (request.method == "GET") {
    if (reqUrl == "/health") {
      const healthcheck = {
        uptime: process.uptime(),
        message: "OK",
        timestamp: Date.now(),
      };
      try {
        res.send(healthcheck);
      } catch (error) {
        healthcheck.message = error;
        res.status(503).send();
      }
    } else if (reqUrl === "/") {
      res.send("Welcome to Lights Off!");
    }
  }
};

const server = http.createServer(requestHandler);
server.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${port}`);
});

//make sure this line is the last line
clientConfig.login(process.env.CLIENT_TOKEN); //login bot using token
