const Discord = require('discord.js');
const config = require('../../configs/config.json');
const emojis = require('../../configs/emotes.json');



module.exports = {
    config: {
        name: 'karma',
        description: 'Drops Random Karma Pictures.',
        aliases: ["karma"],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
        let tanjiro = ["https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png", "https://cdn.discordapp.com/attachments/725019921159028808/739771007803326505/Screenshot_20200803-1503282.png", "https://cdn.discordapp.com/attachments/725019921159028808/739772071487340554/Screenshot_20200803-1507552.png", "https://cdn.discordapp.com/attachments/725019921159028808/739775358873763930/Screenshot_20200803-1520512.png","https://media.tenor.com/images/44b1f2e5791bbcafc08635ed891869de/tenor.gif","https://media.tenor.com/images/13226b53b1daeedf245df942a5df1f73/tenor.gif","https://media.tenor.com/images/3e8741ee610a92c1d09c63d9843f3059/tenor.gif","https://media.tenor.com/images/4135992ea59f56f79f148db4b7993ae2/tenor.gif","https://media.tenor.com/images/4a555d4348005b8817374ab52b66e654/tenor.gif","https://media.tenor.com/images/a1a22df06827ea5145aa586a3cd1a020/tenor.gif","https://media.tenor.com/images/fea5efbf7c1bb96b5b1c945eb697075c/tenor.gif","https://media.tenor.com/images/3296cbcb947d415fe13fd89b01e9fff9/tenor.gif"];

    let result = Math.floor((Math.random() * tanjiro.length));

    let gifembed = new Discord.MessageEmbed()
        .setTitle("Random Karma Picture or Gif")
        .setColor(config.embedcolor)
        .setDescription(`[Full View](${tanjiro[result]})`)
        .setFooter(`© Karma`, message.author.avatarURL())
        .setImage(tanjiro[result]);
    message.channel.send(gifembed);
    }
}

