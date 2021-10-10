module.exports = async (client, message) => {
	client.snipes.set(message.channel.id, {
		content: message.content,
		author: message.author.tag,
		authorimg: message.author.avatarURL({ dynamic: true }),
		image: message.attachments.first()
			? message.attachments.first().proxyURL
			: null,
	});
};
