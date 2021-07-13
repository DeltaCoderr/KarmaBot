const Discord = require('discord.js');
const { embedcolor } = require('../../Configs/config');

module.exports = {
    help: {
        name: 'volume',
        aliases: ['volume'],
        description: 'Adjust the volume of the Song.',
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
            .setDescription(`${emotes.error} - No music currently playing !`)
            .setFooter('Karma Music System')
            .setColor(embedcolor)
            .setTimestamp();

        const embed4 = new Discord.MessageEmbed()
            .setTitle('Something went wrong!')
            .setDescription(`${emotes.error} - Please enter the volume amount to set!`)
            .setFooter('Karma Music System')
            .setColor(embedcolor)
            .setTimestamp();

        const embed5 = new Discord.MessageEmbed()
            .setTitle('Something went wrong!')
            .setDescription(`${emotes.error} - Volume amount must be in range of \`0-100\`!`)
            .setFooter('Karma Music System')
            .setColor(embedcolor)
            .setTimestamp();

        if (!message.member.voice.channel) return message.reply(embed1);
        if (message.guild.me.voice.channel && message.guild.me.voice.channelID !== message.member.voice.channelID) return message.reply(embed2);

        const queue = client.player.getQueue(message);
        if (!queue) return message.reply(embed3);

        const amount = args[0];
        if (!amount || isNaN(amount)) return message.reply(embed4);
        if (parseInt(amount) < 0 || parseInt(amount) > 100) return message.reply(embed5);

        queue.player.setVolume(message, parseInt(amount));
        const embed6 = new Discord.MessageEmbed()
            .setTitle('Success!')
            .setDescription(`${emotes.success} - Volume changed to **${queue.volume}%**!`)
            .setFooter('Karma Music System')
            .setColor(embedcolor)
            .setTimestamp();
        message.reply(embed6);

    }
}