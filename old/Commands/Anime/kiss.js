<<<<<<< Updated upstream:Commands/Anime/kiss.js
const undici = require('undici');
const Discord = require('discord.js');

const Functions = require('../../Base/Functions');

module.exports = {
	help: {
		name: 'kiss',
		aliases: [],
		description: 'Kiss :flushed:',
		category: __dirname.split('Commands\\')[1],
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
=======
const nekos = require('nekos.life');
const { MessageEmbed } = require('discord.js');
const { sfw: { kiss }, } = new nekos();

module.exports = {
    help: {
        name: 'kiss',
        aliases: ['kiss'],
        description: 'Kiss :flushed: .',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message) => {

        const embed = new MessageEmbed();

        if (
            message.mentions.members.size &&
            message.mentions.members.first().id === client.user.id
        ) {
            const { url } = await slap().catch(() => { });

            if (!url) return message.channel.send(`Could not connect to nekos.life`);

            return message.channel.send(
                embed
                    .setColor(config.embedcolor)
                    .setDescription(`${message.member}, How dare you!`)
                    .setImage(url)
                    .setFooter(`${message.member.displayName}, you really do deserve a slapping.` )
            );
        } else {
            const { url } = await kiss().catch(() => { });

            if (!url) return message.channel.send(`Could not connect to nekos.life`);

            if (
                message.mentions.members.size &&
                message.mentions.members.first().id === message.author.id
            ) {
                return message.channel.send(`S~seriously?!`);
            } else if (message.mentions.members.size) {
                return message.channel.send(
                    embed
                        .setColor(config.embedcolor)
                        .setDescription( `${message.member} kisses ${message.mentions.members.first()}!`)
                        .setImage(url)
                );
            } else {
                return message.channel.send(
                    `Sorry ${message.member}, I can't seem to locate your imaginary friend.`
                );
            }
        }
    }
}
>>>>>>> Stashed changes:old/Commands/Anime/kiss.js
