const Discord = require('discord.js');
const config = require('../../configs/config.json');
const osu = require('node-osu');
const { MessageEmbed } = require('discord.js');
const api = new osu.Api("85842912bd27a41e4474c36868bd9b92605c61b0" , {
// END OF OSU API KEY
    notFoundAsError: true,
    completeScores: false 
})

module.exports = {
    config: {
        name: 'osu',
        description: 'Shows information about osu player',
        aliases: ["osu"],
        usage: '<query>',
        accessableby: "",
    },
    run: async (client, message, args) => {
    
        let username = args[0]
  
  
if (!args[0]) return message.channel.send('Please, provide a valid user\'s nickname! (osu!)')

api.getUser({u: username}).then(user => {
const osu = new Discord.MessageEmbed()
.setTitle(`<:osu:760439827086311446> User Osu Search System`)
.setThumbnail(`http://s.ppy.sh/a/${user.id}}`)
.setColor(config.embedcolor)
.addField('》`Nickname:`', user.name)
.addField('》`PP:`', Math.round(user.pp.raw))
.addField('》`Rank:`', user.pp.rank)
.addField('》`Level:`', Math.round(user.level))
.addField('》`Score:`', user.scores.ranked)
.addField('》`Country:`', user.country)
.addField('》`Country Rank:`', user.pp.countryRank)
.addField('》`Playcount:`', user.counts.plays)
.addField('》`Accuracy:`', `${user.accuracyFormatted}`)
.setTimestamp()
    .setFooter(`© Sakura `, "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")
console.log(user)
message.channel.send(osu)
})

    }
}

