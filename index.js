import dotenv from "dotenv";
dotenv.config(); //initialize dotenv
import clientConfig from "./config/clientConfig.js";
import help from "./components/help.js";
import transformImage from "./components/transformImage.js";
import createInvite from "./components/createInvite.js";
import cron from "node-cron";
//exported functions
help();
transformImage();
createInvite();
clientConfig.on("ready", () => {
  console.log(`Logged in as ${clientConfig.user.tag}!`);
  cron.schedule("*/9 * * * *", () => {
    clientConfig.user.setActivity("=/help");
  });
});

//make sure this line is the last line
clientConfig.login(process.env.CLIENT_TOKEN); //login bot using token
