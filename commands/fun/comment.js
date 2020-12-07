const Discord = require('discord.js');
const config = require('../../configs/config.json');
//const Canvas = require('canvas')

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
    const canvas = Canvas.createCanvas(550, 110);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage(`https://some-random-api.ml/canvas/youtube-comment?username=${message.author.username}&comment=${args}&avatar=${message.author.avatarURL()}&dark=true`);
	
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'comment.png');
  
   message.channel.send(attachment)
    }catch(err) {
        const embed2 = new Discord.MessageEmbed()
    .setTitle(`${client.emote.error} Something went wrong.\n${client.emote.error}Note : It won't work if the User contains Unwanted characters in his Username.`)
    .setColor(config.embedcolor)
    message.channel.send(embed2)
    }

    }
}

