const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const config = require("../../Configs/config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Shows the avatar of a certain user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to see avatar")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    let member;
    if (!interaction.options.getUser("user")) {
      member = interaction.guild.members.cache.get(interaction.user.id);
    } else {
      member = interaction.guild.members.cache.get(
        interaction.options.getUser("user").id
      );
    }

    const embed = new EmbedBuilder()
      .setColor(config.embedcolor)
      .setTitle(`**Avatar**`)
      .setImage(member.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setDescription(`\`Links:\` **[png](${member.displayAvatarURL({ format: "png", size: 1024 })}) | [jpg](${member.displayAvatarURL({ format: "jpg", size: 1024 })}) | [gif](${member.displayAvatarURL({ format: "gif", size: 1024, dynamic: true })}) | [webp](${member.displayAvatarURL({ format: "webp", size: 1024 })})**`)
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({
          dynamic: true,
          size: 1024,
        }),
      })
      .setTimestamp();

    await interaction.reply({
      embeds: [embed],
      ephemeral: false,
    });
  },
};
