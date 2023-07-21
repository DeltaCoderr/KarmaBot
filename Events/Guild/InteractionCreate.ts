import Discord from 'discord.js';
import Client from '../../Structures/Client';
import BaseEvent from '../../Structures/EventClass';

export default class InteractionCreate extends BaseEvent {
	constructor(client: Client) {
		super(client, {
			name: 'interactionCreate',
		});
	}

	async run(interaction: Discord.CommandInteraction): Promise<void> {
		if (interaction.type === Discord.InteractionType.ApplicationCommand) {
			const command = this.client?.commands?.get(interaction.commandName);

			if (!command) return;

			try {
				if (!command.isModal) {
					await interaction.deferReply().catch(console.error);
				}
				command.run(interaction, this.client);
			} catch (e) {
				console.log(e);
			}
		}
	}
}
