const { Message } = require('discord.js');
const { Bot } = require('../Structures/Client');
const { db } = require('../Structures/Database')
const fetch = require('node-fetch');

/**
 * @param { Bot } client
 * @param { Message } message
 * @param { db } database
 */

module.exports = async (client, message) => {

	if (!message.guild || message.author.bot) return;
	const { config } = client;
	const { cooldowns } = client;

	if (message.content.startsWith(config.prefix)) {

		let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
		let cmd = args.shift().toLowerCase();
		const findcommand = client.commands.get(cmd);
        	if(!findcommand) return;

       		if(!cooldowns.has(findcommand.help.name)) {
            	cooldowns.set(findcommand.help.name, new Collection());
        	}
		
		const now = Date.now();
       		const timestamps = cooldowns.get(findcommand.help.name);
        	const cooldownAmount = (findcommand.help.cooldown || 3) * 1000;

        	if(timestamps.has(message.author.id)) {
            	const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            	if(now < expirationTime) {
                	const timeLeft = (expirationTime - now) / 1000;
                	let hours   = Math.floor(timeLeft / 3600);
               		let minutes = Math.floor((timeLeft - (hours * 3600)) / 60);
               		let seconds = timeLeft - (hours * 3600) - (minutes * 60);
               		if (hours   < 10) {hours   = "0"+hours;}
               		if (minutes < 10) {minutes = "0"+minutes;}
               		if (seconds < 10) {seconds = "0"+seconds;}
               		const cooldownembed = new MessageEmbed()
               			.setTitle('Cooldown Alert!')
               			.setDescription(`Please wait **${hours}** Hours **${minutes}** Minutes **${seconds}** Seconds before reusing the \`${findcommand.help.name}\` command.`)
               			.setColor(config.color)
               			.setFooter(client.user.username, client.user.avatarURL())
               			.setTimestamp();
               		return message.reply(cooldownembed)
          		}
		}

		timestamps.set(message.author.id, now);
        	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
		
		var commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
		if (commandFile) commandFile.run(client, message, args)
	} else {

		const channel = await db.get(`chatbot_${message.guild.id}`);
		if (!channel) return;
		const sChannel = message.guild.channels.cache.get(channel);
		if (!sChannel) return;
		if (message.author.bot || sChannel.id !== message.channel.id) return;
		message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
		if (message.content.includes(`@`)) {
			return sChannel.send(`**:x: Please don't mention anyone**`);
		}
		sChannel.startTyping();
		if (!message.content) return sChannel.send("Please say something.");
		fetch(`https://api.deltaa.me/chatbot?message=${encodeURIComponent(message.content)}&name=${client.user.username}&user=${message.author.username}&gender=Male`)
			.then(res => res.json())
			.then(data => {
				sChannel.send(`> ${message.content} \n ${data.message}`);
			});
		sChannel.stopTyping();
	}
}
