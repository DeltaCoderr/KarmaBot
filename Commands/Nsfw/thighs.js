const undici = require('undici');
const Discord = require('discord.js');
const config = require('../../Configs/config');

module.exports = {
	help: {
		name: 'thighs',
		aliases: [],
		description: 'Shows Thighs image',
		category: __dirname.split('Commands/')[1],
	},
	run: async (client, message) => {
		if (!message.channel.nsfw) {
			const embed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setDescription('This command can only be used in a NSFW channel.');
			return message.reply({ embeds: [embed] });
		}

		const { url } = await undici.fetch(
			'https://shiro.gg/api/images/nsfw/thighs',
		).then((res) => res.json());
		const embed = new Discord.MessageEmbed()
			.setTitle(':smirk: Thighs')
			.setImage(url)
			.setColor(config.embedColor)
			.setFooter('Tags: Thighs')
			.setURL(url);
		message.reply({ embeds: [embed] });
	},
};
