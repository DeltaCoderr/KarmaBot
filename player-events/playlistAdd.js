const Discord = require('discord.js');


module.exports = (client, message, playlist) => {
	const embed = new Discord.MessageEmbed()
	.setTitle('Playlist Add!')
	.setDescription(`${emotes.music} - ${playlist.title} has been added to the queue (**${playlist.items.length}** songs) !`)
	.setFooter('Karma Music System')
	.setColor(config.embedcolor)
	.setTimestamp();
    message.channel.send(embed);

};