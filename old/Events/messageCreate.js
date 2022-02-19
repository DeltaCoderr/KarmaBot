const undici = require('undici');
const Database = require('../Structures/Database');

module.exports = async (client, message) => {
	if (!message.guild || message.author.bot) return;

	const db = await Database.findOne({ ID: `chatbot_${message.guild.id}` });
	const channel = db ? db.data : null;
	const sChannel = channel
		? message.guild.channels.cache.get(channel)
			? message.guild.channels.cache.get(channel)
			: null
		: null;

	if (message.content.startsWith(config.prefix)) {
		const args = message.content
			.slice(config.prefix.length)
			.trim()
			.split(/ +/g);
		const cmd = args.shift().toLowerCase();
		const commandFile =
			client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
		if (commandFile) {
			commandFile.run(client, message, args);
		}
	} else if (sChannel && message.channel.id === sChannel.id) {
		const chatbot = await undici.fetch(
			`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(
				message.content,
			)}&botname=${client.user.username}&user=${
				message.author.username
			}&ownername=Delta`,
		).then((res) => res.json());
		message.reply(chatbot.message);
	}
};
