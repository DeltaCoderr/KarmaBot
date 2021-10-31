const Discord = require('discord.js');
const { embedcolor } = require('../../Configs/config');

module.exports = {
    help: {
        name: 'np',
        aliases: ['np'],
        description: 'Now Playing.',
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
        .setDescription(`${emotes.error} - You're not in my voice channel!`)
        .setFooter('Karma Music System')
        .setColor(embedcolor)
        .setTimestamp();

        const embed3 = new Discord.MessageEmbed()
        .setTitle('Something went wrong!')
        .setDescription(`${emotes.error} - I'm not playing anything?`)
        .setFooter('Karma Music System')
        .setColor(embedcolor)
        .setTimestamp();

        if (!message.member.voice.channel) return message.reply(embed1);
        if (message.guild.me.voice.channel && message.guild.me.voice.channelID !== message.member.voice.channelID) return message.reply(embed2);

        const queue = client.player.getQueue(message);
        if (!queue) return message.reply(embed3);

        const current = queue.playing;

        const filters = [];

        Object.keys(client.player.getQueue(message).filters).forEach((filterName) => {
            if (client.player.getQueue(message).filters[filterName]) filters.push(filterName);
        });

        const embed = new Discord.MessageEmbed()
            .setTitle("Now Playing!")
            .addField("📋 Title:", current.title, true)
            .addField("💬 Author:", current.author, true)
            .addField("👤 Queued by:", current.requestedBy.tag, true)
            .addField("📜 Views:", current.views, true)
            .addField(`⏲️ Duration:`, current.duration, true)
            .addField(`${emotes.success} Filters activated:`, filters.length, true )
            .addField(`${emotes.diskspin} Progress:`, client.player.createProgressBar(message, { timecodes: true, length: 15 }))
            .setTimestamp()
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL())
            .setColor(embedcolor);

        if (current.thumbnail) embed.setThumbnail(current.thumbnail);

        message.reply(embed);

    }
}