const Discord = require('discord.js');
const config = require('../../Configs/config');
const Functions = require('../../Base/Functions');

module.exports = {
	help: {
		name: 'binary',
		aliases: [],
		description: 'Shows your text in Binary Format.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		const type = args[0];
		if (type !== 'encode' && type !== 'decode') {
			return message.reply(
				'Please specify a valid type. `encode` or `decode`.',
			);
		}

		const text = args.slice(1).join(' ');
		if (!text) {
			return message.reply('Please specify a text to convert.');
		}

		const embed = new Discord.MessageEmbed()
			.setTimestamp()
			.setColor(config.embedColor)
			.setThumbnail('https://i.imgur.com/IMKDKx3.png')
			.setFooter('© Karma', 'https://i.imgur.com/U34MPtp.png');
		if (type === 'encode') {
			const data = Functions.binaryConvert(text, true);
			embed.setTitle('Text to Binary');
			embed.setDescription('**Binary Code:** `' + data + '`');
		} else if (type === 'decode') {
			const data = Functions.binaryConvert(text);
			embed.setTitle('Binary to Text');
			embed.setDescription('**Text:** `' + data + '`');
		}

		message.reply({ embeds: [embed] });
	},
};
