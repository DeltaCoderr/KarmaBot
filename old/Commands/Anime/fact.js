<<<<<<< Updated upstream:Commands/Anime/fact.js
const undici = require('undici');
const Discord = require('discord.js');


module.exports = {
	help: {
		name: 'fact',
		aliases: [],
		description: 'Gets random Anime Facts.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {
		const { fact } = await undici.fetch('https://nekos.life/api/v2/fact').then((res) =>res.json());
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle('Did you know?')
			.setThumbnail(
				'https://media.discordapp.net/attachments/711250719675645962/721640740136026202/uhjhyj.gif',
			)
			.setDescription(fact)
			.setFooter(
				'© Karma',
				'https://i.imgur.com/U34MPtp.png',
			)
			.setTimestamp();

		message.reply({ embeds: [embed] });
	},
=======
const { MessageEmbed } = require("discord.js");
const fetch  = require("node-fetch");

module.exports = {
    help: {
        name: 'fact',
        aliases: ['fact'],
        description: 'Gets random Anime Facts.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message) => {

        let url = "https://airi.kyoyo.me/api/fact";

        fetch(url, {
            headers: {
                'Auth': config.FACT_API
            }
        }).then(res => res.json())
             .then(r => {
                    const embed = new MessageEmbed()
                .setColor(config.embedcolor)
                .setTitle("Did you know?")
                .setThumbnail(
                    "https://media.discordapp.net/attachments/711250719675645962/721640740136026202/uhjhyj.gif"
                )
                .setDescription(r.fact)
                .setFooter(`© Karma `, "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")
                .setTimestamp()

            message.channel.send(embed);
        });
    },
>>>>>>> Stashed changes:old/Commands/Anime/fact.js
};
