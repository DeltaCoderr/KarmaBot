const KarmaBot = require("./Client");
const mongoose = require("mongoose");

class Database {
	/**
	 * @param {KarmaBot} client
	 */
	constructor(client) {
		this.client = client;
	}

	init(uri) {
		mongoose
			.connect(uri, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() =>
				this.client.logger.info(`[✖️] Database Connected: ${ping} ms.`)
			);
	}

	get ping() {
		mongoose.connection.db
			.admin()
			.ping()
			.then((val) => {
				return Number(val).toFixed(2);
			});
	}
}

module.exports = Database;
