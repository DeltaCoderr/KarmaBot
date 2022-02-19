<<<<<<< Updated upstream:Commands/Info/repo.js
const Discord = require('discord.js');



module.exports = {
	help: {
		name: 'repo',
		aliases: ['repo'],
		description: 'Link to the Github Repository',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {
		const embed = new Discord.MessageEmbed()
			.setThumbnail(client.user.avatarURL())
			.setDescription(
				`**Karma Bot**\n
				<:GitHub:803579137759379497> **Karma Bot is open source! [Click Here](https://github.com/DeltaCoderr/KarmaBot) to check the GitHub!
				${emotes.flyinghearts} Contributions are welcomed, Thanks for supporting me.** ❤️`,
			)
			.addField(
				'Invite Link: ',
				'**[Click Here!](https://discord.com/api/oauth2/authorize?client_id=636484020301201418&permissions=32&scope=bot)**',
				true,
			)
			.addField(
				'Support Link: ',
				'**[Click Here!](https://discord.gg/NtyaM9d)**',
				true,
			)
			.addField(
				'Vote Link:',
				'**[Click Here!](https://top.gg/bot/636484020301201418/vote)**',
				true,
			)
			.setTimestamp()
			.setFooter('© Karma', 'https://i.imgur.com/U34MPtp.png')
			.setColor(config.embedColor);
		message.reply({ embeds: [embed] });
	},
};
=======
const { MessageEmbed } = require('discord.js');

module.exports = {
    help: {
        name: 'repo',
        aliases: ['repo'],
        description: 'Link to the Github Repository',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message) => {

        const embed = new MessageEmbed()
            .setThumbnail(client.user.avatarURL())
            .setDescription("**Karma Bot Project** \n\n<:GitHub:803579137759379497> **Karma Bot is Open Source! [Click Here](https://github.com/DeltaCoderr/KarmaBot) to check the Github!\n" + emotes.flyinghearts + "Contributions are Welcomed, Thanks for supporting me.** ❤️")
            .addField("Invite Link: ", `**[Click Here!](https://discord.com/api/oauth2/authorize?client_id=636484020301201418&permissions=32&scope=bot)**`, true)
            .addField("Support Link: ", `**[Click Here!](https://discord.gg/NtyaM9d)**`, true)
            .addField("Vote Link:", `**[Click Here!](https://top.gg/bot/636484020301201418/vote)**`, true)
            .setTimestamp()
            .setFooter("© Karma", "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")
            .setColor(config.embedcolor);
        message.channel.send(embed) 
    }
}
>>>>>>> Stashed changes:old/Commands/Info/repo.js
