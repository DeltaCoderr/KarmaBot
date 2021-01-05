const Discord = require('discord.js');
const config = require('../../configs/config.json');
const moment = require("moment");
require('moment-duration-format')


module.exports = {
    config: {
        name: 'uptime',
        description: 'Shows bot uptime',
        aliases: [""],
        usage: '',
        accessableby: "",
    },
    run: async (bot, message, args) => {
        const prefix = config.prefix
        if (!message.content.startsWith(prefix)) return;

        let uptime = moment.duration(bot.uptime).format("D [ days] h[ hours] m[ minutes] s[ seconds]")

        const duration = moment.duration(bot.uptime)
    let bicon = bot.user.displayAvatarURL()
    const botembed = new Discord.MessageEmbed()
        .setTitle("<a:loading:796132997950078986> Sakura Bot Project")
        .setColor(config.embedcolor)
        .setDescription(` **Sakura has been active for** \`${uptime}\`. \n  **The ping is currently** \`${bot.ws.ping} ms\`. \n\n  ❗  **__Attention!__** **Sakura is restarting himself after \`10 to 15 hours\` for a good quality and lagless sound!**`)
        .setTimestamp()
        .setFooter('© Sakura ', 'https://cdn.discordapp.com/avatars/739817077573025892/cb1e8de0cafdc718c0b40181cd1cdd6d.png?size=1024')
        .setThumbnail(bicon);
 message.react ('727551598640889896')
    message.channel.send(botembed);
    }
}

