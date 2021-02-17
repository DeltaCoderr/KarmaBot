const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../configs/config.json');

module.exports = {
    config: {
        name: 'bondage',
        description: 'Shows Bondage Pictures',
        aliases: [""],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
        if (!message.channel.nsfw) return message.channel.send({embed: {
            color: 16734039,
            description: "You can use this command in an NSFW Channel!"
        }})

superagent.get('https://shiro.gg/api/images/nsfw/bondage')
    .end((err, response) => {
  const embed = new Discord.MessageEmbed()
  .setTitle(":smirk: Bondage")
  .setImage(response.body.url)
  .setColor(config.embedcolor)
  .setFooter(`Tags: bondage`)
  .setURL(response.body.url);
message.channel.send(embed);
}).catch((err) => message.channel.send({embed: {
            color: 16734039,
            description: "Something went wrong... :cry:"
        }}));
    }
}

