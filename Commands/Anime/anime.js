const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const config = require("../../Configs/config");
const Scraper = require("mal-scraper");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("anime")
    .setDescription("Shows Information about an Anime")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The anime you want to see info")
        .setRequired(true)
    ),
  async execute(interaction) {
    const name = interaction.options.getString("name");

    try {
      await interaction.deferReply();
      const anime = await Scraper.getInfoFromName(name);
      if (!anime.premiered) anime.premiered = "N/A";
      if (!anime.genres[0]) anime.genres[0] = "N/A";

      const embed = new EmbedBuilder()
        .setColor(config.embedcolor)
        .setURL(anime.url)
        .setTitle(anime.title)
        .setDescription(anime.synopsis)
        .addFields({ name: "Type", value: anime.type, inline: true })
        .addFields({ name: "Status", value: anime.status, inline: true })
        .addFields({
          name: "Premiered",
          value: anime.premiered,
          inline: true,
        })
        .addFields({ name: "Episodes", value: anime.episodes, inline: true })
        .addFields({ name: "Duration", value: anime.duration, inline: true })
        .addFields({
          name: "Popularity",
          value: anime.popularity,
          inline: true,
        })
        .addFields({ name: "Genres", value: anime.genres.join(", ") })
        .setThumbnail(anime.picture)
        .setFooter({ text: `Score - ${anime.score}` })
        .setTimestamp();
      await interaction.editReply({
        embeds: [embed],
      });
    } catch (error) {
      console.log(error);
      return interaction.reply({
        content: "No Anime Found!",
        ephemeral: false,
      });
    }
  },
};
