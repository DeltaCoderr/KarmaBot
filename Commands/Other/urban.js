const urban = require('relevant-urban');
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const config = require("../../Configs/config");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("urban")
        .setDescription("Shows the urban definition")
        .addStringOption((option) =>
            option
                .setName("word")
                .setDescription("The word you need urban definition of")
                .setRequired(true)
        ),
    async execute(interaction) {

        let word = interaction.options.getString("word");
        if (!word) interaction.reply({ content: "Boi provide a word!", ephemeral: true });

        let def;
        let embed = new EmbedBuilder();

        if (word.length) {

            const defs = await urban(word).catch(() => { })
            if (!defs) return await interaction.reply({
                embeds: [embed.setColor('FF0000').setDescription(`\u200B\n\nNo match found for **${word}**`).setThumbnail('https://files.catbox.moe/kkkxw3.png')],
                ephemeral: false
            })

            if (defs.constructor.name === 'Array') {
                let total = Object.keys(defs).length

                if (!total) return await interaction.reply({
                    embeds: [embed.setColor('FF0000').setDescription(`\u200B\n\nNo match found for **${word}**`).setThumbnail('https://files.catbox.moe/kkkxw3.png')],
                    ephemeral: false
                })
                def = defs[1]

            } else if (defs.constructor.name === 'Definition') {

                def = defs

            }

            return await interaction.reply({
                embeds: [embed.setAuthor({ name: `Urban Dictionary`, iconURL: `https://files.catbox.moe/kkkxw3.png`, url: `https://www.urbandictionary.com/` })
                    .setThumbnail("https://cdn.discordapp.com/attachments/739360499086524476/745639669836021841/UD_2.PNG")
                    .setTitle(`Definition of ${defs.word}`)
                    .setURL(defs.urbanURL)
                    .addFields({ name: "Example(s): ", value: defs.example ? defs.example : 'N/A', inline: true })
                    .setColor(config.embedcolor)
                    .setTimestamp()], ephemeral: false
            }

            )

        }

        else {
            await interaction.reply({
                embeds: [{
                    color: config.embedcolor ? config.embedcolor : null,
                    title: "❌ Something Went Wrong."
                }],
                ephemeral: false,
            });
        }

    },
};









/*
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
}*/
