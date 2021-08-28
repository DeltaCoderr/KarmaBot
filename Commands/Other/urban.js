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

        if (!args[0]) return message.channel.send(`${client.emotes.error} Boi, Provide an Word`)

        let def;

        if (args.length) {

            const defs = await urban(args.join(' ')).catch(() => { })

            if (!defs) return message.channel.send(new MessageEmbed().setColor('FF0000').setDescription(`\u200B\n\nNo match found for **${args.join(' ')}**`).setThumbnail('https://files.catbox.moe/kkkxw3.png'))

            if (defs.constructor.name === 'Array') {
                let total = Object.keys(defs).length

                if (!defs || !total) return message.channel.send(new MessageEmbed().setColor('FF0000').setDescription(`\u200B\n\nNo match found for **${args.join(' ')}**`).setThumbnail('https://files.catbox.moe/kkkxw3.png'))

                def = defs[1]

            } else if (defs.constructor.name === 'Definition') {

                def = defs

            }

            return message.channel.send({embeds: [new MessageEmbed()
                .setAuthor(`Urban Dictionary`, `https://files.catbox.moe/kkkxw3.png`, `https://www.urbandictionary.com/`)
                .setThumbnail("https://cdn.discordapp.com/attachments/739360499086524476/745639669836021841/UD_2.PNG")
                .setTitle(`Definition of ${defs.word}`)
                .setURL(defs.urbanURL)
                .addField('Example(s)', defs.example ? defs.example : 'N/A')
                .setColor(config.embedcolor)
                .setFooter(`Submitted by ${defs.author}`)
                .setTimestamp()]})
        } else {
            return message.channel.send({embeds: [new MessageEmbed()
                .setAuthor(`Urban Dictionary`, `https://files.catbox.moe/kkkxw3.png`, `https://www.urbandictionary.com/`)
                .setTitle("Something went wrong.")
                .setColor(config.embedcolor)]})
        }

    }
}