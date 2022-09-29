const Discord = require('discord.js');
const { embedcolor } = require('../../Configs/config');

module.exports = {
    help: {
        name: 'pause',
        aliases: ['pause'],
        description: 'Pauses the song.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message) => {
        const embed1 = new Discord.MessageEmbed()
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
            .setDescription(`${emotes.error} - The music is already paused !`)
            .setFooter('Karma Music System')
            .setColor(embedcolor)
            .setTimestamp();

        if (!message.member.voice.channel) return message.channel.send(embed1);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(embed2);

        if (!client.player.getQueue(message)) return message.channel.send(embed3);

        if (client.player.getQueue(message).paused) return message.channel.send(embed4);

        const success = client.player.pause(message);
        const embed5 = new Discord.MessageEmbed()
            .setTitle('Success!')
            .setDescription(`${emotes.success} - Song ${client.player.getQueue(message).playing.title} paused !`)
            .setFooter('Karma Music System')
            .setColor(embedcolor)
            .setTimestamp();
        if (success) message.channel.send(embed5);
    }
}