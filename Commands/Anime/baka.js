const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const config = require("../../Configs/config");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("baka")
    .setDescription("Get a reaction for baka")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to call")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = await interaction.options.getUser("user");

    const url = "https://nekos.best/api/v2/baka";

    fetch(url)
      .then((res) => res.json())
      .then(async (r) => {
        if (user.id !== interaction.applicationId) {
          const embed = new EmbedBuilder()
            .setColor(config.embedcolor)
            .setImage(r.results[0].url)
            .setDescription(`<@${user.id}> B~baka!`)
            .setTimestamp();

          await interaction.reply({
            embeds: [embed],
          });
        } else {
          return interaction.reply("Chigau! Anata wa baka desu!");
        }
      })
      .catch((err) => {
        console.log(err);
        interaction.reply("There was an error while executing this command.");
      });
  },
};
