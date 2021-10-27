const undici = require('undici');
const Discord = require('discord.js');
const config = require('../../Configs/config');
const emotes = require('../../Configs/emotes');

module.exports = {
	help: {
		name: 'wiki',
		aliases: ['wikipedia'],
		description: 'Shows Information about query from Wikipedia',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		if (!args[0]) {
			return message.reply(`${emotes.error} Boi, Provide something.`);
		}

		const body = await undici
			.fetch(
				`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
					args.join(' '),
				)}`,
			)
			.then((res) => res.json());

		if (!body || (body.title && body.title === 'Not found.')) {
			const embed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setTitle('❌ Error Page Not Found');
			return message.reply({ embeds: [embed] });
		}

		const embed = new Discord.MessageEmbed()
			.setTitle(`🌐 ${body.title} `)
			.addField(
				'More Info: ',
				`**[Click Here!](${body.content_urls.desktop.page})**`,
				true,
			)
			.setDescription(`**According to wikipedia:** ${body.extract}`)
			.setColor(config.embedColor)
			.setTimestamp()
			.setFooter('© Karma', 'https://i.imgur.com/U34MPtp.png');

		if (body.thumbnail) {
			embed.setThumbnail(body.thumbnail.source);
		}
		message.reply({ embeds: [embed] });
	},
};
