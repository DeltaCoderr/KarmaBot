const undici = require('undici');
const Discord = require('discord.js');
const config = require('../../Configs/config');
const Functions = require('../../Base/Functions');

module.exports = {
	help: {
		name: 'kiss',
		aliases: [],
		description: 'Kiss :flushed:',
		category: __dirname.split('Commands/')[1],
	},
	run: async (client, message, args) => {
		const embed = new Discord.MessageEmbed().setColor(config.embedColor);

		const victim = client.users.cache.get(args[0])
			? client.users.cache.get(args[0])
			: Functions.getUser(message, args);

		if(!victim) {
			return message.reply('Could not find the user.');
		}

		if (victim && victim.id === client.user.id) {
			const { url } = await undici.fetch(
				'https://nekos.life/api/v2/img/slap',
			).then((res) => res.json());

			embed.setImage(url);
			embed.setDescription(`${message.member}, How dare you!`);
			embed.setFooter(
				`${message.member.displayName}, you really do deserve a slap.`,
			);
			return message.reply({ embeds: [embed] });
		} else if (victim && victim.id === message.author.id) {
			return message.reply('S~seriously?!');
		} else if (victim) {
			const { url } = await undici.fetch(
				'https://nekos.life/api/v2/img/kiss',
			).then((res) => res.json());
			embed.setImage(url);
			embed.setDescription(`${message.member} kisses ${victim}!`);
			return message.reply({ embeds: [embed] });
		} else {
			return message.reply('Whom are you kissing?');
		}
	},
};