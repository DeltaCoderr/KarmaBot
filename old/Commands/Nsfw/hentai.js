<<<<<<< Updated upstream:Commands/Nsfw/hentai.js
const undici = require('undici');
const Discord = require('discord.js');


module.exports = {
	help: {
		name: 'hentai',
		aliases: [],
		description: 'Shows Hentai image',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {
		if (!message.channel.nsfw) {
			const embed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setDescription('This command can only be used in a NSFW channel.');
			return message.reply({ embeds: [embed] });
		}

		const { url } = await undici.fetch(
			'https://shiro.gg/api/images/nsfw/hentai',
		).then((res) => res.json());
		const embed = new Discord.MessageEmbed()
			.setTitle(':smirk: Hentai')
			.setImage(url)
			.setColor(config.embedColor)
			.setFooter('Tags: Hentai')
			.setURL(url);
		message.reply({ embeds: [embed] });
	},
};
=======
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    help: {
        name: 'hentai',
        aliases: ['hentai'],
        description: 'Shows Hentai Pictures',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message) => {

        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send({
                embed: {
                    color: config.embedcolor,
                    description: "You can use only this command in an NSFW Channel!"
                }
            });
        };

        await fetch("https://shiro.gg/api/images/nsfw/hentai")
            .then(res => res.json())
            .then(body => {
                const embed = new MessageEmbed()
                    .setTitle(":smirk: Hentai")
                    .setImage(body.url)
                    .setColor(config.embedcolor)
                    .setFooter(`Tags: Hentai`)
                    .setURL(body.url);
                message.channel.send(embed);
            });
    },
};
>>>>>>> Stashed changes:old/Commands/Nsfw/hentai.js
