const Discord = require('discord.js');


module.exports = (message, track) => {
	const embed = new Discord.MessageEmbed()
	.setTitle('Track Started!')
	.setDescription(`${emotes.music} - Now playing ${track.title} into ${message.member.voice.channel.name} ...`)
	.setURL(track.url)
	.setThumbnail(track.thumbnail)
	.setFooter('Karma Music System')
	.setColor(config.embedcolor)
	.setTimestamp();
    message.channel.send(embed);

};