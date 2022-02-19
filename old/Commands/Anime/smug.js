<<<<<<< Updated upstream:Commands/Anime/smug.js
const undici = require('undici');
const Discord = require('discord.js');


module.exports = {
	help: {
		name: 'smug',
		aliases: [],
		description: 'Yes, Smug.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {
		const { url } = await undici.fetch(
			'https://nekos.life/api/v2/img/smug',
		).then((res) => res.json());

		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setColor(config.embedColor)
			.setImage(url)
			.setDescription(`${message.member} smugs.`);

		message.reply({ embeds: [embed] });
	},
};
=======
const { MessageEmbed } = require("discord.js");
const nekos = require("nekos.life");
const { sfw: { smug }, } = new nekos();

module.exports = {
    help: {
        name: 'smug',
        aliases: ['smug'],
        description: 'Yes, Smug.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message) => {

        const { url } = await smug().catch(() => { });

        if (!url) return message.channel.send(`Could not connect to nekos.life`);

        message.channel.send(
            new MessageEmbed()
                .setColor(config.embedcolor)
                .setImage(url)
                .setDescription(`${message.member} smugs.`)
        );
    }
}
>>>>>>> Stashed changes:old/Commands/Anime/smug.js
