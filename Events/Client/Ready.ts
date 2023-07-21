import Client from '../../Structures/Client';
import Event from '../../Structures/EventClass';
import CommandHandler from '../../Handlers/Command';

export default class ReadyEvent extends Event {
	constructor(client: Client) {
		super(client, {
			name: 'ready',
		});
	}

	async run(): Promise<void> {
		try {
			const commandHandler = new CommandHandler(this.client);
			await commandHandler.build('../Commands');
			console.log('Slash commands loaded.');

			console.log(`${this.client?.user?.tag} is online.`);
		} catch (err) {
			console.error('Error in ready event:', err);
		}
	}
}
