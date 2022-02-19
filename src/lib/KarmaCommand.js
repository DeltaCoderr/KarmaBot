const { Command } = require("@sapphire/framework");

class KarmaCommand extends Command {
	constructor(context, options) {
		super(context, {
			options,
		});
		this.usage = options.usage ?? `${this.name} [...args]`;
	}
}

module.exports = { KarmaCommand }; // YET TO FIX THIS :P
