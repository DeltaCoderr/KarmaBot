const Discord = require("discord.js");
const { embedcolor } = require('../../configs/config.json');

module.exports = {
    config: {
        name: "loop",
        aliases: [],
        category: "music",
        description: "To enable or disable the repeat function",
        usage: "",
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
        .setDescription(`${client.emotes.error} - No music currently playing !`)
        .setFooter('Karma Music System')
        .setColor(embedcolor)
        .setTimestamp();

        const embed3 = new Discord.MessageEmbed()
        .setTitle('Success!')
        .setDescription(`${client.emotes.success} - Repeat mode **disabled** !`)
        .setFooter('Karma Music System')
        .setColor(embedcolor)
        .setTimestamp();

        const embed4 = new Discord.MessageEmbed()
        .setTitle('Success!')
        .setDescription(`${client.emotes.success} - Repeat mode **enabled** the whole queue will be repeated endlessly !`)
        .setFooter('Karma Music System')
        .setColor(embedcolor)
        .setTimestamp();

        const embed5 = new Discord.MessageEmbed()
        .setTitle('Success!')
        .setDescription(`${client.emotes.success} - Repeat mode **disabled** !`)
        .setFooter('Karma Music System')
        .setColor(embedcolor)
        .setTimestamp();

        const embed6 = new Discord.MessageEmbed()
        .setTitle('Success!')
        .setDescription(`${client.emotes.success} - Repeat mode **enabled** the current music will be repeated endlessly !`)
        .setFooter('Karma Music System')
        .setColor(embedcolor)
        .setTimestamp();


        if (!message.member.voice.channel) return message.channel.send(embed1);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

        if (!client.player.getQueue(message)) return message.channel.send(embed2);

        if (args.join(" ").toLowerCase() === 'queue') {
            if (client.player.getQueue(message).loopMode) {
                client.player.setLoopMode(message, false);
                return message.channel.send(embed3);
            } else {
                client.player.setLoopMode(message, true);
                return message.channel.send(embed4);
            };
        } else {
            if (client.player.getQueue(message).repeatMode) {
                client.player.setRepeatMode(message, false);
                return message.channel.send(embed5);
            } else {
                client.player.setRepeatMode(message, true);
                return message.channel.send(embed6);
            };
        }
    }
};