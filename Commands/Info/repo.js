const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Configs/config');
const emotes = require('../../Configs/emotes');

module.exports = {
    help: {
        name: 'repo',
        aliases: ['repo'],
        description: 'Link to the Github Repository',
        category: "Info"
    },
    data: new SlashCommandBuilder()
		.setName('repo')
		.setDescription("Link to the Github Repository"),
	async execute(interaction, client) {
		const embed = new EmbedBuilder()
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription("**Karma Bot Project** \n\n<:github:803579137759379497> **Karma Bot is Open Source! [Click Here](https://github.com/DeltaCoderr/KarmaBot) to check the Github!\n" + emotes.flyinghearts + "Contributions are Welcomed, Thanks for supporting me.** ❤️")
            .addFields({name: "Invite Link: ", value: `**[Click Here!](https://discord.com/api/oauth2/authorize?client_id=636484020301201418&permissions=32&scope=bot)**`, inline: true})
            .addFields({name: "Support Link: ", value: `**[Click Here!](https://discord.gg/NtyaM9d)**`, inline: true})
            .addFields({name: "Vote Link:", value: `**[Click Here!](https://top.gg/bot/636484020301201418/vote)**`, inline: true})
            .setTimestamp()
            .setFooter({text: "© Karma", iconURL: "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png"})
            .setColor(config.embedcolor);
        await interaction.reply({
            embeds: [embed],
        });

	}
}