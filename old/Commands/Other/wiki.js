<<<<<<< Updated upstream:Commands/Other/wiki.js
const undici = require('undici');
const Discord = require('discord.js');



module.exports = {
	help: {
		name: 'wiki',
		aliases: ['wikipedia'],
		description: 'Shows Information about query from Wikipedia',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		if (!args[0]) {
			return message.reply(`${emotes.error} Boi, Provide something.`);
		}

		const body = await undici
			.fetch(
				`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
					args.join(' '),
				)}`,
			)
			.then((res) => res.json());

		if (!body || (body.title && body.title === 'Not found.')) {
			const embed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setTitle('❌ Error Page Not Found');
			return message.reply({ embeds: [embed] });
		}

		const embed = new Discord.MessageEmbed()
			.setTitle(`🌐 ${body.title} `)
			.addField(
				'More Info: ',
				`**[Click Here!](${body.content_urls.desktop.page})**`,
				true,
			)
			.setDescription(`**According to wikipedia:** ${body.extract}`)
			.setColor(config.embedColor)
			.setTimestamp()
			.setFooter('© Karma', 'https://i.imgur.com/U34MPtp.png');

		if (body.thumbnail) {
			embed.setThumbnail(body.thumbnail.source);
		}
		message.reply({ embeds: [embed] });
	},
};
=======
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    help: {
        name: 'wiki',
        aliases: ['wiki'],
        description: 'Shows Information about query from Wikipedia',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

            const body = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(args.join(" "))}`,    ).then(res => res.json().catch(() => { }));

            if (!body) return message.channel.sendmessage.channel.send({
                embed: {
                    color: config.embedcolor,
                    title: "❌ Error Page Not Found."
                }
            })
            if (body.title && body.title === "Not found.") return message.channel.send({
                embed: {
                    color: config.embedcolor,
                    title: "❌ Error Page Not Found."
                }
            });

            const embed = new MessageEmbed()
                .setTitle(`🌐 ${body.title} `)
                .addField("More Info: ", `**[Click Here!](${body.content_urls.desktop.page})**`, true)
                .setDescription(`** ${body.extract}**`)
                .setColor(config.embedcolor)
                .setTimestamp()
                .setFooter(`© Karma `, "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")

            if (body.thumbnail) embed.setThumbnail(body.thumbnail.source);
            message.channel.send(embed);
        }
    }
>>>>>>> Stashed changes:old/Commands/Other/wiki.js
