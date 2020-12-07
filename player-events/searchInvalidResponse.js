const Discord = require('discord.js');
const config = require('../configs/config.json');

module.exports = (client, message, query, tracks, content, collector) => {
	const embed = new Discord.MessageEmbed()
	.setTitle('Search Invalid Response!')
	.setDescription(`${client.emotes.error} - You must send a valid number between **1** and **${tracks.length}** !`)
	.setFooter('Karma Music System')
	.setColor(config.embedcolor)
	.setTimestamp();
    message.channel.send(embed);

};