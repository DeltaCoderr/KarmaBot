const Discord = require('discord.js');
const config = require('../configs/config.json');

module.exports = (client, message, query) => {
	const embed = new Discord.MessageEmbed()
	.setTitle('No Results!')
	.setDescription(`${client.emotes.error} - No results found on YouTube for ${query} !`)
	.setFooter('Karma Music System')
	.setColor(config.embedcolor)
	.setTimestamp();
    message.channel.send(embed);

};