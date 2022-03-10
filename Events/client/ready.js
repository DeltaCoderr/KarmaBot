const Listener = require("../../Client/Listener");

module.exports = new Listener("ready", async (client) => {
	console.log(`[✨] ${client.user.username} online`);
	await client.initInteractions(
		client.guilds.cache.get(client.config.main.guild)
	);
});
