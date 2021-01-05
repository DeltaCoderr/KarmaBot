const Discord = require('discord.js');
const config = require('../../configs/config.json');
const db = require('quick.db')

module.exports = {
    config: {
        name: 'chatbot',
        description: 'Shows ChatBot\'s config',
        aliases: ["chatbot"],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
      
        const embedd = new Discord.MessageEmbed()
        .setThumbnail(client.user.avatarURL())
        .setDescription(
          `**👋 Hey!\n Type \`${config.prefix}setchatbotchannel\` - To Set a Channel \n Type \`${config.prefix}disablechatbotchannel\` - To Disable a Channel.**\n **ChatBot Channel Set - None.** `
        )
       .addField(
          "Support Link: ",
          `**[Click Here!](https://discord.gg/CJ9y9We5)**`,
          true
        )
        .setTimestamp()
        .setFooter(
          "© Sakura",
          "https://cdn.discordapp.com/avatars/739817077573025892/cb1e8de0cafdc718c0b40181cd1cdd6d.png?size=1024"
        )
        .setColor(config.embedcolor);
      
       let channel1 = db.fetch(`chatbot_${message.guild.id}`);
      if(!channel1) return message.channel.send(embedd)
      var sChannel = message.guild.channels.cache.get(channel1);
      let embedvch = "<#" + sChannel.id + ">"
      
      const embed = new Discord.MessageEmbed()
      
        .setThumbnail(client.user.avatarURL())
        .setDescription(
          `**Sakura Bot Project** \n\n**👋 Hey!\n Type \`${config.prefix}setchatbotchannel\` - To Set a Channel \n Type \`${config.prefix}disablechatbotchannel\` - To Disable a Channel.**\n **ChatBot Channel Set as - ${embedvch}**` 
        )
       .addField(
          "Support Link: ",
          `**[Click Here!](https://discord.gg/CJ9y9We5)**`,
          true
        )
        .setTimestamp()
        .setFooter(
          "© Sakura",
          "https://cdn.discordapp.com/avatars/739817077573025892/cb1e8de0cafdc718c0b40181cd1cdd6d.png?size=1024"
        )
        .setColor(config.embedcolor);
      message.channel.send(embed);
    }
}