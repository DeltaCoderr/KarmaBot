const {
  MessageEmbed
} = require("discord.js");
const config = require("../../configs/config.json");
const nekos = require("nekos.life");
const {
  sfw: {
    kiss,
    slap
  },
} = new nekos();

module.exports = {
  config: {
    category: __dirname.split("commands\\")[1],
    name: "kiss",
    description: "Get's a kiss reaction!",
    aliases: ["KISS", "Kiss"],
    usage: "",
    accessableby: "",
  },
  run: async (client, message, args) => {
    const embed = new MessageEmbed();

    if (
      message.mentions.members.size &&
      message.mentions.members.first().id === client.user.id
    ) {
      const {
        url
      } = await slap().catch(() => {});

      if (!url) return message.channel.send(`Could not connect to nekos.life`);

      return message.channel.send(
        embed
        .setColor(config.embedcolor)
        .setDescription(`${message.member}, How dare you!`)
        .setImage(url)
        .setFooter(
          `${message.member.displayName}, you really do deserve a slapping.`
        )
      );
    } else {
      const {
        url
      } = await kiss().catch(() => {});

      if (!url) return message.channel.send(`Could not connect to nekos.life`);

      if (
        message.mentions.members.size &&
        message.mentions.members.first().id === message.author.id
      ) {
        return message.channel.send(`S~seriously?!`);
      } else if (message.mentions.members.size) {
        return message.channel.send(
          embed
          .setColor(config.embedcolor)
          .setDescription(
            `${message.member} kisses ${message.mentions.members.first()}!`
          )
          .setImage(url)
        );
      } else {
        return message.channel.send(
          `Sorry ${message.member}, I can't seem to locate your imaginary friend.`
        );
      }
    }
  },
};