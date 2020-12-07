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
	const embeddisabled = new Discord.MessageEmbed()
	.setTitle('Loop Disabled!')
	.setDescription(`${client.emotes.success} - Repeat mode **disabled** !`)
    .setFooter('Karma Music System')
    .setColor(embedcolor)
	.setTimestamp();
    const embedenabled = new Discord.MessageEmbed()
	.setTitle('Loop Enabled!')
	.setDescription(`${client.emotes.success} - Repeat mode **enabled** !`)
    .setFooter('Karma Music System')
    .setColor(embedcolor)
	.setTimestamp();
    if (!message.member.voice.channel) return message.channel.send(embednoinvoice);

    if (!client.player.getQueue(message)) return message.channel.send(embednomusic);

    const repeatMode = client.player.getQueue(message).repeatMode;

    if (repeatMode) {
        client.player.setRepeatMode(message, false);
        return message.channel.send(embeddisabled);
    } else {
        client.player.setRepeatMode(message, true);
        return message.channel.send(embedenabled);
    };
    }
};