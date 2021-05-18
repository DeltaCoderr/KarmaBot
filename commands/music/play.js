const Discord = require("discord.js");
const { embedcolor } = require('../../configs/config.json');

module.exports = {
    config: {
        name: "play",
        aliases: [],
        category: "music",
        description: "Plays music in a voice channel",
        usage: "<name>",
        accessableby: ""
    },
    run: async (client, message, args) => {
        const embed1 = new Discord.MessageEmbed()
        .setTitle('Something went wrong!')
        .setDescription(`${client.emotes.error} - You're not in a voice channel !`)
        .setFooter('Karma Music System')
        .setColor(embedcolor)
        .setTimestamp();

        const embed2 = new Discord.MessageEmbed()
        .setTitle('Something went wrong!')
        .setDescription(`${client.emotes.error} - You're not in my voice channel !`)
        .setFooter('Karma Music System')
        .setColor(embedcolor)
        .setTimestamp();

        const embed3 = new Discord.MessageEmbed()
        .setTitle('Something went wrong!')
        .setDescription(`${client.emotes.error} - Please include a search query !`)
        .setFooter('Karma Music System')
        .setColor(embedcolor)
        .setTimestamp();

        if (!message.member.voice.channel) return message.reply(embed1);
        if (message.guild.me.voice.channel && message.guild.me.voice.channelID !== message.member.voice.channelID) return message.reply(embed2);
        
        const query = args.join(" ");
        if (!query) return message.reply(embed3);

        await client.player.play(message, query, true);
    }
};