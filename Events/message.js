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

	if (message.content.startsWith(config.prefix)) {

		let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
		let cmd = args.shift().toLowerCase();

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
			return sChannel.send(`**:x: Please dont mention anyone**`);
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