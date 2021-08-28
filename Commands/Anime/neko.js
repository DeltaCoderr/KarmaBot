const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js');

module.exports = {
    help: {
        name: 'neko',
        aliases: ['neko'],
        description: 'Drops random Neko Pictures.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        fetch('https://shiro.gg/api/images/neko')
        .then(res => res.json())
        .then(response => {
                const embed = new MessageEmbed()
                    .setTitle("Here's your Neko")
                    .setImage(response.url)
                    .setColor(config.embedcolor)
                    .setTimestamp()
                    .setFooter(`© Karma `, "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")
                    .setURL(response.url);
                message.channel.send({ embeds: [embed]});
            });
    },
};