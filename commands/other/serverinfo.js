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
            .addField(`**Online Users**`, `≫ \`${onlineUsers.online}\``, true)
            .addField(`👤 **Total Users**`,  `≫ \`${message.guild.memberCount}\``, true)
            .addField(`📜 **Roles**`, `≫ \`${message.guild.roles.cache.size}\``, true)
            .addField(`💬 **Text Channels**`, `≫ \`${message.guild.channels.cache.size}\``, true)
            .addField(`🌍 **Server Region**`, `≫ \`${message.guild.region}\``, true)
            .addField(`😎 **Emotes**`, `≫ \`${message.guild.emojis.cache.size}\``, true)
            .setTimestamp()
            .setFooter(`© Karma `, "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")
    
          message.channel.send(embed);
    }
}

