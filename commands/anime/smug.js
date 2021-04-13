const {
  MessageEmbed
} = require("discord.js");
const config = require("../../configs/config.json");
const nekos = require("nekos.life");
const {
  sfw: {
    smug
  },
} = new nekos();

module.exports = {
  config: {
    category: __dirname.split("commands\\")[1],
    name: "smug",
    description: "Get's a smug reaction!",
    aliases: ["SMUG", "Smug"],
    usage: "",
    accessableby: "",
  },
  run: async (client, message, args) => {
    const {
      url
    } = await smug().catch(() => {});

    if (!url) return message.channel.send(`Could not connect to nekos.life`);

    message.channel.send(
      new MessageEmbed()
      .setColor(config.embedcolor)
      .setImage(url)
      .setDescription(`${message.member} smugs.`)
    );
  },
};