const moment = require("moment");
const chalk = require("chalk");
const util = require("util");
const KarmaBot = require("../Structures/Client");

module.exports = class Logger {
	/**
	 * @param {KarmaBot} client
	 * @ignore
	 */
	constructor(client) {
		this.client = client;
	}
	log(content, { color = "grey", tag = "Log" } = {}) {
		this.write(content, { color, tag });
	}

	success(content, { color = "green", tag = "Success" } = {}) {
		this.write(content, { color, tag });
	}

	info(content, { color = "blue", tag = "Info" } = {}) {
		this.write(content, { color, tag });
	}

	warn(content, { color = "orange", tag = "Warn" } = {}) {
		this.write(content, { color, tag });
	}

	error(content, { color = "red", tag = "Error" } = {}) {
		this.write(content, { color, tag, error: true });
	}

	debug(content, { color = "yellow", tag = "Debug" } = {}) {
		this.write(content, { color, tag, error: true });
	}

	write(content, { color = "grey", tag = "Log", error = false } = {}) {
		const timestamp = chalk.cyan(
			`[${moment().format("DD-MM-YYYY kk:mm:ss")}]:`
		);
		const levelTag = chalk.bold(`[${tag}]`);
		const text = chalk[color](this.clean(content));
		const stream = error ? process.stderr : process.stdout;
		stream.write(`${timestamp} ${levelTag} ${text}\n`);
	}

	clean(item) {
		if (typeof item === "string") return item;
		const cleaned = util.inspect(item, { depth: Infinity });
		return cleaned;
	}
};
