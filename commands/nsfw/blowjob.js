const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../configs/config.json');

module.exports = {
    config: {
        name: 'blowjob',
        description: 'Shows blowjob picture',
        aliases: ["bj"],
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
        superagent.get('https://nekos.life/api/v2/img/blowjob')
            .end((err, response) => {
          const embed = new Discord.MessageEmbed()
          .setTitle(":smirk: Blowjob")
          .setImage(response.body.url)
          .setColor(config.embedcolor)
          .setFooter(`Tags: blowjob`)
          .setURL(response.body.url);
      message.channel.send(embed);
        }).catch((err) => message.channel.send({embed: {
                    color: 16734039,
                    description: "Something went wrong... :cry:"
                }}));
    }
}

