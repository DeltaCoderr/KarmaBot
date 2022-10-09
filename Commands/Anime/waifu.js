const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const config = require("../../Configs/config");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("waifu")
    .setDescription("Drops a random waifu picture"),

  async execute(interaction) {
    const url = "https://animu.ml/api/waifu";

    fetch(url, {
      headers: {
        Auth: config.ANIMU_API,
      },
    })
      .then((res) => res.json())
      .then(async (r) => {
        const embed = new EmbedBuilder()
          .setColor(config.embedcolor)
          .setAuthor({
            name: `${r.names.en}${r.names.jp ? ` • ${r.names.jp}` : ""}`,
            iconURL: r.images[0],
          })

          .setDescription(`Anime: ${r.from.name}`)
          .setImage(r.images[0])
          .setFooter({
            text: `💖 ${r.statistics.love} • 💔 ${r.statistics.hate}`,
          });

        const message = await interaction.reply({
          embeds: [embed],
          fetchReply: true,
        });
        message.react("💖");
      })
      .catch((err) => {
        console.log(err);
        interaction.reply("There was an error while executing this command.");
      });
  },
};
