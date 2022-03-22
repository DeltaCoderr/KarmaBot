const Listener = require("../Structures/Listener");

module.exports = new Listener("ready", async (client) => {
	client.logger.info(`[API]: Logged in as ${client.user.tag}`);
	await client.register();
});
