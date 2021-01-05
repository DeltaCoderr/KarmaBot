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
        .setFooter(`© Sakura `, "https://cdn.discordapp.com/avatars/739817077573025892/cb1e8de0cafdc718c0b40181cd1cdd6d.png?size=1024")
        message.channel.send({embed})

    }
}

