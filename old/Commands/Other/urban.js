<<<<<<< Updated upstream:Commands/Other/urban.js
const undici = require('undici');
const Discord = require('discord.js');


const Functions = require('../../Base/Functions');

module.exports = {
	help: {
		name: 'urban',
		aliases: [],
		description: 'Shows the Urban definition',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		if (!args[0]) {
			return message.reply(`${emotes.error} Boi, Provide a Word.`);
		}

		let { list } = await undici.fetch(
			`http://api.urbandictionary.com/v0/define?term=${args.join(' ')}`,
		).then((res) => res.json());
		if (list.length === 0) {
			return message.reply(
				`${emotes.error} No results found for **${args.join(' ')}**.`,
			);
		}
		list = Functions.shuffleArray(list);
		list = list[0];

		const embed = new Discord.MessageEmbed()
			.setAuthor(
				'Urban Dictionary',
				'https://files.catbox.moe/kkkxw3.png',
				list.permalink,
			)
			.setThumbnail('https://i.imgur.com/HhgP1Hq.png')
			.setTitle(`Definition of ${list.word}`)
			.setDescription(list.definition)
			.setURL(list.permalink)
			.addField('Example(s)', list.example ? list.example : 'N/A')
			.setColor(config.embedColor)
			.setFooter(`Submitted by ${list.author}`)
			.setTimestamp();
		return message.reply({ embeds: [embed] });
	},
};
=======
const urban = require('relevant-urban');
const { MessageEmbed } = require('discord.js')
module.exports = {
    help: {
        name: 'urban',
        aliases: ['urban'],
        description: 'Shows the Urban definition',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        if (!args[0]) return message.channel.send(`${emotes.error} Boi, Provide an Word`)

        let def;

        if (args.length) {

            const defs = await urban(args.join(' ')).catch(() => { })

            if (!defs) return message.channel.send(new MessageEmbed().setColor('FF0000').setDescription(`\u200B\n\nNo match found for **${args.join(' ')}**`).setThumbnail('https://files.catbox.moe/kkkxw3.png'))

            if (defs.constructor.name === 'Array') {
                let total = Object.keys(defs).length

                if (!total) return message.channel.send(new MessageEmbed().setColor('FF0000').setDescription(`\u200B\n\nNo match found for **${args.join(' ')}**`).setThumbnail('https://files.catbox.moe/kkkxw3.png'))

                def = defs[1]

            } else if (defs.constructor.name === 'Definition') {

                def = defs

            }

            return message.channel.send(new MessageEmbed()
                .setAuthor(`Urban Dictionary`, `https://files.catbox.moe/kkkxw3.png`, `https://www.urbandictionary.com/`)
                .setThumbnail("https://cdn.discordapp.com/attachments/739360499086524476/745639669836021841/UD_2.PNG")
                .setTitle(`Definition of ${defs.word}`)
                .setURL(defs.urbanURL)
                .addField('Example(s)', defs.example ? defs.example : 'N/A')
                .setColor(config.embedcolor)
                .setFooter(`Submitted by ${defs.author}`)
                .setTimestamp()
            )
        } else {
            return message.channel.send(new MessageEmbed()
                .setAuthor(`Urban Dictionary`, `https://files.catbox.moe/kkkxw3.png`, `https://www.urbandictionary.com/`)
                .setTitle("Something went wrong.")
                .setColor(config.embedcolor))
        }

    }
}
>>>>>>> Stashed changes:old/Commands/Other/urban.js
