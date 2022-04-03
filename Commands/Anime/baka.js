const undici = require('undici');
const Discord = require('discord.js');

const Functions = require('../../Base/Functions');

module.exports = {
	help: {
		name: 'baka',
		aliases: [],
		description: 'Get a reaction for baka.',
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
			'https://nekos.life/api/v2/img/baka',
		).then((res) => res.json());

		const embed = new Discord.MessageEmbed().setColor(config.embedColor);

		if (victim && victim.id === client.user.id) {
			return message.reply('Chigau! Anata wa baka desu!');
		} else if (victim && victim.id === message.author.id) {
			return message.reply('Seriously?');
		} else if (victim) {
			embed.setImage(url);
			embed.setDescription(`${victim} B~baka!`);
			return message.reply({ embeds: [embed] });
		} else {
			embed.setImage(url);
			return message.reply({ embeds: [embed] });
		}
	},
};