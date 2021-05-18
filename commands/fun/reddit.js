const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const config = require('../../configs/config.json');

module.exports = {
    config: {
        name: 'reddit',
        description: 'Shows pic from Reddit',
        aliases: ["reddit"],
        usage: '<subreddit>',
        accessableby: "",
    },
    run: async (client, message, args) => {
    message.channel.send("This command is locked for now.")
    }
}
