<<<<<<< Updated upstream:Commands/Anime/karma.js
const undici = require('undici');
const Discord = require('discord.js');


module.exports = {
	help: {
		name: 'karma',
		aliases: [],
		description: 'Drops random Karma Pictures.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {

		const { url } = await undici.fetch('https://api.deltaa.me/karma').then(res => res.json());

		const gifembed = new Discord.MessageEmbed()
			.setTitle(`Random Karma ${url.endsWith('.png') ? 'Picture' : `${url.endsWith('.gif') ? 'GIF' : 'Picture'}`}`)
			.setColor(config.embedColor)
			.setDescription(`[Full View](${url})`)
			.setFooter('© Karma', message.author.avatarURL())
			.setImage(url);
		message.reply({ embeds: [gifembed] });
	},
};
=======
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    help: {
        name: 'karma',
        aliases: ['karma'],
        description: 'Drops random Karma Pictures.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message) => {

        let res = await fetch('https://api.deltaa.me/karma')
        let data = await res.json()

        let gifembed = new MessageEmbed()
            .setTitle(`Random Karma ${data.url.endsWith('.png') ? 'Picture' : `${data.url.endsWith('.gif') ? 'GIF' : 'Picture'}`}`)
            .setColor(config.embedcolor)
            .setDescription(`[Full View](${data.url})`)
            .setFooter(`© Karma`, message.author.avatarURL())
            .setImage(data.url);
        message.channel.send(gifembed);
    }
}
>>>>>>> Stashed changes:old/Commands/Anime/karma.js
