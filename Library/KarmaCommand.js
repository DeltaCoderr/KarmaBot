const { Command } = require("@sapphire/framework");

global.KarmaCommand = module.exports = class KarmaCommand extends Command {
	constructor(context, ...options) {
		super(context, {
			...options,
		});
		this.usage = options.usage ?? `${this.name} [...args]`;
	}
};
