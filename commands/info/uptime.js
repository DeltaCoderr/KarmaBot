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
        .setTitle("Sakura Bot Project")
        .setColor(config.embedcolor)
        .setDescription(`<a:pyramid:757488922354909184> **Sakura has been active for** \`${uptime}\`. \n <a:pyramid:757488922354909184> **The ping is currently** \`${bot.ws.ping} ms\`. \n\n  ❗  **__Attention!__** **Sakura is restarting himself after \`10 to 15 hours\` for a good quality and lagless sound!**`)
        .setTimestamp()
        .setFooter('© Sakura ', 'https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png')
        .setThumbnail(bicon);
 message.react ('727551598640889896')
    message.channel.send(botembed);
    }
}

