import Path from 'path';
import FS from 'fs/promises';
import Client from '../Structures/Client';
import BaseEvent from '../Structures/EventClass';

export default class EventClass {
	private client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	async build(dir: string): Promise<void> {
		const filePath = Path.join(__dirname, dir);

		const files = await FS.readdir(filePath);

		for (const file of files) {
			const stat = await FS.lstat(Path.join(filePath, file));
			if (stat.isDirectory()) await this.build(Path.join(dir, file));
			if (file.endsWith('.ts')) {
				const Event = (await import(Path.join(filePath, file))).default;
				if (Event.prototype instanceof BaseEvent) {
					const event = new Event(this.client);
					this.client?.events?.set(event.name, event);
					this.client?.on(event.name, event.run.bind(event));
				}
			}
		}
	}
}
