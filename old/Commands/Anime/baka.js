<<<<<<< Updated upstream:Commands/Anime/baka.js
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
=======
const nekos = require('nekos.life');
const { sfw: { baka }, } = new nekos()
const { MessageEmbed } = require('discord.js');

module.exports = {
    help: {
        name: 'baka',
        aliases: ['baka'],
        description: 'Get a reaction for baka.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message) => {

        const { url } = await baka().catch(() => { });

        if (!url) return message.channel.send(`Could not connect to nekos.life`);

        const embed = new MessageEmbed();
        if (
            message.mentions.members.size &&
            message.mentions.members.first().id === client.user.id
        ) {
            return message.channel.send(`Chigau! Anata wa baka desu!`);
        } else if (
            message.mentions.members.size &&
            message.mentions.members.first().id === message.author.id
        ) {
            return message.channel.send(`Seriously?`);
        } else if (message.mentions.members.size) {
            return message.channel.send(
                embed
                    .setColor(config.embedcolor)
                    .setImage(url)
                    .setDescription(`${message.mentions.members.first()} B~baka!`)
            );
        } else
            return message.channel.send(
                embed.setColor(config.embedcolor).setImage(url)
            );

    },
};
>>>>>>> Stashed changes:old/Commands/Anime/baka.js
