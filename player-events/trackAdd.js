const Discord = require('discord.js');


module.exports = (message, track) => {
	const embed = new Discord.MessageEmbed()
	.setTitle('Track Added!')
	.setDescription(`${emotes.music} - ${track.title} has been added to the queue !`)
	.setFooter('Karma Music System')
	.setColor(config.embedcolor)
	.setTimestamp();
    message.channel.send(embed);

};