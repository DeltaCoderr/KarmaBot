const { MessageEmbed } = require("discord.js");
const config = require("../../configs/config.json");
const nekos = require("nekos.life");
const {
  sfw: { baka },
} = new nekos();

module.exports = {
  config: {
    name: "baka",
    description: "Get's a reaction for baka!",
    aliases: ["BAKA", "Baka"],
    usage: "<user>",
    accessableby: "",
  },
  run: async (client, message, args) => {
    const { url } = await baka().catch(() => {});

    if (!url) return message.channel.send(`Could not connect to nekos.life`);

    const embed = new MessageEmbed();
    if (
      message.mentions.members.size &&
      message.mentions.members.first().id === client.user.id
    ) {
      return message.channel.send(`Chigau! Anata wa baka desu!`);
    } else if (
      message.mentions.members.size &&
      message.mentions.members.first().id === message.author.id
    ) {
      return message.channel.send(`Seriously?`);
    } else if (message.mentions.members.size) {
      return message.channel.send(
        embed
          .setColor(config.embedcolor)
          .setImage(url)
          .setDescription(`${message.mentions.members.first()} B~baka!`)
      );
    } else
      return message.channel.send(
        embed.setColor(config.embedcolor).setImage(url)
      );
  },
};
