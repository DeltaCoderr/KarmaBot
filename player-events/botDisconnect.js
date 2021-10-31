const Discord = require('discord.js');

module.exports = (client, message) => {
	const embed = new Discord.MessageEmbed()
	.setTitle('Karma Disconnected!')
	.setDescription(`${emotes.error} - Music stopped as i have been disconnected from the channel !`)
	.setFooter('Karma Music System')
	.setColor(config.embedcolor)
	.setTimestamp();
    message.channel.send(embed);

};