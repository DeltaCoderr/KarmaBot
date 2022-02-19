<<<<<<< Updated upstream:Commands/Anime/tickle.js
const undici = require('undici');
const Discord = require('discord.js');

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
=======
const { MessageEmbed } = require("discord.js");
const nekos = require("nekos.life");
const { sfw: { tickle }, } = new nekos();


module.exports = {
    help: {
        name: 'tickle',
        aliases: ['tickle'],
        description: 'TICKLE THEM RN.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message) => {
        const { url } = await tickle().catch(() => { });

        if (!url) return message.channel.send(`Could not connect to nekos.life`);

        const embed = new MessageEmbed();

        if (
            message.mentions.members.size &&
            message.mentions.members.first().id === client.user.id
        ) {
            return message.channel.send(
                `B~Baka ${message.member}! Stop that~ it tickles!`
            );
        } else if (
            message.mentions.members.size &&
            message.mentions.members.first().id === message.author.id
        ) {
            return message.channel.send(`Wai~ Seriously!?`);
        } else if (message.mentions.members.size) {
            return message.channel.send(
                embed
                    .setColor(config.embedcolor)
                    .setDescription(`${message.member} started tickling ${message.mentions.members.first()}!`)
                    .setImage(url)
            );
        } else {
            return message.channel.send(
                embed.setColor(config.embedcolor).setImage(url)
            );
        }
    }
}
>>>>>>> Stashed changes:old/Commands/Anime/tickle.js
