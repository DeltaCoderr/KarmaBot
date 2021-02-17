const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../configs/config.json');

module.exports = {
    config: {
        name: 'thigh',
        description: 'Shows Thigh pictures',
        aliases: ["thighs"],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send({embed: {
                    color: 16734039,
                    description: "You can use this command in an NSFW Channel!"
                }})
        }
        superagent.get('https://shiro.gg/api/images/nsfw/thighs')
            .end((err, response) => {
          const embed = new Discord.MessageEmbed()
          .setTitle(":smirk: Thighs")
          .setImage(response.body.url)
          .setColor(config.embedcolor)
          .setFooter(`Tags: Thighs`)
          .setURL(response.body.url);
      message.channel.send(embed);
        }).catch((err) => message.channel.send({embed: {
                    color: 16734039,
                    description: "Something went wrong... :cry:"
                }}));
    }
}

