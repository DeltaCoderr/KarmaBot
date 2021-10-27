const undici = require('undici');
const Discord = require('discord.js');
const config = require('../../Configs/config');
const Functions = require('../../Base/Functions');

module.exports = {
	help: {
		name: 'tickle',
		aliases: [],
		description: 'TICKLE THEM RN.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		const victim = client.users.cache.get(args[0])
			? client.users.cache.get(args[0])
			: Functions.getUser(message, args);

		if(!victim) {
			return message.reply('Could not find the user.');
		}

		const { url } = await undici.fetch(
			'https://nekos.life/api/v2/img/tickle',
		).then((res) => res.json());

		const embed = new Discord.MessageEmbed().setColor(config.embedColor);
		if (victim && victim.id === client.user.id) {
			return message.reply('B~Baka! Stop that~ it tickles!');
		} else if (victim && victim.id === message.author.id) {
			return message.reply('Wai~ Seriously!?');
		} else if (victim) {
			embed.setImage(url);
			embed.setDescription(`${message.member} tickles ${victim}!`);
			return message.reply({ embeds: [embed] });
		} else {
			embed.setImage(url);
			return message.reply({ embeds: [embed] });
		}
	},
};
