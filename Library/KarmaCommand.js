const { Command } = require("@sapphire/framework");

module.exports = class KarmaCommand extends Command {
	constructor(context, ...options) {
		super(context, {
			...options,
		});
		this.usage = options.usage ?? `${this.name} [...args]`;
	}
};
