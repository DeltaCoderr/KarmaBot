const undici = require('undici');
const Discord = require('discord.js');


module.exports = {
	help: {
		name: 'hentai',
		aliases: [],
		description: 'Shows Hentai image',
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
			'https://shiro.gg/api/images/nsfw/hentai',
		).then((res) => res.json());
		const embed = new Discord.MessageEmbed()
			.setTitle(':smirk: Hentai')
			.setImage(url)
			.setColor(config.embedColor)
			.setFooter('Tags: Hentai')
			.setURL(url);
		message.reply({ embeds: [embed] });
	},
};
