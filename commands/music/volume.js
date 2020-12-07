const Discord = require("discord.js");
const { embedcolor } = require('../../configs/config.json');

module.exports = {
    config: {
        name: "volume",
        aliases: [],
        category: "music",
        description: "To set music volume",
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
	const embedenternumber = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${client.emotes.error} - Please enter a number !`)
	.setFooter('Karma Music System')
	.setColor(embedcolor)
	.setTimestamp();
	const embedbetw = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${client.emotes.error} - Please enter a valid number (between 1 and 100) !`)
	.setFooter('Karma Music System')
	.setColor(embedcolor)
	.setTimestamp();
	const embedvalid = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${client.emotes.error} - Please enter a valid number !`)
	.setFooter('Karma Music System')
	.setColor(embedcolor)
	.setTimestamp();
	const embedsett = new Discord.MessageEmbed()
	.setTitle('Success!')
	.setDescription(`${client.emotes.success} - Volume set to **${args.join(" ")}%** !`)
	.setFooter('Karma Music System')
	.setColor(embedcolor)
	.setTimestamp();
    if (!message.member.voice.channel) return message.channel.send(embednoinvoice);

    if (!client.player.getQueue(message)) return message.channel.send(embednosong);

    if (!args[0]) return message.channel.send(embedenternumber);

    if (isNaN(args[0]) || 100 < args[0] || args[0] <= 0) return message.channel.send(embedbetw);

    if (message.content.includes('-') || message.content.includes('+') || message.content.includes(',') || message.content.includes('.')) return message.channel.send(embedvalid);

    client.player.setVolume(message, parseInt(args[0]));

    message.channel.send(embedsett);
    }
};