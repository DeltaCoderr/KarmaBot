const Discord = require('discord.js');
const config = require('../../configs/config.json');
const superagent = require('superagent');


module.exports = {
    config: {
        name: 'wink',
        description: 'winks others ;)',
        aliases: ["wink"],
        usage: '<user>',
        accessableby: "",
    },
    run: async (client, message, args) => {
        let { body } = await superagent.get(`https://some-random-api.ml/animu/wink`);
        const embed = new Discord.MessageEmbed()
          .setColor(config.embedcolor)
          .setTitle("Here's your Wink 😉 ")
          .setImage(body.link)
          .setTimestamp()
          .setFooter(`© Sakura `,"https://cdn.discordapp.com/avatars/739817077573025892/cb1e8de0cafdc718c0b40181cd1cdd6d.png?size=1024");
        message.channel.send(embed);
    }
}

