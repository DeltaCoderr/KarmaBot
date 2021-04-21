const Discord = require('discord.js');
const config = require('../../configs/config.json');


module.exports = {
    config: {
        name: 'customembed',
        description: 'Says your message through bot',
        aliases: ["ce", "cembed"],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
      if (!message.guild.me.hasPermission(["ADMINISTRATOR"]))
      return message.channel.send(
        "I Don't Have Proper Permissions To Use This Command! \`${config.prefix}cembed <hex color> <title> <embed message>\`"
      );
        message.delete()

        const color = args[0]
        const title = args[1]
    const saymessage = args.slice(2).join(" ")
    
    if (color > 0) return message.channel.send({embed:{
          color: config.embedcolor,
          description:"Provide Hex Code for embed Color. \`${config.prefix}cembed <hex color> <title> <embed message>\`"}})

    if (title > 1) return message.channel.send({embed:{
          color: config.embedcolor,
          description:"Provide Title for embed. \`${config.prefix}cembed <hex color> <title> <embed message>\`"}})

    if (saymessage > 2) return message.channel.send({embed:{
          color: config.embedcolor,
          description:"Provide Message for Embed. \`${config.prefix}cembed <hex color> <title> <embed message>\`"}})

    const embed = new Discord.MessageEmbed()


    .setTitle(title)

    .setDescription(saymessage)

    .setColor(color)

    .setThumbnail(message.guild.iconURL())

    .setFooter(message.author.tag, message.author.displayAvatarURL())
    .setTimestamp();

    return message.channel.send(embed);
      }
    }
