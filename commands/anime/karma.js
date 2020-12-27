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
        let karma = ["https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png", "https://cdn.discordapp.com/attachments/725019921159028808/739771007803326505/Screenshot_20200803-1503282.png", "https://cdn.discordapp.com/attachments/725019921159028808/739772071487340554/Screenshot_20200803-1507552.png", "https://cdn.discordapp.com/attachments/725019921159028808/739775358873763930/Screenshot_20200803-1520512.png","https://media.tenor.com/images/44b1f2e5791bbcafc08635ed891869de/tenor.gif","https://media.tenor.com/images/13226b53b1daeedf245df942a5df1f73/tenor.gif","https://media.tenor.com/images/3e8741ee610a92c1d09c63d9843f3059/tenor.gif","https://media.tenor.com/images/4135992ea59f56f79f148db4b7993ae2/tenor.gif","https://media.tenor.com/images/4a555d4348005b8817374ab52b66e654/tenor.gif","https://media.tenor.com/images/a1a22df06827ea5145aa586a3cd1a020/tenor.gif","https://media.tenor.com/images/fea5efbf7c1bb96b5b1c945eb697075c/tenor.gif","https://media.tenor.com/images/3296cbcb947d415fe13fd89b01e9fff9/tenor.gif","https://cdn.discordapp.com/attachments/725019921159028808/792447457849901072/Screenshot_20201226-2333002.png", "https://cdn.discordapp.com/attachments/725019921159028808/792447458268938292/wp2366933.jpg","https://cdn.discordapp.com/attachments/725019921159028808/792447458268938292/wp2366933.jpg","https://cdn.discordapp.com/attachments/725019921159028808/792447458516008970/d8w84y2-a49309a9-a8fb-4679-8ea2-60e3284b20ff.png","https://cdn.discordapp.com/attachments/725019921159028808/792462751310151700/image0-2.jpg","https://cdn.discordapp.com/attachments/725019921159028808/792462751577931867/image0-1.jpg"];

    let result = Math.floor((Math.random() * karma.length));

    let gifembed = new Discord.MessageEmbed()
        .setTitle("Random Karma Picture or Gif")
        .setColor(config.embedcolor)
        .setDescription(`[Full View](${karma[result]})`)
        .setFooter(`© Karma`, message.author.avatarURL())
        .setImage(karma[result]);
    message.channel.send(gifembed);
    }
}

