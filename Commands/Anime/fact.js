const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const config = require("../../Configs/config");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fact")
    .setDescription("Get a random Anime Fact"),

  async execute(interaction) {
    const url = "https://animu.ml/api/fact";

    fetch(url, {
      headers: {
        Auth: config.ANIMU_API,
      },
    })
      .then((res) => res.json())
      .then(async (r) => {
        const embed = new EmbedBuilder()
          .setColor(config.embedcolor)
          .setTitle("Did you know?")
          .setThumbnail(
            "https://media.discordapp.net/attachments/711250719675645962/721640740136026202/uhjhyj.gif"
          )
          .setDescription(r.fact)
          .setFooter({
            text: "© animu.ml",
            iconURL:
              "https://cdn.discordapp.com/icons/479300008118714388/79c8467a7d10569ad569ec5462d80907.png",
          })
          .setTimestamp();

        await interaction.reply({
          embeds: [embed],
        });
      }).catch((err) => {
        console.log(err)
        interaction.reply("There was an error while executing this command.")
      })
  },
};
