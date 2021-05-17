const Discord = require('discord.js');
const config = require('../configs/config.json');

module.exports = (client, message, queue, track) => {
	const embed = new Discord.MessageEmbed()
	.setTitle('Track Added!')
	.setDescription(`${client.emotes.music} - ${track.title} has been added to the queue !`)
	.setFooter('Karma Music System')
	.setColor(config.embedcolor)
	.setTimestamp();
    message.channel.send(embed);

};