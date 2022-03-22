const Listener = require("../Structures/Listener");

module.exports = new Listener("messageCreate", async (client, message) => {
	if (!message.guild || message.author.bot) return;
	const { config } = client;

	if (message.content.startsWith(config.prefix)) {
		let args = message.content
			.slice(config.prefix.length)
			.trim()
			.split(/ +/g);
		let cmd = args.shift().toLowerCase();

		var command =
			client.commands.get(cmd) ||
			client.commands.find((c) => c.aliases && c.aliases.includes(cmd));
		if (command && command.run && typeof command.run === "function") {
			if (command.permissions) {
				if (!message.member.permissions.has(command.permissions)) {
					message
						.reply(
							`Missing \`${command.permissions.join(
								"`, `"
							)}\` Permission(s)`
						)
						.catch(() => {});

					return;
				}
			}
			try {
				command.run(client, message, args);
			} catch (error) {
				client.logger.error(`[ERROR]: ${command.name} | ${error}`);
			}
		}
		// } else {
		// 	const channel = await db.get(`chatbot_${message.guild.id}`);
		// 	if (!channel) return;
		// 	const sChannel = message.guild.channels.cache.get(channel);
		// 	if (!sChannel) return;
		// 	if (message.author.bot || sChannel.id !== message.channel.id) return;
		// 	message.content = message.content
		// 		.replace(/@(everyone)/gi, "everyone")
		// 		.replace(/@(here)/gi, "here");
		// 	if (message.mentions.members.size) {
		// 		message.mentions.members.forEach((member) => {
		// 			message.content = message.content.replace(
		// 				`<@!${member.id}>`,
		// 				member.displayName
		// 			);
		// 		});
		// 	}
		// 	sChannel.sendTyping().catch(() => {});
		// 	if (!message.content) return sChannel.send("Please say something.");
		// 	fetch(
		// 		`https://api.deltacoderr.repl.co/chatbot?message=${encodeURIComponent(
		// 			message.content
		// 		)}&name=${client.user.username}&user=${
		// 			message.author.username
		// 		}&gender=Male`
		// 	)
		// 		.then((res) => res.json())
		// 		.then((data) => {
		// 			message.reply(`${data.message}`).catch(() => {});
		// 		});
	}
});
