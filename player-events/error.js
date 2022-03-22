const Discord = require('discord.js');


module.exports = (client, error, message) => {
	const embedNotPlaying = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${emotes.error} - There is no music being played on this server !`)
	.setFooter('Karma Music System')
	.setColor(config.embedcolor)
	.setTimestamp();
	const embedNotConnected = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${emotes.error} - You are not connected in any voice channel !`)
	.setFooter('Karma Music System')
	.setColor(config.embedcolor)
	.setTimestamp();
	const embedUnableToJoin = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${emotes.error} - I am not able to join your voice channel, please check my permissions !`)
	.setFooter('Karma Music System')
	.setColor(config.embedcolor)
	.setTimestamp();
	const embedDefault = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${emotes.error} - Something went wrong ... Error : ${error}`)
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
           // message.channel.send(embedDefault);
    };
};