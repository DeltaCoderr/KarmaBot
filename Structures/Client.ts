import Mongoose from 'mongoose';
import Discord from 'discord.js';
import EventHandler from '../Handlers/Event';
import BaseEvent from '../Structures/EventClass';
import BaseCommand from '../Structures/CommandClass';

declare module 'discord.js' {
	interface Client {
		events: Discord.Collection<string, BaseEvent>;
		commands: Discord.Collection<string, BaseCommand>;
	}
}

export default class BotClient extends Discord.Client {
	constructor() {
		const clientOptions: Discord.ClientOptions = {
			intents: [Discord.GatewayIntentBits.Guilds],
		};

		super(clientOptions);

		this.events = new Discord.Collection();
		this.commands = new Discord.Collection();

		new EventHandler(this).build('../Events');
	}

	async login(): Promise<string> {
		try {
			await Mongoose.connect(process.env.MONGO_URI || '');
			console.log('MongoDB Connected.');
		} catch (err) {
			console.log(err);
		}

		return super.login(process.env.TOKEN);
	}
}
