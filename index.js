import dotenv from "dotenv";
dotenv.config(); //initialize dotenv
import clientConfig from "./config/clientConfig.js";
import help from "./components/help.js";
import transformImage from "./components/transformImage.js";
import createInvite from "./components/createInvite.js";
import express from "express";
import cron from "node-cron";
import http from "http";
import url from "url";
const app = express();
app.use(express.json());
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

app.get("/health", (request, response) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };
  try {
    console.log(Object.keys(response));
    response.status(200).send(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    response.status(503).send({ error });
  }
});
app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${port}`);
});

//make sure this line is the last line
clientConfig.login(process.env.CLIENT_TOKEN); //login bot using token
