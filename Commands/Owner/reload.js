const KarmaCommand = require("../../Library/KarmaCommand");

module.exports = class ReloadCommand extends KarmaCommand {
	constructor(context, options) {
		super(context, {
			...options,
			preconditions: ["OwnerOnly"],
			description: "Reloads `all` or a certain command",
		});
	}

	async messageRun(message, args) {
		const cmd = await args.pick("string");
		// if (cmd === "all") {
		// 	this.container.stores.get("commands").forEach((value) => {
		// 		delete require.cache[require.resolve(value)];
		// 	});
		// 	this.container.stores.get("commands").clear();
		// 	await this.container.stores.get("commands").loadAll();
		// 	message.reply(`Reloaded all commands`);
		// 	return;
		// } else {
		const command = this.container.stores.get("commands").get(cmd);
		if (!command) {
			message.reply(`Invalid Command`).catch(() => {});
			return;
		}
		this.container.stores.get("commands").delete(command.name);
		await this.container.stores.get("commands").insert(command);
		message.reply(`Reloaded ${command.name} command`);
		return;
		//}
	}
};
