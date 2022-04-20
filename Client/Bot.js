require('dotenv').config()
require("../Utils/Global")
const Discord = require("discord.js"),
	fs = require("fs"),
	Listener = require("./Listener"),
	{ REST } = require("@discordjs/rest"),
	{ Routes } = require("discord-api-types/v9");

class Bot extends Discord.Client {
	constructor() {
		super({ intents: 32767 });

		this.commands = new Discord.Collection();
		this.interactions = new Discord.Collection();
		this.aliases = new Discord.Collection();
		this.config = {
			main: require("../Configs/config"),
			emotes: require("../Configs/emotes"),
			filters: require("../Configs/filters"),
		};
		this.utils = require("../Utils/Functions");
	}
	start(token) {
		if (!token) return logger_error('Invalid/No Token Provided')
		this.initCommands();
		// this.initInteractions(); // Moved to `ready.js`
		this.initEvents();
		this.login(token);
	}

	initCommands() {
		let counter = 0;
		const subFolder = fs.readdirSync("Commands");
		for (const category of subFolder) {
			const commandsFiles = fs.readdirSync(`Commands/${category}`);
			for (const commandFile of commandsFiles) {
				const command = require(`../Commands/${category}/${commandFile}`);

				if (command.run && typeof command.run === "function") {
					this.commands.set(command.name, command);
				}
				counter++;
			}
		}
		logger_success(`[Commands Loaded]: ${counter}`)
	}

	initEvents() {
		let counter = 0;
		const subFolder = fs.readdirSync("Events");
		for (const category of subFolder) {
			const eventsFiles = fs
				.readdirSync(`Events/${category}`)
				.filter((f) => f.endsWith(".js"));
			for (const eventFile of eventsFiles) {
				const event = require(`../Events/${category}/${eventFile}`);
				/**
				 * @type {Listener}
				 */
				this.on(event.event, event.run.bind(null, this));

				counter++;
			}
		}
		logger_success(`[Events Loaded]: ${counter}`)
	}

	async initInteractions(guild) {
		let counter = 0;
		let commands = [];
		const subFolder = fs.readdirSync("Commands");
		for (const category of subFolder) {
			const commandsFiles = fs.readdirSync(`Commands/${category}`);
			for (const commandFile of commandsFiles) {
				const command = require(`../commands/${category}/${commandFile}`);

				if (command.exec) {
					this.interactions.set(command.name, command);
					commands.push(this.build(command));
				}
				counter++;
			}
		}
		logger_success(`[Interactions Loaded]: ${counter}`)
		const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

		try {
			logger_log(`Started refreshing application (/) commands.`)

			await rest.put(Routes.applicationGuildCommands(this.user.id, guild.id), {
				body: commands,
			});

			logger_log(`Successfully reloaded application (/) commands.`)
		} catch (error) {
			logger_error(error);
		}
	}

	 build(command) {
		return {
			name: command.name,
			description: command.description,
			options: command.slashOptions ?? [],
			defaultPermissions: true,
		};
	}
}

module.exports = Bot;
