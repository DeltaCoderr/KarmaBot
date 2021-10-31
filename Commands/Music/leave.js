const Discord = require('discord.js');
const { embedcolor } = require('../../Configs/config');

module.exports = {
    help: {
        name: 'leave',
        aliases: ['leave'],
        description: 'Leaves the VC.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message) => {


        const embednoinvoice = new Discord.MessageEmbed()
            .setTitle('Error!')
            .setDescription(`${emotes.error} - You're not in a voice channel !`)
            .setFooter('Karma Music System')
            .setColor(embedcolor)
        if (!message.member.voice.channel) return message.channel.send(embednoinvoice);

        client.player.setRepeatMode(message, false);
        client.player.stop(message);

        await message.member.voice.channel.leave()

        const left = new Discord.MessageEmbed()
            .setTitle('Left The Voice Channel')
            .setDescription(`${emotes.success} **Successfully left the voice channel!**`)
            .setFooter('Karma Music System')
            .setColor(embedcolor)
        return message.channel.send(left)
    }
}