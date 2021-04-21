const Discord = require('discord.js');
const config = require('../../configs/config.json');
const db = require("quick.db")

module.exports = {
    config: {
        name: 'disable',
        description: '',
        aliases: ["leavevc"],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
      if (!message.member.hasPermission(["ADMINISTRATOR"]))
      return message.channel.send(
        "You Don't Have Proper Permissions To Use This Command!"
      );
      if(!message.member.voice.channel) return message.channel.send({embed:{
         color: config.embedcolor,
         description: "Please Join the Voice Channel Where I am 24/7 Enabled"}})
        let guild = message.guild;
        let vc = await db.fetch(`channelvc_${message.guild.id}`)
        let uni = message.member.voice.channel;

        message.channel.send(`I'll leave ${uni.name} in a while.`)
        db.delete(`channelvc_${message.guild.id}`)
        message.channel.send({embed:{
           color: config.embedcolor,
           description:`If You Wanna Active 24/7 Again Use \`${config.prefix}join\``
           }});
        guild.me.voice.channel.leave()

         
        
        
      }
    }
