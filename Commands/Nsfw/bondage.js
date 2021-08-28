const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    help: {
        name: 'bondage',
        aliases: ['bondage'],
        description: 'Shows Bondage Pictures',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {
        if (!message.channel.nsfw) return message.channel.send({
            embeds: [{
                color: config.embedcolor,
                description: "You can only use this command in an NSFW Channel!"
            }]
        })

        await fetch("https://shiro.gg/api/images/nsfw/bondage")
            .then(res => res.json())
            .then(body => {
                const embed = new MessageEmbed()
                    .setTitle(":smirk: Bondage")
                    .setImage(body.url)
                    .setColor(config.embedcolor)
                    .setFooter(`Tags: Bondage`)
                    .setURL(body.url);
                message.channel.send({embeds: [embed]});
            });
    },
};
