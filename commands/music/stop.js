const Discord = require("discord.js");
const { embedcolor } = require('../../configs/config.json');

module.exports = {
    config: {
        name: "stop",
        aliases: [],
        category: "music",
        description: "To stop music",
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
	const embedstop = new Discord.MessageEmbed()
	.setTitle('Stopped !')
	.setDescription(`${client.emotes.success} - Music **stopped** into this server !`)
    .setFooter('Karma Music System')
    .setColor(embedcolor)
	.setTimestamp();
    if (!message.member.voice.channel) return message.channel.send(embednoinvoice);

    if (!client.player.getQueue(message)) return message.channel.send(embednosong);

    client.player.setRepeatMode(message, false);
    client.player.stop(message);

    message.channel.send(embedstop);
    }
};