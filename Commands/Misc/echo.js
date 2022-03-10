const Command = require("../../Client/Command");

module.exports = new Command({
	name: "echo",
	description: "Echoes your message",
	slashOptions: [
		{
			name: "message",
			description: "The message to echo",
			type: Command.types.STRING,
			required: true,
		},
	],
	run: async (client, message, args) => {
		const msg = args.join(" ");
		if (!msg) {
			message.reply(`What should I echo?`).catch(() => {});
			return;
		}
		message.channel.send(`${message.author.username} | ${msg}`).catch(() => {});
	},

	exec: async (client, interaction) => {
		const message = interaction.options.getString("message");
		if (!message) {
			interaction
				.reply({
					content: `What should I echo?`,
					ephemeral: true,
				})
				.catch(() => {});
			return;
		}

		interaction
			.reply(`${interaction.user.username} | ${message}`)
			.catch(() => {});
	},
});
