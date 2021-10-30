const undici = require('undici');
const Discord = require('discord.js');


module.exports = {
	help: {
		name: 'smug',
		aliases: [],
		description: 'Yes, Smug.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {
		const { url } = await undici.fetch(
			'https://nekos.life/api/v2/img/smug',
		).then((res) => res.json());

		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setColor(config.embedColor)
			.setImage(url)
			.setDescription(`${message.member} smugs.`);

		message.reply({ embeds: [embed] });
	},
};
