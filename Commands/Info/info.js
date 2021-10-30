const Discord = require('discord.js');


module.exports = {
	help: {
		name: 'info',
		aliases: ['botinfo', 'stats'],
		description: 'Shows the stats of the Bot',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {
		const mapping = {
			' ': '  ',
			'0': ':zero:',
			'1': ':one:',
			'2': ':two:',
			'3': ':three:',
			'4': ':four:',
			'5': ':five:',
			'6': ':six:',
			'7': ':seven:',
			'8': ':eight:',
			'9': ':nine:',
			'!': '!',
			'?': '?',
			'#': '#',
			'*': '*',
		};

		'abcdefghijklmnopqrstuvwxyz'.split('').forEach((c) => {
			mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
		});
		let memberCount = 0;
		client.guilds.cache.forEach((guild) => {
			memberCount += guild.memberCount;
		});
		const users = String(memberCount)
			.split('')
			.map((guild) => mapping[guild] || guild)
			.join('');
		const guilds = String(client.guilds.cache.size)
			.split('')
			.map((c) => mapping[c] || c)
			.join('');
		const channels = String(client.channels.cache.size)
			.split('')
			.map((c) => mapping[c] || c)
			.join('');

		const embed = new Discord.MessageEmbed()
			.setImage('https://i.imgur.com/8u3bG6H.png')
			.setThumbnail(client.user.avatarURL())
			.setDescription(
				'**Karma Bot**' +
					'\n\n <a:pyramid:757488922354909184> **Number of servers:** ' +
					guilds +
					'\n <a:pyramid:757488922354909184> **Number of channels: ** ' +
					channels +
					'\n <a:pyramid:757488922354909184> **Number of users: ** ' +
					users +
					'\n\n<:discordbotdev:757489652214267904> **Developers:** \n <@552814506070507531>',
			)
			.addField(
				'Invite Link:',
				'**[Click Here!](https://discord.com/api/oauth2/authorize?client_id=636484020301201418&permissions=32&scope=bot)**',
				true,
			)
			.addField(
				'Support Link:',
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
		message.react('755471130315194399');
		message.reply({ embeds: [embed] });
	},
};
