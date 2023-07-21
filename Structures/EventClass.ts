import Client from '../Structures/Client';

interface EventOptions {
	name: string;
}

export default abstract class Event {
	name?: string;
	client: Client;

	constructor(client: Client, meta: EventOptions) {
		this.client = client;
		this.name = meta.name;
	}

	abstract run(...args: unknown[]): Promise<void>;
}
