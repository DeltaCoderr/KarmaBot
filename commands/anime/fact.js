const { MessageEmbed } = require("discord.js");
const config = require("../../configs/config.json");
const AnimeFact = require("anime-facts");
const api = new AnimeFact(config.FACT_API)

module.exports = {
  config: {
    name: "fact",
    description: "Get random anime facts.",
    aliases: ["Fact", "Facts", "Anifact"],
    usage: "",
    accessableby: "",
  },
  run: async (client, message, args) => {
    api.getFact().then((r) => {
      const embed = new MessageEmbed()
        .setColor(config.embedcolor)
        .setTitle("Did you know?")
        .setThumbnail(
          "https://media.discordapp.net/attachments/711250719675645962/721640740136026202/uhjhyj.gif"
        )
        .setDescription(r.fact)
        .setFooter(`© Karma `, "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")
        .setTimestamp()
        
      message.channel.send(embed);
    });
  },
};
