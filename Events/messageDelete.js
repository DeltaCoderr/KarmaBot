const Listener = require("../Structures/Listener");

module.exports = new Listener("messageDelete", (client, message) => {
	client.snipes.set(message.channelId, {
		content: message.content, // string
		images: message.attachments.map((img) => img.proxyURL), // array
		author: message.author,
		timestamp: Date.now(),
		embeds: message.embeds ? message.embeds.map((e) => e.toJSON()) : [{}], // array
	});
});
