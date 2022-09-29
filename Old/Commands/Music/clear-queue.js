const Discord = require('discord.js');
const { embedcolor } = require('../../Configs/config');

module.exports = {
    help: {
        name: 'clear-queue',
        aliases: ['clear-queue'],
        description: 'Clears the whole Queue.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message) => {

        const embed = new Discord.MessageEmbed()
            .setTitle('Something went wrong!')
            .setDescription(`${emotes.error} - You're not in a voice channel !`)
            .setFooter('Karma Music System')
            .setColor(embedcolor)
            .setTimestamp();

        const embed2 = new Discord.MessageEmbed()
            .setTitle('Something went wrong!')
            .setDescription(`${emotes.error} - You are not in the same voice channel !`)
            .setFooter('Karma Music System')
            .setColor(embedcolor)
            .setTimestamp();

        const embed3 = new Discord.MessageEmbed()
            .setTitle('Something went wrong!')
            .setDescription(`${emotes.error} - No music currently playing !`)
            .setFooter('Karma Music System')
            .setColor(embedcolor)
            .setTimestamp();

        const embed4 = new Discord.MessageEmbed()
            .setTitle('Something went wrong!')
            .setDescription(`${emotes.error} - There is only one song in the queue.`)
            .setFooter('Karma Music System')
            .setColor(embedcolor)
            .setTimestamp();

        const embed5 = new Discord.MessageEmbed()
            .setTitle('Success!')
            .setDescription(`${emotes.success} - The queue has just been **removed** !`)
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
}