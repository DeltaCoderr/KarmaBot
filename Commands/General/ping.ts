import Discord from 'discord.js';
import Client from '../../Structures/Client';
import BaseCommand from '../../Structures/CommandClass';

export default class Ping extends BaseCommand {
	constructor(client: Client) {
		super(client, {
			name: 'ping',
			isModal: false,
			category: 'General',
			type: Discord.ApplicationCommandType.ChatInput,
			description: 'Ping command. Get a pong response!',
		});
	}

	async run(interaction: Discord.CommandInteraction): Promise<void> {
		await interaction.editReply('Pong!');
	}
}
