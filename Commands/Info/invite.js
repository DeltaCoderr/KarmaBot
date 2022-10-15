const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Configs/config');

module.exports = {
    help: {
        name: 'invite',
        aliases: ['inv'],
        description: 'Link for Bot\'s Invite',
        category: "Info"
    },
    data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription("Link for Bot\'s Invite"),
	async execute(interaction, client) {
		const embed = new EmbedBuilder()
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription("**Karma Bot Project** \n\n**👋 Hey!\n Do you want Invite me? [Click Here](https://discord.com/api/oauth2/authorize?client_id=636484020301201418&permissions=268435504&scope=bot) to Invite me!\nThanks for supporting me.** ❤️")
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