<<<<<<< Updated upstream:Commands/Nsfw/bondage.js
const undici = require('undici');
const Discord = require('discord.js');


module.exports = {
	help: {
		name: 'bondage',
		aliases: [],
		description: 'Shows Bondage image',
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
			'https://shiro.gg/api/images/nsfw/bondage',
		).then((res) => res.json());
		const embed = new Discord.MessageEmbed()
			.setTitle(':smirk: Bondage')
			.setImage(url)
			.setColor(config.embedColor)
			.setFooter('Tags: Bondage')
			.setURL(url);
		message.reply({ embeds: [embed] });
	},
=======
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    help: {
        name: 'bondage',
        aliases: ['bondage'],
        description: 'Shows Bondage Pictures',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message) => {
        if (!message.channel.nsfw) return message.channel.send({
            embed: {
                color: config.embedcolor,
                description: "You can only use this command in an NSFW Channel!"
            }
        })

        await fetch("https://shiro.gg/api/images/nsfw/bondage")
            .then(res => res.json())
            .then(body => {
                const embed = new MessageEmbed()
                    .setTitle(":smirk: Bondage")
                    .setImage(body.url)
                    .setColor(config.embedcolor)
                    .setFooter(`Tags: Bondage`)
                    .setURL(body.url);
                message.channel.send(embed);
            });
    },
>>>>>>> Stashed changes:old/Commands/Nsfw/bondage.js
};
