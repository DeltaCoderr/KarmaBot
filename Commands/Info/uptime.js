const { MessageEmbed } = require('discord.js');
const moment = require("moment");
require('moment-duration-format');

module.exports = {
    help: {
        name: 'uptime',
        aliases: ['uptime'],
        description: 'Shows the Bot\'s uptime',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        let uptime = moment.duration(client.uptime).format("D [ days] h[ hours] m[ minutes] s[ seconds]")

        const duration = moment.duration(client.uptime)
        let bicon = client.user.displayAvatarURL()
        const botembed = new MessageEmbed()
            .setTitle("Karma Bot Project")
            .setColor(config.embedcolor)
            .setDescription(`<a:pyramid:757488922354909184> **Karma has been active for** \`${uptime}\`. \n <a:pyramid:757488922354909184> **The ping is currently** \`${bot.ws.ping} ms\`. \n\n  ❗  **__Attention!__** **Karma is restarting himself after \`10 to 15 hours\` for a good quality and lagless sound!**`)
            .setTimestamp()
            .setFooter('© Karma ', 'https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png')
            .setThumbnail(bicon);
        message.channel.send({embeds: [botembed]});
    }
}