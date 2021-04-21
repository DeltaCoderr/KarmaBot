const Discord = require('discord.js');
const config = require('../../configs/config.json');


module.exports = {
    config: {
        name: 'say',
        description: 'Says your message through bot',
        aliases: [""],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
    
        if(!args[0]) return message.channel.send('Please provide some text');
        let msg;
        let textChannel = message.mentions.channels.first()
        message.delete()

        if(textChannel) {
            msg = args.slice(1).join(" ");
            textChannel.send(msg)
        } else {
            msg = args.join(" ");
            message.channel.send(msg)
        }
    }
}
