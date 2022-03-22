const { Client, Collection } = require("discord.js");
const Logger = require("../Utils/Logger");
const Database = require("./Database");
const { readdirSync } = require("fs");
const Listener = require("./Listener");
const config = require("../Configs/config");

require("../Utils/Global");

class KarmaBot extends Client {
	constructor() {
		super({ intents: [], partials: [] });
		this.commands = new Collection();
		this.snipes = new Collection();
		this.logger = new Logger(this);
		this.mongoose = new Database(this);
		this.config = config;
	}

	init(token) {
		this.login(token).catch(() =>
			this.logger.error(`[X]: Invalid/No Token Provided`)
		);
		this.mongoose.init();
		this.loadCommands();
		this.loadEvents();
		// registeration moved to `Events/ready.js`
	}

	loadCommands() {
		const folders = readdirSync("Commands");
		for (const folder of folders) {
			const files = readdirSync(`Commands/${folder}`).filter((x) =>
				x.endsWith(".js")
			);

			for (const file of files) {
				const command = require(`${process.cwd()}/Commands/${folder}/${file}`);

				if (command.name) {
					this.commands.set(command.name, command);
				}
			}
		}
		this.logger.info(`[✅]: Commands: ${this.commands.size}`);
	}

	loadEvents() {
		const files = readdirSync("Events").filter((x) => x.endsWith(".js"));
		for (const file of files) {
			const event = require(`${process.cwd()}/Events/${file}`);
			/**
			 * @type {Listener}
			 */
			this.on(event.event, event.run.bind(null, this));
		}
	}

	async register() {
		try {
			const commands = this.commands
				.filter((x) => x.exec && typeof x.exec === "function")
				.map((c) => this.build(c));

			await this.application?.commands?.set(commands);
		} catch (error) {
			this.logger.error(
				`[💥]: Failed to register application commands: ${error}`
			);
		}
	}

	build(cmd) {
		return {
			name: cmd.name,
			description: cmd.description,
			defaultPermission: true,
			options: cmd.options ?? [],
		};
	}
}

module.exports = KarmaBot;
