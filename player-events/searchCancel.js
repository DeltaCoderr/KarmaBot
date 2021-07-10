const Discord = require('discord.js');


module.exports = (client, message, query, tracks) => {
	const embed = new Discord.MessageEmbed()
	.setTitle('Search Cancelled!')
	.setDescription(`${emotes.error} - You did not provide a valid response ... Please send the command again !`)
	.setFooter('Karma Music System')
	.setColor(config.embedcolor)
	.setTimestamp();
    message.channel.send(embed);

};