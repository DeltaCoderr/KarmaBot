

module.exports = {
<<<<<<< Updated upstream:Commands/Owner/reload.js
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
=======
    help: {
        name: 'reload',
        aliases: ['reload'],
        description: 'Reloads the Command.',
        category:  __dirname.split("Commands\\")[1]
    },
    run: async(client, message, args) => {

        if(config.devs !== message.author.id)  return message.channel.send('Only the Developer can use this command.');

        let cmdfolder = args[0];
        if(!cmdfolder) return message.channel.send('❌ | Provide a command Folder!');

        let command = args[1];
        if(!command) return message.channel.send('❌ | Provide a command!');

        try {
            require(`../${cmdfolder}/${command}`);
        } catch(e) {
            return message.channel.send('❌ | No command with that name found.');
        }

        delete require.cache[require.resolve(`../${cmdfolder}/${command}`)];
        let pull = require(`../${cmdfolder}/${command}`);
        client.commands.set(pull.help.name, pull);
        logger.success(`Reload the Command!`);
        return message.channel.send('✅ Done');
    }
}
>>>>>>> Stashed changes:old/Commands/Owner/reload.js
