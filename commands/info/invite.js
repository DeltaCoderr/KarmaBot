const Discord = require('discord.js');
const config = require('../../configs/config.json');


module.exports = {
    config: {
        name: 'invite',
        description: 'Link to invite me',
        aliases: [""],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setThumbnail(client.user.avatarURL())
    .setDescription(
      "**Sakura Bot Project** \n\n**👋 Hey!\n Do you want Invite me? [Click Here](https://discord.com/api/oauth2/authorize?client_id=739817077573025892&permissions=268435504&scope=bot) to Invite me!\nThanks for supporting me.** ❤️"
    )
    .addField(
      "Support Link: ",
      `**[Click Here!](https://discord.gg/CJ9y9We5)**`,
      true
    )
    .setTimestamp()
    .setFooter(
      "© Sakura",
      "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png"
    )
    .setColor(config.embedcolor);
    message.channel.send(embed)
    }
}

