const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const config = require("../../Configs/config");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("smug")
    .setDescription("Drop's random smug Picture/GIF"),

  async execute(interaction) {
    const url = "https://nekos.best/api/v2/smug";

    fetch(url)
      .then((res) => res.json())
      .then(async (r) => {
        const embed = new EmbedBuilder()
          .setColor(config.embedcolor)
          .setDescription(`<@${interaction.user.id}> smugs`)
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
