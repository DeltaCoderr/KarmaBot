const Discord = require('discord.js');
const config = require('../../configs/config.json');
const canvacord = require('canvacord')

module.exports = {
    config: {
        name: 'comment',
        description: 'Shows your text as a Youtube Comment',
        aliases: ["comment"],
        usage: '<text>',
        accessableby: "",
    },
    run: async (client, message, args) => {
    try {
      if(args[0]) return message.channel.send(`${client.emote.error} Provide something to comment`)
        let yt = await canvacord.Canvas.youtube({"avatar":message.author.displayAvatarURL({format: "png"}),"username":message.author.username, "content":args.join(" ")})
        let attachment = new Discord.MessageAttachment(yt, 'comment.png')
        message.channel.send(attachment)
    }catch(err) {
        const embed2 = new Discord.MessageEmbed()
    .setTitle(`${client.emote.error} Something went wrong.\n${client.emote.error}Note : It won't work if the User contains Unwanted characters in his Username.`)
    .setColor(config.embedcolor)
    message.channel.send(embed2)
    }

    }
}

