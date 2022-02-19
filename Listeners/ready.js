const { Listener } = require("@sapphire/framework");

class ReadyListener extends Listener {
	constructor(context, options) {
		super(context, {
			...options,
			once: true,
		});
	}

	async run() {
		console.log(
			`[API]: Logged in as ${this.container.client.user.tag} (${this.container.client.user.id})`
		);
	}
}

module.exports = { ReadyListener };
