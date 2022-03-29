## Lights OFF

**A discord bot that transforms your images with various filters. The bot has been created for the purpose of inverting white mode images.**

The bot uses the [discord-image-generation](https://www.npmjs.com/package/discord-image-generation) npm package for the transformations.
<br/>
To create an app instance on discord, you may refer to this guide [discord-bot-in-node-js-for-beginners](https://buddy.works/tutorials/how-to-build-a-discord-bot-in-node-js-for-beginners)
<br/>

### To host the bot locally:

- Create a `.env` file and replace the placeholder given below with **your discord token**. Do not forget to add `.env` to the **.gitignore** file.

`CLIENT_TOKEN=YOUR DISCORD TOKEN HERE`
<br/>

- You are all set. To run this app, type:
  `npm start`
  <br/>

### To host the bot on heroku

- Make sure you have installed the [heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
  <br/>
- Create a new app on heroku and follow the **on-screen instructions** to add the files to your git repository.
  <br/>
- Create a file in your directory called **Procfile**. This will contain the server start script: `worker: index.js`.
  <br/>
- Add **config-var** under your **app settings** with:
  `CLIENT_TOKEN=YOUR DISCORD TOKEN HERE`
  <br/>
- Go ahead and push the project to heroku.
  <br/>
- Under the **resources tab** of your app, check if the `worker` dyno is enabled, if not then enable it. You will also have to disable the `web` dyno.

### Bot Commands

#### Main Commands

- `=/invert`
  Inverts the color of an Image. Upload an image along with the command(**Only one Image**).
  <br/>
- `=/grayscale`
  Grayscales an Image. Upload an image along with the command(**Only one Image**).
  <br/>
- `=/help`
  lists all the commands.
  <br/>

#### Fun Commands

- `=/triggered`
  Generates a gif with the triggered meme effect.
  <br/>
- `=/bobross`
  Generates an image of Bob Ross painting the image you selected.
  <br/>
- `=/deletetrash`
  Generates an image of a recycle bin window prompt with the image you selected.
