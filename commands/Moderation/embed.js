const Discord = require('discord.js');
const config = require('../../configs/config.json');


module.exports = {
    config: {
        name: 'embed',
        description: 'Says your message through bot',
        aliases: [""],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
      if (!message.member.hasPermission(["ADMINISTRATOR"]))
      return message.channel.send(
        "You Don't Have Proper Permissions To Use This Command!"
      );
        message.delete()

        const word = args.join(" ")
        if (word < 1) return message.channel.send({embed:{
          color:'RANDOM',
          description:"Didn't provide any text to announce"}})
        const embed = new Discord.MessageEmbed()
          .setDescription(word)
          .setColor(config.embedcolor);
        message.channel.send({embed});
      }
    }
