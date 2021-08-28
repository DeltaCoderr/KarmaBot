const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    help: {
        name: 'thigh',
        aliases: ['thigh'],
        description: 'Shows Thigh Pictures',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send({
                embed: {
                    color: config.embedcolor,
                    description: "You can only use this command in an NSFW Channel!"
                }
            })
        }

        await fetch("https://shiro.gg/api/images/nsfw/thighs")
        .then(res => res.json())
        .then(body => {
            const embed = new MessageEmbed()
                .setTitle(":smirk: Thighs")
                .setImage(body.url)
                .setColor(config.embedcolor)
                .setFooter(`Tags: Thighs`)
                .setURL(body.url);
            message.channel.send({embeds: [embed]});
        });
    }
}