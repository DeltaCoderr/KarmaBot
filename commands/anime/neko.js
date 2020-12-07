const Discord = require('discord.js');
const config = require('../../configs/config.json');
const superagent = require('superagent')

module.exports = {
    config: {
        name: 'neko',
        description: 'Drops Random Neko Pictures',
        aliases: ["neko"],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
        if(!message.channel.nsfw) return message.channel.send("This Commmand is only usable in NSFW channels.")
        
        const { body } = await superagent
        .get("https://nekos.life/api/neko");
       const  link = body.neko;
        
        const embed = new Discord.MessageEmbed()
        .setColor(config.embedcolor)
        .setTitle("Here's Your Neko ")
        .setImage(body.neko)
         .setTimestamp()
        .setFooter(`© Karma `, "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")
        message.channel.send({embed})

    }
}

