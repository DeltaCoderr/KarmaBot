const Listener = require("../../Client/Listener");

module.exports = new Listener("ready", async (client) => {
	logger_success(`[✨] ${client.user.username} ONLINE`)
	await client.initInteractions(
		client.guilds.cache.get(client.config.main.guild)
	);
});
