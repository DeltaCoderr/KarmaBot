const undici = require('undici');
const Discord = require('discord.js');
const config = require('../../Configs/config');

module.exports = {
	help: {
		name: 'karma',
		aliases: [],
		description: 'Drops random Karma Pictures.',
		category: __dirname.split('Commands/')[1],
	},
	run: async (client, message) => {

		const { url } = await undici.fetch('https://api.deltaa.me/karma').then(res => res.json());

		const gifembed = new Discord.MessageEmbed()
			.setTitle(`Random Karma ${url.endsWith('.png') ? 'Picture' : `${url.endsWith('.gif') ? 'GIF' : 'Picture'}`}`)
			.setColor(config.embedColor)
			.setDescription(`[Full View](${url})`)
			.setFooter('© Karma', message.author.avatarURL())
			.setImage(url);
		message.reply({ embeds: [gifembed] });
	},
};
