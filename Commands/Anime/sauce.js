const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const config = require("../../Configs/config");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sauce")
    .setDescription("Provides the Anime name from the image.")
    .addAttachmentOption((option) =>
      option
        .setName("image")
        .setDescription("The anime you want to see info")
        .setRequired(true)
    ),
  async execute(interaction) {
    const attachment = await interaction.options.getAttachment("image")
    const url = `https://saucenao.com/search.php?db=999&api_key=${config.SAUCENAO_API}&output_type=2&numres=1&url=${encodeURIComponent(attachment.url)}`;

    fetch(url)
      .then((res) => res.json())
      .then(async (r) => {
          if (r.header.status < 0) {
            return interaction.reply('There\'s an issue with processing your image.');
        }
        if (r.results.length == 0) {
            return interaction.reply('There are no possible matches to your image.');
        }

        const result = r.results[0];
        console.log(result.data.ext_urls)
        const embed = new EmbedBuilder()
            .setColor(config.embedcolor)
            .setTitle(`Here's the sauce, ${interaction.user.username}`)
            .setThumbnail(result.header.thumbnail)
            .addFields({ name: "Similarity", value: `${result.header.similarity}%`, inline: true })
            .addFields({ name: "Anime Name", value: `${result.data.source}`, inline: true })
            .addFields({ name: "Timestamp", value: result.data.est_time, inline: true })
            .addFields({ name: "Episode", value: result.data.part, inline: true })
            .addFields({ name: "Year", value:  result.data.year, inline: true })
            .addFields({ name: "Link", value: result.data.ext_urls[1], inline: true })

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