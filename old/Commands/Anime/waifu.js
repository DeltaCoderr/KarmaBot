<<<<<<< Updated upstream:Commands/Anime/waifu.js
const undici = require('undici');
const Discord = require('discord.js');


module.exports = {
	help: {
		name: 'waifu',
		aliases: [],
		description: 'Drops random waifu pictures.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {
		const { url } = await undici.fetch(
			'https://nekos.life/api/v2/img/waifu',
		).then((res) => res.json());

		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle('Here\'s your Waifu')
			.setImage(url)
			.setTimestamp()
			.setFooter(
				'© Karma',
				'https://i.imgur.com/U34MPtp.png',
			);
		message.reply({ embeds: [embed] });
	},
};
=======
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    help: {
        name: 'waifu',
        aliases: ['waifu'],
        description: 'Drops random waifu pictures.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message) => {
        await fetch("https://nekos.life/api/v2/img/waifu")
            .then(res => res.json())
            .then(body => {
                const embed = new MessageEmbed()
                    .setColor(config.embedcolor)
                    .setTitle("Here's your Waifu")
                    .setDescription(`${message.author.toString()}`)
                    .setImage(body.url)
                    .setTimestamp()
                    .setFooter(`© Karma `, "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")

                message.channel.send(embed);

            });
    },
};
>>>>>>> Stashed changes:old/Commands/Anime/waifu.js
