const Discord = require('discord.js');
const config = require('../../configs/config.json');
const distube = require('../../alpha.js');
const { MessageEmbed } = require("discord.js");
const db = require("quick.db")

module.exports = {
    config: {
        name: '247',
        description: '',
        aliases: ["join", "enable", "24/7"],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
      if (!message.member.hasPermission(["ADMINISTRATOR"]))
      return message.channel.send(
        "You Don't Have Proper Permissions To Use This Command!"
      );


      if(message.guild.me.voice.channel) return message.reply({embed:{
        color: config.embedcolor,
        description:`\`24/7 Is Already Activated To Disable Use \`${config.prefix}leavevc\``
        }})
        

        let prefix = db.get(`prefix${message.guild.id}`)
        if(prefix == null) prefix = config.prefix
       if(!message.member.voice.channel) return message.channel.send({embed:{
         color: config.embedcolor,
         description: "Please Join A Voice Channel Where You Want Me To Be 24/7"}})
       let uni = message.member.voice.channel;
       await uni.join().then(connection => {
              connection.voice.setSelfDeaf(true);
              message.reply("Thank you for Enabling Karma 24/7.", {
 tts: true
})
          
         });
       message.channel.send({embed:{
         color: config.embedcolor,
         description:`Now I Am 24/7 On **` + uni.name + `**, To Disable Type \`${config.prefix}leavevc\`.`
       }})

        }
    }


    console.log("Join working")
