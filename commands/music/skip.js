const Discord = require("discord.js");
const { embedcolor } = require("../../configs/config.json")

module.exports = {
    config: {
        name: "skip",
        aliases: [],
        category: "music",
        description: "To skip current song",
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
        .setDescription(`${client.emotes.error} - You're not in my voice channel !`)
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
        .setTitle('Success!')
        .setDescription(`${client.emotes.success} - The current music has just been **skipped** !`)
        .setFooter('Karma Music System')
        .setColor(embedcolor)
        .setTimestamp();

        if (!message.member.voice.channel) return message.channel.send(embed1);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(embed2);

        if (!client.player.getQueue(message)) return message.channel.send(embed3);

        const success = client.player.skip(message);

        if (success) message.channel.send(embed4);
    }
};
