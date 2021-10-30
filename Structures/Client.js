const Discord = require('discord.js');
const Loader = require('../Base/Loader');

require('../Utils/Global')
require('../Utils/Logger')

class Karma extends Discord.Client {
	constructor() {
		super({
			intents: [
				Discord.Intents.FLAGS.GUILDS,
				Discord.Intents.FLAGS.GUILD_MEMBERS,
				Discord.Intents.FLAGS.GUILD_MESSAGES,
				Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
			],
		});
	}

	start() {
		this.config = require('../Configs/config');

		if (!this.config.token) {
			return console.log('No token found!');
		}

		if (!this.config.devs) {
			return console.log('No devs found!');
		}

		if (!this.config.MongoURI) {
			return console.log('No MongoURI found!');
		}

		if (!this.config.prefix) {
			return console.log('No prefix found!');
		}

		if (!this.config.embedColor) {
			return console.log('No embedColor found!');
		}

		if (!this.config.AME_API) {
			return console.log('No AME_API found!');
		}

		this.commands = new Discord.Collection();

		this.aliases = new Discord.Collection();

		Loader.LoadCommands(this);

		Loader.LoadEvents(this);

		this.login(this.config.token).catch((e) => {
			console.log(e);
			console.log('Failed to login!');
		});
	}
}

module.exports.Karma = Karma;
