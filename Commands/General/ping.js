const KarmaCommand = require("../../Library/KarmaCommand");
const { Message } = require("discord.js");

module.exports = class PingCommand extends KarmaCommand {
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
};
