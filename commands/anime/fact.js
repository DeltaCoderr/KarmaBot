const { MessageEmbed } = require("discord.js");
const config = require("../../configs/config.json");
const random = require("anime-facts");

module.exports = {
  config: {
    name: "fact",
    description: "Get random anime facts.",
    aliases: ["Fact", "Facts", "Anifact"],
    usage: "",
    accessableby: "",
  },
  run: async (client, message, args) => {
    random.getFact().then((r) => {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Did you know?")
        .setThumbnail(
          "https://media.discordapp.net/attachments/711250719675645962/721640740136026202/uhjhyj.gif"
        )
        .setDescription(r.fact);
      message.channel.send(embed);
    });
  },
};
