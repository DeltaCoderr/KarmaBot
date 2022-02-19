const { Command } = require("@sapphire/framework");
const { Message } = require("discord.js");
// const { KarmaCommand } = require("../../lib/KarmaCommand");

class PingCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
			aliases: ["pong"],
			description: "Latency of this Bot",
		});
	}
	/**
	 * @param {Message} msg
	 */
	async messageRun(msg) {
		const initial = await msg.reply(`Ping?`).catch(() => {});

		await initial
			.edit(
				`Pong! Discord: ${
					initial.createdTimestamp - msg.createdTimestamp
				} ms. Websocket: ${this.container.client.ws.ping} ms.`
			)
			.catch(() => {});
	}
}

module.exports = { PingCommand };
