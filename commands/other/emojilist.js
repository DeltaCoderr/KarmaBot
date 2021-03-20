const { MessageEmbed } = require("discord.js");
const config = require("../../configs/config.json");

module.exports = {
  config: {
    name: "emojis",
    description: "Shows all the emojis available in the server",
    aliases: ["Serveremojis", "emojilist", "serveremojis"],
    usage: "",
    accessableby: "",
  },
  run: async (client, message, args) => {
    let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;

    function Emoji(id) {
      return client.emojis.cache.get(id).toString();
    }
    message.guild.emojis.cache.forEach((emoji) => {
      OverallEmojis++;
      if (emoji.animated) {
        Animated++;
        EmojisAnimated += Emoji(emoji.id);
      } else {
        EmojiCount++;
        Emojis += Emoji(emoji.id);
      }
    });
    let Embed = new MessageEmbed()
      .setTitle(`Emojis in ${message.guild.name} | Emojis [${OverallEmojis}] `)
      .setDescription(
        `**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}`
      )
      .setColor(config.embedcolor);

    if (Embed.length > 2000) {
      return message.channel.send(
        `I'm sorry but, my limit is 2000 characters only!`
      );
    } else {
      message.channel.send(Embed);
    }
  },
};
