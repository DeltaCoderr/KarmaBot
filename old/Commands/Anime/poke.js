<<<<<<< Updated upstream:Commands/Anime/poke.js
const undici = require('undici');
const Discord = require('discord.js');

const Functions = require('../../Base/Functions');

module.exports = {
	help: {
		name: 'poke',
		aliases: [],
		description: 'Poke someone huehue',
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
			'https://nekos.life/api/v2/img/poke',
		).then((res) => res.json());

		const embed = new Discord.MessageEmbed().setColor(config.embedColor);

		if (victim && victim.id === client.user.id) {
			return message.reply('I\'m already here! You need something?');
		} else if (victim && victim.id === message.author.id) {
			return message.reply('S~seriously?!');
		} else if (victim) {
			embed.setImage(url);
			embed.setDescription(`${message.member} pokes ${victim}!`);
			return message.reply({ embeds: [embed] });
		} else {
			return message.reply('I can\'t poke your imaginary friend!');
		}
	},
};
=======
const { MessageEmbed } = require('discord.js');
const nekos = require('nekos.life');
const { sfw: { poke }, } = new nekos()

module.exports = {
    help: {
        name: 'poke',
        aliases: ['poke'],
        description: 'Poke someone huehue',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message) => {

        const { url } = await poke().catch(() => { });

        if (!url) return message.channel.send(`Could not connect to nekos.life`);

        const embed = new MessageEmbed();

        if (
            message.mentions.members.size &&
            message.mentions.members.first().id === client.user.id
        ) {
            return message.channel.send(
                `${message.member}, I'm already here! You need something?`
            );
        } else if (
            message.mentions.members.size &&
            message.mentions.members.first().id === message.author.id
        ) {
            return message.channel.send(`What?`);
        } else if (message.mentions.members.size) {
            return message.channel.send(
                embed
                    .setColor(config.embedcolor)
                    .setDescription(`${message.member} pokes ${message.mentions.members.first()}!`)
                    .setImage(url)
            );
        } else {
            return message.channel.send(
                `${message.member}, I can't poke your imaginary friend! :(`
            );
        }
    }
}
>>>>>>> Stashed changes:old/Commands/Anime/poke.js
