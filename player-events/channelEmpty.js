const Discord = require('discord.js');
const config = require('../configs/config.json');

module.exports = (client, message, queue) => {
	const embed = new Discord.MessageEmbed()
	.setTitle('Channel Empty!')
	.setDescription(`${client.emotes.error} - Music stopped as there is no more member in the voice channel !`)
	.setFooter('Karma Music System')
	.setColor(config.embedcolor)
	.setTimestamp();
    message.channel.send(embed);

};