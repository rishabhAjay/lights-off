import clientConfig from "../config/clientConfig.js";
import { MessageAttachment } from "discord.js";
import DIG from "discord-image-generation";
const transformImage = () => {
  clientConfig.on("messageCreate", async (msg) => {
    const sendImage = async (url) => {
      let img;
      let attach;
      try {
        let commandString = msg.content
          .slice(2, msg.content.length)
          .replace(/ /g, "")
          .replace(/<.*/g, "")
          .replace(/[0-9]*/g, "");

        switch (commandString) {
          case "invert":
            img = await new DIG.Invert().getImage(url);
            attach = new MessageAttachment(img, "invert.png");
            break;
          case "greyscale":
            img = await new DIG.Greyscale().getImage(url);
            attach = new MessageAttachment(img, "greyscale.png");
            break;
          case "triggered":
            img = await new DIG.Triggered().getImage(url);
            attach = new MessageAttachment(img, "triggered.gif");
            break;
          case "bobross":
            img = await new DIG.Bobross().getImage(url);
            attach = new MessageAttachment(img, "bobross.png");
            break;
          case "deletetrash":
            img = await new DIG.Delete().getImage(url);
            attach = new MessageAttachment(img, "trash.png");
            break;
          default:
            clientConfig.user.setActivity("=/help");
        }

        await msg.channel.send({ files: [attach] });
      } catch (error) {
        try {
          const reply = await msg.reply(
            "An error occurred. The bot either does not have the necessary permissions or you have used an invalid file format."
          );
          setTimeout(() => reply.delete(), 10000);
        } catch (error) {
          clientConfig.user.setActivity("=/help");
        }
      }
    };
    if (
      msg.content.startsWith("=/invert") ||
      msg.content.startsWith("=/greyscale") ||
      msg.content.startsWith("=/triggered") ||
      msg.content.startsWith("=/bobross") ||
      msg.content.startsWith("=/deletetrash")
    ) {
      let url;
      let IDString = msg.content
        .replace(/=\//g, "")
        .replace(/[a-z]*/g, "")
        .split(" ");
      if (IDString) {
        IDString = IDString.filter((ele) => ele !== "");

        IDString.map(async (ele) => {
          try {
            let userID = await clientConfig.users.fetch(ele);
            url = userID.displayAvatarURL({
              dynamic: true,
              format: "png",
              size: 256,
            });
            sendImage(url);
          } catch (error) {
            clientConfig.user.setActivity("=/help");
          }
        });
      }

      const users = msg.mentions.users;
      if (users.size > 0) {
        for (const [key, value] of users.entries()) {
          url = value.displayAvatarURL({
            dynamic: true,
            format: "png",
            size: 256,
          });
          sendImage(url);
        }
      }
      const attachments = msg.attachments;
      if (attachments) {
        for (const [key, value] of attachments.entries()) {
          url = value.url;

          sendImage(url);
        }
      }
      const reply = msg.reference;
      if (reply) {
        const repliedTo = await msg.channel.messages.fetch(reply.messageId);
        if (repliedTo.embeds) {
          repliedTo.embeds.map((reply) => {
            url = reply.url;
            sendImage(url);
          });
        }
        if (repliedTo.attachments) {
          for (const [key, value] of repliedTo.attachments.entries()) {
            url = value.url;
            sendImage(url);
          }
        }
      }
    }
  });
};

export default transformImage;
