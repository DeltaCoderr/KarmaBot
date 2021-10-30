const Discord = require('discord.js');

const Functions = require('../../Base/Functions');

module.exports = {
	help: {
		name: 'iq',
		aliases: [],
		description: 'Test your iq :brain: ',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		const victim = client.users.cache.get(args[0])
			? client.users.cache.get(args[0])
			: Functions.getUser(message, args, true);

		if (!victim) {
			return message.reply('Could not find the user.');
		}

		const iq = Math.floor(Math.random() * 226);
		const embed = new Discord.MessageEmbed()
			.setTitle(':brain: IQ Test:')
			.setDescription(`:bulb:   ${victim}'s  **IQ is**   \`${iq}\`  `)
			.setColor('FF0000')
			.setThumbnail('https://media.giphy.com/media/l44QzsOLXxcrigdgI/giphy.gif')
			.setTimestamp()
			.setFooter('© Karma', 'https://i.imgur.com/U34MPtp.png')
			.setColor(config.embedColor);
		message.reply({ embeds: [embed] });
	},
};
