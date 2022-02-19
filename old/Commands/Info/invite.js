<<<<<<< Updated upstream:Commands/Info/invite.js
const Discord = require('discord.js');


module.exports = {
	help: {
		name: 'invite',
		aliases: ['inv'],
		description: 'Link for Bot\'s Invite',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {
		const embed = new Discord.MessageEmbed()
			.setThumbnail(client.user.avatarURL())
			.setDescription(
				'**Karma Bot** \n\n**👋 Hey!\n Do you want to invite me? [Click here](https://discord.com/api/oauth2/authorize?client_id=636484020301201418&permissions=-1&scope=bot) to Invite me!\nThanks for supporting me.** ❤️',
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
        name: 'invite',
        aliases: ['inv'],
        description: 'Link for Bot\'s Invite',
        category: __dirname.split("Commands\\")[1],
    },
    run: async (client, message) => {

        const embed = new MessageEmbed()
            .setThumbnail(client.user.avatarURL())
            .setDescription("**Karma Bot Project** \n\n**👋 Hey!\n Do you want Invite me? [Click Here](https://discord.com/api/oauth2/authorize?client_id=636484020301201418&permissions=268435504&scope=bot) to Invite me!\nThanks for supporting me.** ❤️")
            .addField("Support Link: ", `**[Click Here!](https://discord.gg/NtyaM9d)**`, true)
            .addField("Vote Link:", `**[Click Here!](https://top.gg/bot/636484020301201418/vote)**`, true)
            .setTimestamp()
            .setFooter("© Karma", "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")
            .setColor(config.embedcolor);
        message.channel.send(embed)
    }
}
>>>>>>> Stashed changes:old/Commands/Info/invite.js
