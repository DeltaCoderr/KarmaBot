

module.exports = {
	help: {
		name: 'reload',
		aliases: [],
		description: 'Reloads the Command.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		if (config.devs !== message.author.id) return;

		const command = args[0];
		if (!command) return message.reply('❌ | Provide a command!');

		const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

		if (!cmd) return message.reply('❌ | Invalid command!');

		try {
			delete require.cache[
				require.resolve(`../${cmd.help.category}/${cmd.help.name}.js`)
			];
			const newCmd = require(`../${cmd.help.category}/${cmd.help.name}.js`);
			client.commands.set(newCmd.help.name, newCmd);
			message.reply(`✅ | Reloaded ${cmd.help.name}!`);
		} catch (e) {
			console.log(e);
			message.reply(`❌ | Failed to reload ${cmd.help.name}!`);
		}
	},
};
