const canvacord = require('canvacord');
const { MessageAttachment } = require('discord.js');

module.exports = {
    help: {
        name: 'comment',
        aliases: ['comment'],
        description: 'Shows your text as a Youtube Comment.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        const comment = args.join('');
        if (!comment) return message.channel.send(`${emotes.error} Provide something to Comment!`)
        try {
            let yt = await canvacord.Canvas.youtube({ "avatar": message.author.displayAvatarURL({ format: "png" }), "username": message.author.username, "content": args.join(" ") })
            let attachment = new MessageAttachment(yt, 'comment.png')
            message.channel.send(attachment)
        } catch (err) {
            const embed2 = new MessageEmbed()
                .setTitle(`${emotes.error} Something went wrong.\n${emotes.error}Note : It won't work if the User contains Unwanted characters in his Username.`)
                .setColor(config.embedcolor)
            message.channel.send(embed2)
        }

    }
}