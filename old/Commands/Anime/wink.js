<<<<<<< Updated upstream:Commands/Anime/wink.js
const undici = require('undici');
const Discord = require('discord.js');


module.exports = {
	help: {
		name: 'wink',
		aliases: [],
		description: 'Winky Wink.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {
		const { link } = await undici.fetch(
			'https://some-random-api.ml/animu/wink',
		).then((res) => res.json());
		const embed = new Discord.MessageEmbed()
			.setTitle('Here\'s your Wink 😉')
			.setImage(link)
			.setColor(config.embedColor)
			.setTimestamp()
			.setFooter(
				'© Karma',
				'https://i.imgur.com/U34MPtp.png',
			)
			.setURL(link);
		message.reply({ embeds: [embed] });
	},
};
=======
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    help: {
        name: 'wink',
        aliases: ['wink'],
        description: 'Winky Wink.',
        category:  __dirname.split("Commands\\")[1]
    },
    run: async(client, message) => {
        fetch('https://some-random-api.ml/animu/wink')
        .then(res => res.json())
        .then(response => {
                const embed = new MessageEmbed()
                    .setTitle("Here's your Wink 😉")
                    .setImage(response.link)
                    .setColor(config.embedcolor)
                    .setTimestamp()
                    .setFooter(`© Karma `, "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")
                    .setURL(response.url);
                message.channel.send(embed);
            });
    }
}
>>>>>>> Stashed changes:old/Commands/Anime/wink.js
