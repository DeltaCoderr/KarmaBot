const Discord = require('discord.js');
const config = require('../../configs/config.json');
const db = require('quick.db')
const moment = require("moment")
require('moment-duration-format')


module.exports = {
    config: {
        name: 'profile',
        description: 'Shows information about user',
        aliases: ["whois", "userinfo"],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
        
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        let durumm;
        let durum = user.presence.status
        
        let roles = user.roles.cache.map(x => x).filter(z => z.name !== "@everyone")
        let messagecount = await db.get(`${message.guild.id}.${user.id}.messageCount`)
        
        if(!messagecount) messagecount = 0
        
        if(roles.length > 100) {
          roles = "There is so much roles to show."
        }
        
        let safe = message.author.createdTimestamp
        
        if(safe > 604800017) {
          safe = "`Reliable` <:discordinvisible:795845911280484394>"
        } else {
          safe = "`Suspicious` <:dnd:795846661100273674>"
        }
        
      /*  let a = {
          "DISCORD_PARTNER": "<:partner_badge:736568773858951236>",
          "HYPESQUAD_EVENTS": "<:hypesquad_badge:736568773795905616>",
          "BUGHUNTER_LEVEL_1": "<:bug_hunter_badge:736568773963939900>  Bug Hunter Level 1",
          "HOUSE_BRAVERY": "<:bravery_badge:736568773699698708> HypeSquad Bravery",
          "HOUSE_BRILLIANCE": "<:brilliance_badge:736568773993037844> HypeSquad Brilliance",
          "HOUSE_BALANCE": "<:balance_badge:736568773070422068> HypeSquad Balance",
          "EARLY_SUPPORTER": "<:early_supporter_badge:736568773854756945> Early Supporter",
          "BUGHUNTER_LEVEL_2": "Discord Bug Hunter Level 2",
          "VERIFIED_DEVELOPER": "<:developer:718560145617190912> Discord Verified Bot Developer",
          "VERIFIED_BOT": "Verified Bot",
        }*/
        
          if(durum === "online") durumm = `Online <:discordinvisible:795845911280484394> `
          if(durum === "offline") durumm = `Offline <:offline:795846188901203978> `
          if(durum === "idle") durumm = `Idle <:idle:795846446262779934>`
          if(durum === "dnd") durumm = `Do not disturb <:dnd:795846661100273674>  `
          
          let lastMessage
          let lastMessageTime
          let nitroBadge = user.user.avatarURL({dynamic: true})
          let flags = user.user.flags.toArray().join(``)
          
          if(!flags) {
            flags = "User doesn't have any badge"
          }
        
         flags = flags.replace("HOUSE_BRAVERY", "• <:hsquadbravery:795840506051428412>\`HypeSquad Bravery\`")
         flags = flags.replace("EARLY_SUPPORTER","• <:nitro:795842046223974460> \`Early Supporter\`")
         flags = flags.replace("VERIFIED_DEVELOPER","• <:discordbotdev:795838320986554399> \`Verified Bot Developer\`")
         flags = flags.replace("EARLY_VERIFIED_DEVELOPER","• <:discordbotdev:795838320986554399> \`Verified Bot Developer\`")
         flags = flags.replace("HOUSE_BRILLIANCE","• <:hsquadbrilliance:795840396492013568> \`HypeSquad Brilliance\`")
         flags = flags.replace("HOUSE_BALANCE","• <:hsquadbalance:795840435133218863>\`HypeSquad Balance\`")
         flags = flags.replace("DISCORD_PARTNER","• <:partner:739714991732686848> \`Partner\`")
         flags = flags.replace("HYPESQUAD_EVENTS","• <a:hypesquad:755471122430034060>\`Hypesquad Event\`")
         flags = flags.replace("DISCORD_CLASSIC","• <:classic:795843165709533225>\`Discord Classic\`")
      
          if(nitroBadge.includes("gif")) {
           flags = flags + `
      • <:nitroboost:795843880515797023>  \`Nitro\``
          }
          
          let voice = db.get(`${message.guild.id}.${user.user.id}.voicetime`)
          let stat =  user.presence.activities[0]
          let custom
          
        if(user.presence.activities.some(r => r.name === "Spotify")) {
           custom = "Listening to Spotify"
         } else if(stat && stat.name !== "Custom Status") {
           custom = stat.name
         } else {
           custom = "Nothing"
         }
      
          if(user.presence.activities.some(r => r.name !== "Spotify") && stat && stat.state !== null) {
            stat = stat.state
          } else {
            stat = "Nothing"
          }
         
          
          if(!voice) {
            voice = "0 hours, 0 minutes and 0 seconds"
          } else {
            voice = moment.duration(voice).format("h [ hours,] m [ minutes and] s[ seconds]")
          }
      
         if(user.lastMessage) {
           lastMessage = user.lastMessage.content
           lastMessageTime = moment(user.lastMessage.createdTimestamp).format('MMMM Do YYYY, H:mm:ss a')
         } else {
           lastMessage = "None"
           lastMessageTime = "None"
         }
          
          const embeddd = new Discord.MessageEmbed()
          .setColor(config.embedcolor)
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`__**User Info**__
      **•** \`ID:\` **${user.id}**
      **•** \`Profile:\` **${user}**
      **•** \`Bot:\` **${user.user.bot ? 'Yes' : 'No'}**
      **•** \`Created At:\` **${moment(user.user.createdAt).format('MMMM Do YYYY, H:mm:ss a')}**
      __**Member Info**__
      **•** \`Nickname:\` **${user.displayName ? user.displayName : 'yok'} **
      **•** \`Joined At:\` **${moment(user.joinedAt).format('MMMM Do YYYY, H:mm:ss a')}**
      **•** \`Activity:\` **${custom}**
      __**Roles:**__
      ${roles}
      __**Messages Info**__
      **•** \`Last Message:\` **${lastMessage}**
      **•** \`Last Message At:\` **${lastMessageTime}**
      **•** \`Message's Count:\` **${messagecount}**
      __**Badge Information**__
      ${flags} 
      
      __**Safety Check**__
      • ${safe}`)
          .setThumbnail(user.user.avatarURL({dynamic: true}))
          .setTimestamp()
          .setFooter('© Sakura', 'https://cdn.discordapp.com/avatars/739817077573025892/cb1e8de0cafdc718c0b40181cd1cdd6d.png?size=1024')
      message.react ('755471130315194399')
          message.channel.send(embeddd)

    }
}
