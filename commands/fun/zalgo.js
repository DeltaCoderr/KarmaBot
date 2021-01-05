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
     .setFooter('© Sakura ', 'https://cdn.discordapp.com/avatars/739817077573025892/cb1e8de0cafdc718c0b40181cd1cdd6d.png?size=1024')
    message.channel.send(embed)
    }
}

