const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const config = require('../../configs/config.json');
const Zalgo = require('to-zalgo')

module.exports = {
    config: {
        name: 'zalgo',
        description: 'Converts your text to Zalgo',
        aliases: ["zalgo"],
        usage: '<text>',
        accessableby: "",
    },
    run: async (client, message, args) => {
    
        const embed = new MessageEmbed()
     .setColor(config.embedcolor)
     .setDescription(`${Zalgo(args.join(" "))}`)
     .setTimestamp()
     .setFooter('© Sakura ', 'https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png')
    message.channel.send(embed)
    }
}

