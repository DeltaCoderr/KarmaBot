const Discord = require('discord.js');

module.exports = (message) => {
	const embed = new Discord.MessageEmbed()
	.setTitle('Channel Empty!')
	.setDescription(`${emotes.error} - Music stopped as there is no more member in the voice channel !`)
	.setFooter('Karma Music System')
	.setColor(config.embedcolor)
	.setTimestamp();
    message.channel.send(embed);

};