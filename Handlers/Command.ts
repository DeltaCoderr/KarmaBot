import Path from 'path';
import FS from 'fs/promises';
import Client from '../Structures/Client';
import BaseCommand from '../Structures/CommandClass';

export default class CommandClass {
	private client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	async build(dir: string): Promise<void> {
		try {
			const filePath = Path.join(__dirname, dir);
			const files = await FS.readdir(filePath);

			for (const file of files) {
				const fileFullPath = Path.join(filePath, file);
				const stat = await FS.lstat(fileFullPath);

				if (stat.isDirectory()) {
					await this.build(Path.join(dir, file));
				} else if (file.endsWith('.ts')) {
					const Command = (await import(fileFullPath)).default;
					if (Command.prototype instanceof BaseCommand) {
						const cmd = new Command(this.client);
						this.client?.commands?.set(cmd.name, cmd);
						if (process.env.PRODUCTION === 'false' && process.env.GUILD_ID) {
							await this.client?.guilds?.cache
								?.get(process.env.GUILD_ID || '')
								?.commands.create(cmd);
						} else {
							await this.client?.application?.commands.create(cmd);
						}
					}
				}
			}
		} catch (e) {
			console.error(e);
		}
	}
}
