const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const config = require("../../Configs/config");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("neko")
    .setDescription("Drop's random Neko Picture"),

  async execute(interaction) {
    const url = "https://nekos.best/api/v2/neko";

    fetch(url)
      .then((res) => res.json())
      .then(async (r) => {
        const embed = new EmbedBuilder()
        .setTitle("Here's your Neko")
          .setColor(config.embedcolor)
          .setDescription(`Artist: [${r.results[0].artist_name}](${r.results[0].artist_href})\nSource: _[Click Here](${r.results[0].source_url})_`)
          .setImage(r.results[0].url);

        await interaction.reply({
          embeds: [embed],
        });
      })
      .catch((err) => {
        console.log(err);
        interaction.reply("There was an error while executing this command.");
      });
  },
};
