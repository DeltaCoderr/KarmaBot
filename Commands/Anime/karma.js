const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const config = require("../../Configs/config");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("karma")
    .setDescription("Drop's a random Karma Picture"),

  async execute(interaction) {
    const url = "https://api.deltacoderr.repl.co/karma";

    fetch(url)
      .then((res) => res.json())
      .then(async (r) => {
        const embed = new EmbedBuilder()
          .setTitle(
            `Random Karma ${
              r.url.endsWith(".png")
                ? "Picture"
                : `${r.url.endsWith(".gif") ? "GIF" : "Picture"}`
            }`
          )
          .setColor(config.embedcolor)
          .setDescription(`[Full View](${r.url})`)
          .setFooter({ text: `© Karma`, iconURL: interaction.user.avatarURL() })
          .setImage(r.url);

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
