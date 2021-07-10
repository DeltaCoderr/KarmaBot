const { Message } = require('discord.js');
const { Bot } = require('../Structures/Client');

/**
 * @param { Bot } client
 * @param { Message } message
 */

module.exports = async (client, message) => {

    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author.tag,
        authorimg: message.author.avatarURL({ dynamic: true }),
        image: message.attachments.first() ? message.attachments.first().proxyURL : null,
        channelname: message.channel.name,
        messageid: message.id,
        channelid: message.channel.id
    })
}