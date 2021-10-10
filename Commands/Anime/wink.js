const undici = require('undici');
const Discord = require('discord.js');
const config = require('../../Configs/config');

module.exports = {
	help: {
		name: 'wink',
		aliases: [],
		description: 'Winky Wink.',
		category: __dirname.split('Commands/')[1],
	},
	run: async (client, message) => {
		const { link } = await undici.fetch(
			'https://some-random-api.ml/animu/wink',
		).then((res) => res.json());
		const embed = new Discord.MessageEmbed()
			.setTitle('Here\'s your Wink 😉')
			.setImage(link)
			.setColor(config.embedColor)
			.setTimestamp()
			.setFooter(
				'© Karma',
				'https://i.imgur.com/U34MPtp.png',
			)
			.setURL(link);
		message.reply({ embeds: [embed] });
	},
};
