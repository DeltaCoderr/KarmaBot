const Discord = require("discord.js");
const { embedcolor } = require('../../configs/config.json')

module.exports = {
    config: {
        name: "clear-queue",
        aliases: [],
        category: "music",
        description: "Deletes the next music in queue",
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
	const embednomusic = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${client.emotes.error} - No music currently playing !`)
    .setFooter('Karma Music System')
    .setColor(embedcolor)
	.setTimestamp();
	const embedclear = new Discord.MessageEmbed()
	.setTitle('Success!')
	.setDescription(`${client.emotes.success} - The queue has just been **removed** !`)
    .setFooter('Karma Music System')
    .setColor(embedcolor)
	.setTimestamp();
	if (!message.member.voice.channel) return message.channel.send(embednoinvoice);

    if (!client.player.getQueue(message)) return message.channel.send(embednomusic);

    client.player.clearQueue(message);

    message.channel.send(embedclear);
    }
};