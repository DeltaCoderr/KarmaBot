const Discord = require('discord.js');


module.exports = (client, message, queue) => {
	const embed = new Discord.MessageEmbed()
	.setTitle('Queue End!')
	.setDescription(`${emotes.error} - Music stopped as there is no more music in the queue !`)
	.setFooter('Karma Music System')
	.setColor(config.embedcolor)
	.setTimestamp();
    message.channel.send(embed);

};