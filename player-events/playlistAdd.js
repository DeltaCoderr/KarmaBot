const Discord = require('discord.js');
const config = require('../configs/config.json');

module.exports = (client, message, playlist) => {
	const embed = new Discord.MessageEmbed()
	.setTitle('Playlist Add!')
	.setDescription(`${client.emotes.music} - ${playlist.title} has been added to the queue (**${playlist.items.length}** songs) !`)
	.setFooter('Karma Music System')
	.setColor(config.embedcolor)
	.setTimestamp();
    message.channel.send(embed);

};