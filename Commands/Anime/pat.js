const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const config = require("../../Configs/config");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pat")
    .setDescription("Get a gif to Pat someone")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to pat")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const channel = await client.channels.cache.get(interaction.channelId)
    const user = await interaction.options.getUser("user");

    const url = "https://nekos.best/api/v2/pat";

    fetch(url)
      .then((res) => res.json())
      .then(async (r) => {
        if (user.id !== interaction.applicationId) {
          const embed = new EmbedBuilder()
            .setColor(config.embedcolor)
            .setImage(r.results[0].url)
            .setDescription(`<@${user.id}> pats <@${interaction.user.id}>!`)
            .setTimestamp();

          await interaction.reply({
            embeds: [embed],
          });
        } else {
        await interaction.reply({
            content: 'Arigatou! :)'
          });
        await channel.send({
            content: 'https://cdn.discordapp.com/attachments/1027953814256500856/1029037908914610279/karma-akabane-smile-gif.gif'
          })

        }
      })
      .catch((err) => {
        console.log(err);
        interaction.reply("There was an error while executing this command.");
      });
  },
};
