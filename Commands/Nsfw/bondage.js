const undici = require('undici');
const Discord = require('discord.js');
const config = require('../../Configs/config');

module.exports = {
	help: {
		name: 'bondage',
		aliases: [],
		description: 'Shows Bondage image',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {
		if (!message.channel.nsfw) {
			const embed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setDescription('This command can only be used in a NSFW channel.');
			return message.reply({ embeds: [embed] });
		}

		const { url } = await undici.fetch(
			'https://shiro.gg/api/images/nsfw/bondage',
		).then((res) => res.json());
		const embed = new Discord.MessageEmbed()
			.setTitle(':smirk: Bondage')
			.setImage(url)
			.setColor(config.embedColor)
			.setFooter('Tags: Bondage')
			.setURL(url);
		message.reply({ embeds: [embed] });
	},
};
