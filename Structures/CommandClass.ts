import Client from '../Structures/Client';

interface CommandOptions {
	name: string;
	type: number;
	isModal: boolean;
	category: string;
	options?: unknown[];
	description: string;
}

export default abstract class Command {
	public name: string;
	public type: number;
	public client: Client;
	public isModal: boolean;
	public options: unknown[];
	public category: string | null;
	public description: string | null;

	constructor(client: Client, meta: CommandOptions) {
		this.client = client;
		this.name = meta.name;
		this.type = meta.type;
		this.options = meta.options || [];
		this.isModal = meta.isModal || false;
		this.category = meta.category || null;
		this.description = meta.description || null;
	}

	abstract run(...args: unknown[]): Promise<void>;
}
