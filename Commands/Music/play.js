//Music commands should be removed.
const Discord = require('discord.js');
const { embedcolor } = require('../../Configs/config');

module.exports = {
    help: {
        name: 'play',
        aliases: ['play'],
        description: 'Plays the given song.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {
        const embed1 = new Discord.MessageEmbed()
            .setTitle('Something went wrong!')
            .setDescription(`${emotes.error} - You're not in a voice channel !`)
            .setFooter('Karma Music System')
            .setColor(embedcolor)
            .setTimestamp();

        const embed2 = new Discord.MessageEmbed()
            .setTitle('Something went wrong!')
            .setDescription(`${emotes.error} - You're not in my voice channel !`)
            .setFooter('Karma Music System')
            .setColor(embedcolor)
            .setTimestamp();

        const embed3 = new Discord.MessageEmbed()
            .setTitle('Something went wrong!')
            .setDescription(`${emotes.error} - Please include a search query !`)
            .setFooter('Karma Music System')
            .setColor(embedcolor)
            .setTimestamp();

        if (!message.member.voice.channel) return message.reply(embed1);
        if (message.guild.me.voice.channel && message.guild.me.voice.channelID !== message.member.voice.channelID) return message.reply(embed2);

        const query = args.join(" ");
        if (!query) return message.reply(embed3);

        await client.player.play(message, query, true);
    }
}