const Discord = require("discord.js");
const { embedcolor } = require('../../configs/config.json');
module.exports = {
    config: {
        name: "queue",
        aliases: [],
        category: "music",
        description: "Shows the next Music songs ",
        usage: "",
        accessableby: ""
    },
    run: async (client, message, args) => {
	const embednoinvoice = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${client.emotes.error} - You're not in a voice channel !`)
    .setFooter('Karma Music System')
    .setColor(embedcolor)
	.setTimestamp();
	const embednosong = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${client.emotes.error} - No songs currently playing !`)
    .setFooter('Karma Music System')
    .setColor(embedcolor)
	.setTimestamp();
    if (!message.member.voice.channel) return message.channel.send(embednoinvoice);

    const queue = client.player.getQueue(message);

    if (!client.player.getQueue(message)) return message.channel.send(embednosong);
	const embedqueue = new Discord.MessageEmbed()
	.setTitle(`Queue for ${message.guild.name}`)
	.setDescription(`**Server queue - ${message.guild.name} ${client.emotes.queue}**\nCurrent : ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
        return `**#${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`
    }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `And **${queue.tracks.length - 5}** other songs...` : `In the playlist **${queue.tracks.length}** song(s)...`}`))
    .setFooter('Karma Music System')
    .setColor(embedcolor)
	.setTimestamp();
    message.channel.send(embedqueue);

    }
};