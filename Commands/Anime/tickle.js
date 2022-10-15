const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const config = require("../../Configs/config");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tickle")
    .setDescription("Get a gif to tickle someone")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to tickle")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const channel = await client.channels.cache.get(interaction.channelId)
    const user = await interaction.options.getUser("user");

    const url = "https://nekos.best/api/v2/tickle";

    fetch(url)
      .then((res) => res.json())
      .then(async (r) => {
        if (user.id !== interaction.applicationId) {
          const embed = new EmbedBuilder()
            .setColor(config.embedcolor)
            .setImage(r.results[0].url)
            .setDescription(`<@${interaction.user.id}> tickles <@${user.id}>`)
            .setTimestamp();

          await interaction.reply({
            embeds: [embed],
          });
        } else {
        await interaction.reply({
            content: `<@${interaction.user.id}> don'ts you dare to!`
          });
        await channel.send({
            content: 'https://media.tenor.com/_vp7KTrr4WMAAAAC/karma-akabane-anime.gif'
          })

        }
      })
      .catch((err) => {
        console.log(err);
        interaction.reply("There was an error while executing this command.");
      });
  },
};
