<<<<<<< Updated upstream:Commands/Anime/hug.js
const undici = require('undici');
const Discord = require('discord.js');

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
=======
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    help: {
        name: 'hug',
        aliases: ['hug'],
        description: 'Get a gif for Hugging someone :eyes:.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        let victim = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first() : message.author) || message.author;
        await fetch("https://nekos.life/api/v2/img/hug")
            .then(res => res.json())
            .then(body => {
                const embed = new MessageEmbed()
                    .setColor(config.embedcolor)
                    .setTitle("Here's your Hug, 🤗")
                    .setDescription(`${victim} is hugged by ${message.author}`)
                    .setImage(body.url)
                    .setTimestamp()
                    .setFooter(`© Karma `, "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")

                message.channel.send(embed);
            });
    },
};
>>>>>>> Stashed changes:old/Commands/Anime/hug.js
