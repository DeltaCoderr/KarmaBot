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
        usage: '',const Discord = require('discord.js');
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
          safe = "``Reliable`` <:discordinvisible:757485982227365939>"
        } else {
          safe = "``Suspicious`` <:discorddnd:757485967266545704>"
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
        
          if(durum === "online") durumm = `Online <:discordinvisible:757485982227365939> `
          if(durum === "offline") durumm = `Offline <:discordoffline:757485996999966801> `
          if(durum === "idle") durumm = `Idle <:discordidle:757483463501676614>`
          if(durum === "dnd") durumm = `Do not disturb <:discorddnd:757485967266545704>  `
          
          let lastMessage
          let lastMessageTime
          let nitroBadge = user.user.avatarURL({dynamic: true})
          let flags = user.user.flags.toArray().join(``)
          
          if(!flags) {
            flags = "User doesn't have any badge"
          }
        
         flags = flags.replace("HOUSE_BRAVERY", "• <:hsquadbravery:757488491792826410>\`HypeSquad Bravery\`")
         flags = flags.replace("EARLY_SUPPORTER","• <a:nitro:740923343548579890> \`Early Supporter\`")
         flags = flags.replace("VERIFIED_DEVELOPER","• <:discordbotdev:757489652214267904> \`Verified Bot Developer\`")
         flags = flags.replace("EARLY_VERIFIED_DEVELOPER","• <:discordbotdev:757489652214267904> \`Verified Bot Developer\`")
         flags = flags.replace("HOUSE_BRILLIANCE","• <:hsquadbrilliance:757487710775672863> \`HypeSquad Brilliance\`")
         flags = flags.replace("HOUSE_BALANCE","• <:hsquadbalance:757487549605347348>\`HypeSquad Balance\`")
         flags = flags.replace("DISCORD_PARTNER","• <:partner:739714991732686848> \`Partner\`")
         flags = flags.replace("HYPESQUAD_EVENTS","• <a:hypesquad:755471122430034060>\`Hypesquad Event\`")
         flags = flags.replace("DISCORD_CLASSIC","• <a:classic:740922817683652754>\`Discord Classic\`")
      
          if(nitroBadge.includes("gif")) {
           flags = flags + `
      • <a:nitroboost:740923077973508156>  \`Nitro\``
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
          .setFooter('© Karma', 'https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png')
      message.react ('755471130315194399')
          message.channel.send(embeddd)

    }
}

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
          safe = "``Reliable`` <:discordinvisible:757485982227365939>"
        } else {
          safe = "``Suspicious`` <:discorddnd:757485967266545704>"
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
        
          if(durum === "online") durumm = `Online <:discordinvisible:757485982227365939> `
          if(durum === "offline") durumm = `Offline <:discordoffline:757485996999966801> `
          if(durum === "idle") durumm = `Idle <:discordidle:757483463501676614>`
          if(durum === "dnd") durumm = `Do not disturb <:discorddnd:757485967266545704>  `
          
          let lastMessage
          let lastMessageTime
          let nitroBadge = user.user.avatarURL({dynamic: true})
          let flags = user.user.flags.toArray().join(``)
          
          if(!flags) {
            flags = "User doesn't have any badge"
          }
        
         flags = flags.replace("HOUSE_BRAVERY", "• <:hsquadbravery:757488491792826410>\`HypeSquad Bravery\`")
         flags = flags.replace("EARLY_SUPPORTER","• <a:nitro:740923343548579890> \`Early Supporter\`")
         flags = flags.replace("VERIFIED_DEVELOPER","• <:discordbotdev:757489652214267904> \`Verified Bot Developer\`")
         flags = flags.replace("EARLY_VERIFIED_DEVELOPER","• <:discordbotdev:757489652214267904> \`Verified Bot Developer\`")
         flags = flags.replace("HOUSE_BRILLIANCE","• <:hsquadbrilliance:757487710775672863> \`HypeSquad Brilliance\`")
         flags = flags.replace("HOUSE_BALANCE","• <:hsquadbalance:757487549605347348>\`HypeSquad Balance\`")
         flags = flags.replace("DISCORD_PARTNER","• <:partner:739714991732686848> \`Partner\`")
         flags = flags.replace("HYPESQUAD_EVENTS","• <a:hypesquad:755471122430034060>\`Hypesquad Event\`")
         flags = flags.replace("DISCORD_CLASSIC","• <a:classic:740922817683652754>\`Discord Classic\`")
      
          if(nitroBadge.includes("gif")) {
           flags = flags + `
      • <a:nitroboost:740923077973508156>  \`Nitro\``
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
      **•** \`\`ID:\`\` **${user.id}**
      **•** \`\`Profile:\`\` **${user}**
      **•** \`\`Bot:\`\` **${user.user.bot ? 'Yes' : 'No'}**
      **•** \`\`Created At:\`\` **${moment(user.user.createdAt).format('MMMM Do YYYY, H:mm:ss a')}**

      __**Member Info**__
      **•** \`\`Nickname:\`\` **${user.displayName ? user.displayName : 'yok'} **
      **•** \`\`Joined At:\`\` **${moment(user.joinedAt).format('MMMM Do YYYY, H:mm:ss a')}**
      **•** \`\`Activity:\`\` **${custom}**

      __**Roles:**__
      ${roles}

      __**Messages Info**__
      **•** \`\`Last Message:\`\` **${lastMessage}**
      **•** \`\`Last Message At:\`\` **${lastMessageTime}**
      **•** \`\`Message's Count:\`\` **${messagecount}**

      __**Badge Information**__
      ${flags} 
      
      __**Safety Check**__
      • ${safe}`)
          .setThumbnail(user.user.avatarURL({dynamic: true}))
          .setTimestamp()
          .setFooter('© Karma', 'https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png')
      message.react ('755471130315194399')
          message.channel.send(embeddd)

    }
}

