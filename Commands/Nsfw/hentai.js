const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    help: {
        name: 'hentai',
        aliases: ['hentai'],
        description: 'Shows Hentai Pictures',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send({
                embeds: [{
                    color: config.embedcolor,
                    description: "You can use only this command in an NSFW Channel!"
                }]
            });
        };

        await fetch("https://shiro.gg/api/images/nsfw/hentai")
            .then(res => res.json())
            .then(body => {
                const embed = new MessageEmbed()
                    .setTitle(":smirk: Hentai")
                    .setImage(body.url)
                    .setColor(config.embedcolor)
                    .setFooter(`Tags: Hentai`)
                    .setURL(body.url);
                message.channel.send({embeds: [embed]});
            });
    },
};