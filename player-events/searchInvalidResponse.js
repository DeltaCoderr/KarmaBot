const Discord = require('discord.js');


module.exports = (client, message, tracks) => {
	const embed = new Discord.MessageEmbed()
	.setTitle('Search Invalid Response!')
	.setDescription(`${emotes.error} - You must send a valid number between **1** and **${tracks.length}** !`)
	.setFooter('Karma Music System')
	.setColor(config.embedcolor)
	.setTimestamp();
    message.channel.send(embed);

};