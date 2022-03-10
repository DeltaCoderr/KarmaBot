const Listener = require("../../Client/Listener");

module.exports = new Listener("messageCreate", async (client, message) => {
	if (message.author.bot || !message.guild) return;

	if (!message.content.startsWith(client.config.main.prefix)) return;
	const args = message.content
		.slice(client.config.main.prefix.length)
		.trim()
		.split(/ +/g);
	const cmd = args.shift().toLowerCase();

	const command =
		client.commands.get(cmd) ||
		client.commands.find((c) => c.aliases && c.aliases.includes(cmd));
	if (!command) return;

	try {
		if (command.permissions && Array.isArray(command.permissions)) {
			if (
				!message.member.permissions.has(command.permissions) &&
				!message.channel
					.permissionsFor(message.author.id)
					.has(command.permissions)
			) {
				message.reply(
					`Missing \`${command.permissions
						.map((p) => client.utils.format_string(p))
						.join(", ")}\` Permission(s)`
				);
				return;
			}
		}
		/* Executing command */
		await command.run(client, message, args);
	} catch (error) {
		message.channel.send(`An error occurred: \`${error}\``);
		console.log(error);
	}
});
