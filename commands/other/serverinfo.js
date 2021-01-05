const Discord = require('discord.js');
const config = require('../../configs/config.json');


module.exports = {
    config: {
        name: 'serverinfo',
        description: 'Shows informations about server',
        aliases: ["sinfo",],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
    
        const onlineUsers = {
            online: message.guild.presences.cache.filter(presence => presence.status === "online").size,
            idle: message.guild.presences.cache.filter(presence => presence.status === "idle").size,
            dnd: message.guild.presences.cache.filter(presence => presence.status === "dnd").size,
          };
    
          const embed = new Discord.MessageEmbed()
            .setColor(config.embedcolor)
            .setTitle(`${message.guild.name}`)
            .setThumbnail(message.guild.iconURL)
            .addField(`<:discord_online:739717108882997278> **Online Users**`, `≫ \`${onlineUsers.online}\``, true)
            .addField(`👤 **Total Users**`,  `≫ \`${message.guild.memberCount}\``, true)
            .addField(`📜 **Roles**`, `≫ \`${message.guild.roles.cache.size}\``, true)
            .addField(`💬 **Text Channels**`, `≫ \`${message.guild.channels.cache.size}\``, true)
            .addField(`🌍 **Server Region**`, `≫ \`${message.guild.region}\``, true)
            .addField(`😎 **Emotes**`, `≫ \`${message.guild.emojis.cache.size}\``, true)
            .setTimestamp()
            .setFooter(`© Sakura `, "https://cdn.discordapp.com/avatars/739817077573025892/cb1e8de0cafdc718c0b40181cd1cdd6d.png?size=1024")
    
          message.channel.send(embed);
    }
}

