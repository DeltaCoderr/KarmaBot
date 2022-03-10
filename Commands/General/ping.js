const Command = require("../../Client/Command");

module.exports = new Command({
	name: "ping",
	aliases: ["pong"],
	description: "The ping of the bot",
	category: "General",
	run: async (client, message, args) => {
		message.reply(`Pong!・\`${client.ws.ping}\` ms.`).catch(() => {});
	},
	exec: async (client, interaction) => {
		interaction.reply(`Pong!・\`${client.ws.ping}\` ms.`).catch(() => {});
	},
});
