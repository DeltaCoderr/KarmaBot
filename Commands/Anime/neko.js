const undici = require('undici');
const Discord = require('discord.js');
const config = require('../../Configs/config');

module.exports = {
	help: {
		name: 'neko',
		aliases: [],
		description: 'Drops random Neko Pictures.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {
		const { url } = await undici.fetch('https://shiro.gg/api/images/neko').then((res) => res.json());

		const embed = new Discord.MessageEmbed()
			.setTitle('Here\'s your Neko')
			.setImage(url)
			.setColor(config.embedColor)
			.setTimestamp()
			.setFooter(
				'© Karma',
				'https://i.imgur.com/U34MPtp.png',
			)
			.setURL(url);
		message.reply({ embeds: [embed] });
	},
};
