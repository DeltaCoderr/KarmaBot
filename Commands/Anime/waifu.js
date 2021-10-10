const undici = require('undici');
const Discord = require('discord.js');
const config = require('../../Configs/config');

module.exports = {
	help: {
		name: 'waifu',
		aliases: [],
		description: 'Drops random waifu pictures.',
		category: __dirname.split('Commands/')[1],
	},
	run: async (client, message) => {
		const { url } = await undici.fetch(
			'https://nekos.life/api/v2/img/waifu',
		).then((res) => res.json());

		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle('Here\'s your Waifu')
			.setImage(url)
			.setTimestamp()
			.setFooter(
				'© Karma',
				'https://i.imgur.com/U34MPtp.png',
			);
		message.reply({ embeds: [embed] });
	},
};
