const fs = require('fs');

module.exports = {
	LoadCommands: async function(client) {
		fs.readdirSync(`${__dirname}/../Commands`).forEach((dir) => {
			const commands = fs.readdirSync(`${__dirname}/../Commands/${dir}`);
			commands.forEach((file) => {
				const pull = require(`${__dirname}/../Commands/${dir}/${file}`);
				if (pull.help.name) {
					client.commands.set(pull.help.name, pull);
					pull.help.aliases.forEach((alias) => {
						client.aliases.set(alias, pull.help.name);
					});
				}
			});
		});
		console.log(`Successfully loaded ${client.commands.size} commands.`);
	},
	LoadEvents: async function(client) {
		fs.readdir(`${__dirname}/../Events`, async (err, files) => {
			if (err) {
				return console.log(
					`An Error Occcured While Loading Events. ${err.stack}`,
				);
			}
			for (let i = 0; i < files.length; i++) {
				const event = require(`../Events/${files[i]}`);
				const eventName = files[i].split('.')[0];
				client.on(eventName, event.bind(null, client));
			}
			console.log(`Successfully loaded ${files.length} events.`);
		});
	},
};
