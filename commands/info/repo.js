const Discord = require('discord.js');
const config = require('../../configs/config.json');


module.exports = {
  config: {
    category: __dirname.split("commands\\")[1],
    name: 'repo',
    description: 'Link to the Github Repository',
    aliases: ["repository"],
    usage: '',
    accessableby: "",
  },
  run: async (client, message, args) => {

    const embed = new Discord.MessageEmbed()
      .setThumbnail(client.user.avatarURL())
      .setDescription("**Karma Bot Project** \n\n<:GitHub:803579137759379497> **Karma Bot is Open Source! [Click Here](https://github.com/DeltaCoderr/KarmaBot) to check the Github!\n" + client.emotes.flyinghearts + "Contributions are Welcomed, Thanks for supporting me.** ❤️")
      .addField("Invite Link: ", `**[Click Here!](https://discord.com/api/oauth2/authorize?client_id=636484020301201418&permissions=32&scope=bot)**`, true)
      .addField("Support Link: ", `**[Click Here!](https://discord.gg/NtyaM9d)**`, true)
      .addField("Vote Link:", `**[Click Here!](https://top.gg/bot/636484020301201418/vote)**`, true)
      .setTimestamp()
      .setFooter("© Karma", "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")
      .setColor(config.embedcolor);
    message.channel.send(embed)
  }
}