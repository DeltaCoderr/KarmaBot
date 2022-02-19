const Discord = require('discord.js');
const { embedcolor } = require('../../Configs/config');

module.exports = {
    help: {
        name: 'search',
        aliases: ['search'],
        description: 'Searches the given Song from Youtube.',
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
            .setDescription(`${emotes.error} - Please indicate the title of a song !`)
            .setFooter('Karma Music System')
            .setColor(embedcolor)
            .setTimestamp();

        if (!message.member.voice.channel) return message.channel.send(embed1);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(embed2);

        if (!args[0]) return message.channel.send(embed3);

        client.player.play(message, args.join(" "));

    }
}