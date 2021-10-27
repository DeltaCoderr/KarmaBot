const undici = require('undici');
const Discord = require('discord.js');
const config = require('../../Configs/config');
const Functions = require('../../Base/Functions');

module.exports = {
	help: {
		name: 'eject',
		aliases: ['amonguseject'],
		description: 'Yeet a user',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		const victim = client.users.cache.get(args[0])
			? client.users.cache.get(args[0])
			: Functions.getUser(message, args, true);

		if(!victim) {
			return message.reply('Could not find the user.');
		}

		const username = victim.user
			? victim.user.displayAvatarURL({ dynamic: true, size: 1024 })
			: victim.displayAvatarURL({ dynamic: true, size: 1024 });

		if (!victim) return message.reply('Could not find user');

		const imposter = [true, false][Math.floor(Math.random() * 2)];
		const crewmate = [
			'black',
			'blue',
			'brown',
			'cyan',
			'darkgreen',
			'lime',
			'orange',
			'pink',
			'purple',
			'red',
			'white',
			'yellow',
		][Math.floor(Math.random() * 12)];

		const data = await undici.fetch(
			`https://vacefron.nl/api/ejected?name=${username}&impostor=${imposter}&crewmate=${crewmate}`,
		);

		const embed = new Discord.MessageEmbed()
			.setAuthor(
				message.author.tag,
				message.author.displayAvatarURL({ dynamic: true }),
			)
			.setTitle(
				`${message.author.username} decided to eject ${username}`,
			)
			.setColor(config.embedColor)
			.setImage(`${data.url}`);

		message.reply({ embeds: [embed] });
	},
};
