module.exports = async (client, message) => {
  const snipeData = {
    content: message.content,
    author: message.author.tag,
    authorimg: message.author.displayAvatarURL({ dynamic: true }),
    image: message.attachments.first()?.proxyURL || null,
  };

  client.snipes.set(message.channel.id, snipeData);
};
