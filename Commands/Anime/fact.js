const undici = require('undici');
const Discord = require('discord.js');
const config = require('../../Configs/config');

module.exports = {
	help: {
		name: 'fact',
		aliases: [],
		description: 'Gets random Anime Facts.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {
		const { fact } = await undici.fetch('https://nekos.life/api/v2/fact').then((res) =>res.json());
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle('Did you know?')
			.setThumbnail(
				'https://media.discordapp.net/attachments/711250719675645962/721640740136026202/uhjhyj.gif',
			)
			.setDescription(fact)
			.setFooter(
				'© Karma',
				'https://i.imgur.com/U34MPtp.png',
			)
			.setTimestamp();

		message.reply({ embeds: [embed] });
	},
};
