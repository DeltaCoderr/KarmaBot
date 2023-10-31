const { SlashCommandBuilder } = require("@discord.js/builders");
const { EmbedBuilder } = require("discord.js");
const config = require("../../Configs/config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("npm")
    .setDescription("Show information about a npm package")
    .addStringOption((option) =>
      option
        .setName("package")
        .setDescription("The package information you want to see.")
        .setRequired(true),
    ),

  async execute(interaction) {
    const packageName = interaction.options.getString("package");
    const url = `https://api.npms.io/v2/search?q=${packageName}`;
    let response;
    try {
      response = await fetch(url).then((res) => res.json());
    } catch (e) {
      return interaction.reply({
        content: "An error occured, please try again",
        ephermal: true,
      });
    }

    try {
      await interaction.deferReply();
      const npmpkg = response.results[0].package;
      const embed = new EmbedBuilder()
        .setColor(config.embedcolor)
        .setThumbnail(
          "https://images-ext-2.discordapp.net/external/ouvh4fn7V9pphARfI-8nQdcfnYgjHZdXWlEg2sNowyw/https/cdn.auth0.com/blog/npm-package-development/logo.png",
        )
        .setURL(npmpkg.links.npm)
        .setDescription(npmpkg.description)
        .addFields({ name: "Author :", value: npmpkg.author?.name || "None" })
        .addFields({
          name: "Maintainers :",
          value: npmpkg.maintainers
            ? npmpkg.maintainers.map((m) => m.username).join(", ")
            : "None",
        })
        .addFields({ name: "Version :", value: npmpkg.version })
        .setTimestamp();
      await interaction.editReply({ embeds: [embed] });
    } catch (e) {
      return interaction.reply({
        content: "No such package found.",
        ephermale: true,
      });
    }
  },
};
