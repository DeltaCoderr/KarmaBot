const undici = require('undici');
const Discord = require('discord.js');
const config = require('../../Configs/config');
const Functions = require('../../Base/Functions');

module.exports = {
	help: {
		name: 'slap',
		aliases: [],
		description: 'Slap someone go go!.',
		category: __dirname.split('Commands/')[1],
	},
	run: async (client, message, args) => {
		const victim = client.users.cache.get(args[0])
			? client.users.cache.get(args[0])
			: Functions.getUser(message, args);

		if(!victim) {
			return message.reply('Could not find the user.');
		}

		const { url } = await undici.fetch(
			'https://nekos.life/api/v2/img/slap',
		).then((res) => res.json());

		const embed = new Discord.MessageEmbed().setColor(config.embedColor);

		if (victim && victim.id === client.user.id) {
			const msg = [
				'Ouch! How dare you slap me?',
				'Stop that!',
				'It hurts! ;-;',
			][Math.floor(Math.random() * 2)];
			return message.reply(msg);
		} else if (victim && victim.id === message.author.id) {
			return message.reply('Wai~ Seriously!?');
		} else if (victim) {
			embed.setImage(url);
			embed.setDescription(`${message.member} slapped ${victim}!`);
			return message.reply({ embeds: [embed] });
		} else {
			return message.reply('Are you practicing to slap or smth?');
		}
	},
};
