import dotenv from "dotenv";
dotenv.config(); //initialize dotenv
import http from "http";
import clientConfig from "./config/clientConfig.js";
import help from "./components/help.js";
import transformImage from "./components/transformImage.js";
import createInvite from "./components/createInvite.js";

//exported functions
help();
transformImage();
createInvite();
clientConfig.on("ready", () => {
  console.log(`Logged in as ${clientConfig.user.tag}!`);
  clientConfig.user.setActivity("=/help");
});

http.createServer(function (req, res) {
res.write("I'm alive"); 
  res.end(); 
}).listen(8081);

//make sure this line is the last line
clientConfig.login(process.env.CLIENT_TOKEN); //login bot using token
