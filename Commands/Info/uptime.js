const Discord = require('discord.js');

const Functions = require('../../Base/Functions');

module.exports = {
	help: {
		name: 'uptime',
		aliases: [],
		description: 'Shows the Bot\'s uptime',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {
		const uptime = Functions.convertTime(client.uptime);

		const botembed = new Discord.MessageEmbed()
			.setTitle('Karma Bot Uptime')
			.setColor(config.embedColor)
			.setDescription(
				`<a:pyramid:757488922354909184> **Karma has been active for** \`${uptime}\`. 
				\n <a:pyramid:757488922354909184> **The latency is currently** \`${client.ws.ping} ms\`.`,
			)
			.setTimestamp()
			.setFooter('© Karma', 'https://i.imgur.com/U34MPtp.png')
			.setThumbnail(client.user.avatarURL());
		message.reply({ embeds: [botembed] });
	},
};
