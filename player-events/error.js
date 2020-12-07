const Discord = require('discord.js');
const config = require('../configs/config.json');

module.exports = (client, error, message) => {
	const embedNotPlaying = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${client.emotes.error} - There is no music being played on this server !`)
	.setFooter('Karma Music System')
	.setColor(config.embedcolor)
	.setTimestamp();
	const embedNotConnected = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${client.emotes.error} - You are not connected in any voice channel !`)
	.setFooter('Karma Music System')
	.setColor(config.embedcolor)
	.setTimestamp();
	const embedUnableToJoin = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${client.emotes.error} - I am not able to join your voice channel, please check my permissions !`)
	.setFooter('Karma Music System')
	.setColor(config.embedcolor)
	.setTimestamp();
	const embedDefault = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${client.emotes.error} - Something went wrong ... Error : ${error}`)
	.setFooter('Karma Music System')
	.setColor(config.embedcolor)
	.setTimestamp();
	
    switch (error) {
        case 'NotPlaying':
            message.channel.send(embedNotPlaying);
            break;
        case 'NotConnected':
            message.channel.send(embedNotConnected);
            break;
        case 'UnableToJoin':
            message.channel.send(embedUnableToJoin);
            break;
        default:
            message.channel.send(embedDefault);
    };
};