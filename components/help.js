import clientConfig from "../config/clientConfig.js";

const help = () => {
  clientConfig.on("messageCreate", async (msg) => {
    if (msg.author.bot) return false;
    if (
      msg.content.includes("@here") ||
      msg.content.includes("@everyone") ||
      msg.type == "REPLY"
    ) {
      return false;
    }
    if (
      msg.mentions.has(clientConfig.user.id) ||
      msg.content.startsWith("=/help")
    ) {
      //embed text for help
      try {
        await msg.channel.send({
          embeds: [
            {
              title: "**__HELP__**",
              thumbnail: {
                url: clientConfig.user.displayAvatarURL(),
              },
              fields: [
                {
                  value:
                    "*You can upload multiple images or reply to messages that contain multiple image embeds. You can also pass in user' as mentions or IDs to tranform their avatars. For example: ```=/invert @User1 User2ID```*",
                  name: "__Note__",
                },
                {
                  value: "Inverts the color of an Image.",
                  name: "- ```=/invert```",
                },
                {
                  value: "Grayscales an Image.",
                  name: "- ```=/greyscale```",
                },
                {
                  value: "Generates an invite link to the support server.",
                  name: "- ```=/invite```",
                },
                {
                  value:
                    "https://discord.com/api/oauth2/authorize?client_id=935508548446736464&permissions=117761&scope=bot",
                  name: "**Invite this Bot**",
                },
                {
                  value: "*Some meme commands because why not.*",
                  name: "**__FUN COMMANDS__**",
                },
                {
                  value: "Generates a gif with the triggered meme effect.",
                  name: "- ```=/triggered```",
                },
                {
                  value:
                    "Generates an image of Bob Ross painting the image you selected.",
                  name: "- ```=/bobross```",
                },
                {
                  value:
                    "Generates an image of a recycle bin window prompt with the image you selected.",
                  name: "- ```=/deletetrash```",
                },
              ],
            },
          ],
        });
      } catch (error) {
        try {
          await msg.author.send(
            "The bot does not have the required permissions. Give it the necessary permissions."
          );
        } catch (error) {
          clientConfig.user.setActivity("=/help");
        }
      }
    }
  });
};

export default help;
