const Discord = require('discord.js');
const config = require('../../configs/config.json');
const superagent = require('superagent')

module.exports = {
    config: {
        category: __dirname.split("commands\\")[1],
        name: 'neko',
        description: 'Drops Random Neko Pictures',
        aliases: ["neko"],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {


        superagent.get('https://shiro.gg/api/images/neko')
            .end((err, response) => {
                const embed = new Discord.MessageEmbed()
                    .setTitle("Here's your Neko")
                    .setImage(response.body.url)
                    .setColor(config.embedcolor)
                    .setTimestamp()
                    .setFooter(`© Karma `, "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")
                    .setURL(response.body.url);
                message.channel.send(embed);
            }).catch((err) => message.channel.send({
                embed: {
                    color: 16734039,
                    title: "Something went wrong... :cry:"
                }
            }));
    }
}