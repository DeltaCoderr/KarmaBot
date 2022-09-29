const Discord = require('discord.js');
const { embedcolor } = require('../../Configs/config');

module.exports = {
    help: {
        name: 'shuffle',
        aliases: ['shuffle'],
        description: 'Shuffles the Queue.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message) => {
        const embednoinvoice = new Discord.MessageEmbed()
            .setTitle('Error!')
            .setDescription(`${emotes.error} - You're not in a voice channel !`)
            .setFooter('Karma Music System')
            .setColor(embedcolor)
            .setTimestamp();
        const embednosong = new Discord.MessageEmbed()
            .setTitle('Error!')
            .setDescription(`${emotes.error} - No songs currently playing !`)
            .setFooter('Karma Music System')
            .setColor(embedcolor)
            .setTimestamp();
        const embedshuffle = new Discord.MessageEmbed()
            .setTitle('Shuffled!')
            .setDescription(`${emotes.success} - Queue shuffled **${client.player.getQueue(message).tracks.length}** song(s) !`)
            .setFooter('Karma Music System')
            .setColor(embedcolor)
            .setTimestamp();
        if (!message.member.voice.channel) return message.channel.send(embednoinvoice);

        if (!client.player.getQueue(message)) return message.channel.send(embednosong);

        client.player.shuffle(message);

        return message.channel.send(embedshuffle);

    }
}