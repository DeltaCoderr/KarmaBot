const undici = require('undici');
const Discord = require('discord.js');
const config = require('../../Configs/config');
const Functions = require('../../Base/Functions');

module.exports = {
	help: {
		name: 'hug',
		aliases: [],
		description: 'Get a gif for Hugging someone :eyes:.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		const victim = client.users.cache.get(args[0])
			? client.users.cache.get(args[0])
			: Functions.getUser(message, args);

		if (!victim) {
			return message.reply('Could not find the user.');
		}

		const { url } = await undici.fetch(
			'https://nekos.life/api/v2/img/hug',
		).then((res) => res.json());

		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle('Here\'s your hug, 🤗')
			.setImage(url)
			.setTimestamp()
			.setFooter(
				'© Karma',
				'https://i.imgur.com/U34MPtp.png',
			);
		if (victim && victim.id === message.author.id) {
			return message.reply('Wai~ Seriously!?');
		} else if (victim) {
			embed.setDescription(`${victim} is hugged by ${message.author}`);
			return message.reply({ embeds: [embed] });
		} else {
			return message.reply('Whom are you hugging?');
		}
	},
};
