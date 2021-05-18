const Discord = require("discord.js");
const { embedcolor } = require('../../configs/config.json')

module.exports = {
    config: {
        name: "clear-queue",
        aliases: [],
        category: "music",
        description: "Deletes the next music in queue",
        usage: "",
        accessableby: ""
    },
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setTitle('Something went wrong!')
        .setDescription(`${client.emotes.error} - You're not in a voice channel !`)
        .setFooter('Karma Music System')
        .setColor(embedcolor)
        .setTimestamp();

        const embed2 = new Discord.MessageEmbed()
        .setTitle('Something went wrong!')
        .setDescription(`${client.emotes.error} - You are not in the same voice channel !`)
        .setFooter('Karma Music System')
        .setColor(embedcolor)
        .setTimestamp();

        const embed3 = new Discord.MessageEmbed()
        .setTitle('Something went wrong!')
        .setDescription(`${client.emotes.error} - No music currently playing !`)
        .setFooter('Karma Music System')
        .setColor(embedcolor)
        .setTimestamp();

        const embed4 = new Discord.MessageEmbed()
        .setTitle('Something went wrong!')
        .setDescription(`${client.emotes.error} - There is only one song in the queue.`)
        .setFooter('Karma Music System')
        .setColor(embedcolor)
        .setTimestamp();

        const embed5 = new Discord.MessageEmbed()
        .setTitle('Success!')
        .setDescription(`${client.emotes.success} - The queue has just been **removed** !`)
        .setFooter(client.user.username + ' Music System')
        .setColor('GREEN')
        .setTimestamp();

        if (!message.member.voice.channel) return message.channel.send(embed);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(embed2);

        if (!client.player.getQueue(message)) return message.channel.send(embed3);

        if (client.player.getQueue(message).tracks.length <= 1) return message.channel.send(embed4);

        client.player.clearQueue(message);

        message.channel.send(embed5);
    }
};