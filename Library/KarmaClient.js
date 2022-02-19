const { SapphireClient } = require("@sapphire/framework");

module.exports = class KarmaClient extends SapphireClient {
	constructor(options) {
		super({
			...options,
			caseInsensitiveCommands: true,
			defaultPrefix: ["k!", "K!"],
			typing: true,
		});
		this.owners = ["552814506070507531", "838620835282812969"]; // Mori Delta & Lorenz
	}

	async start(token) {
		try {
			this.logger.info(`[API]: Logging..`);
			this.login(token);
			this.logger.info(`[API]: Logged In!`);
		} catch (error) {
			this.logger.fatal(`[ERROR]: An Invalid Token was provided`);
			process.exit(1);
		}
	}
};
