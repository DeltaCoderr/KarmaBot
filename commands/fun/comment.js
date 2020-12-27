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
        const comment = args.join('');
        if(!comment) return message.channel.send(`${client.emotes.error} Provide something to Comment!`)
        try {    
        let yt = await canvacord.Canvas.youtube({"avatar":message.author.displayAvatarURL({format: "png"}),"username":message.author.username, "content":args.join(" ")})
        let attachment = new Discord.MessageAttachment(yt, 'comment.png')
        message.channel.send(attachment)
    }catch(err) {
        const embed2 = new Discord.MessageEmbed()
    .setTitle(`${client.emotes.error} Something went wrong.\n${client.emotes.error}Note : It won't work if the User contains Unwanted characters in his Username.`)
    .setColor(config.embedcolor)
    message.channel.send(embed2)
    }

    }
}

