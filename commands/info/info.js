const mapping = {
    " ": "  ",
    "0": ":zero:",
    "1": ":one:",
    "2": ":two:",
    "3": ":three:",
    "4": ":four:",
    "5": ":five:",
    "6": ":six:",
    "7": ":seven:",
    "8": ":eight:",
    "9": ":nine:",
    "!": "!",
    "?": "?",
    "#": "#",
    "*": "*"
  };
  const Discord = require('discord.js');
  const config = require('../../configs/config.json');


module.exports = {
    config: {
        name: 'botinfo',
        description: 'Information about bot',
        aliases: ["info"],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
        "abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
            mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
          });
            let guilds;
            let channels;
            let users;
          setTimeout(()=>{
            guilds = 
                `${client.guilds.cache.size}`
                .split("")
                .map(c => mapping[c] || c)
                .join("")
            channels = 
                `${client.channels.cache.size}`
                .split("")
                .map(c => mapping[c] || c)
                .join("")
            let sayy = 0;
            client.guilds.cache.forEach(x =>{
               
               sayy+= x.memberCount
               
             })
             users = 
                
                
                 
                 `${sayy}`
                .split("")
                .map(c => mapping[c] || c)
                .join("")
          
             },200)
            //let kullanicisayi = donustur()
          setTimeout(()=>{
            const embed = new Discord.MessageEmbed()
          .setThumbnail(client.user.avatarURL())
          .setDescription("**Sakura Bot Project.**"+"\n\n <a:pyramid:757488922354909184> **Number of servers serviced :** " + guilds +
          "\n <a:pyramid:757488922354909184> **Number of channels served : ** " + channels +
          "\n <a:pyramid:757488922354909184> **Number of users served : ** " + users +
          "\n\n<:discordbotdev:757489652214267904> **Developers:** \n <@360498353462575115>")
          .addField("Invite Link: ",`**[Click Here!](https://discord.com/api/oauth2/authorize?client_id=636484020301201418&permissions=32&scope=bot)**`, true)
          .addField("Support Link: ",`**[Click Here!](https://discord.gg/NtyaM9d)**`, true)
          .addField("Vote Link:",`**[Click Here!](https://top.gg/bot/636484020301201418/vote)**`, true)
          .setTimestamp()
          .setFooter('© Sakura', 'https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png')
          .setColor(config.embedcolor);
           message.react ('755471130315194399')
          message.channel.send(embed)
                     },500)
    }
}

