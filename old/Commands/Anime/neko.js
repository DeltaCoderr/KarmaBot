<<<<<<< Updated upstream:Commands/Anime/neko.js
const undici = require('undici');
const Discord = require('discord.js');


module.exports = {
	help: {
		name: 'neko',
		aliases: [],
		description: 'Drops random Neko Pictures.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {
		const { url } = await undici.fetch('https://shiro.gg/api/images/neko').then((res) => res.json());

		const embed = new Discord.MessageEmbed()
			.setTitle('Here\'s your Neko')
			.setImage(url)
			.setColor(config.embedColor)
			.setTimestamp()
			.setFooter(
				'© Karma',
				'https://i.imgur.com/U34MPtp.png',
			)
			.setURL(url);
		message.reply({ embeds: [embed] });
	},
};
=======
const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js');

module.exports = {
    help: {
        name: 'neko',
        aliases: ['neko'],
        description: 'Drops random Neko Pictures.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message) => {

        fetch('https://shiro.gg/api/images/neko')
        .then(res => res.json())
        .then(response => {
                const embed = new MessageEmbed()
                    .setTitle("Here's your Neko")
                    .setImage(response.url)
                    .setColor(config.embedcolor)
                    .setTimestamp()
                    .setFooter(`© Karma `, "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")
                    .setURL(response.url);
                message.channel.send(embed);
            });
    },
};
>>>>>>> Stashed changes:old/Commands/Anime/neko.js
