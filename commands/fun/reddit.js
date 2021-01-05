const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const config = require('../../configs/config.json');
const superagent = require('superagent')

module.exports = {
    config: {
        name: 'reddit',
        description: 'Shows pic from Reddit',
        aliases: ["reddit"],
        usage: '<subreddit>',
        accessableby: "",
    },
    run: async (client, message, args) => {
    
        if(!args[0]) return message.reply("You didn't provide a SubReddit Name!")
        let {body} = await superagent
        .get(`https://www.reddit.com/r/${args}.json?sort=top&t=week`)
        .query({limit: 800});
    
        var allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if(!allowed.length) return message.reply("We are running out of  memes. 😂😂😂")
        var randomNumber = Math.floor(Math.random() * allowed.length)
        var embed = new MessageEmbed()
        .setColor(config.embedcolor)
        .setTitle(allowed[randomNumber].data.title)
        .setDescription(`**Author** - ${allowed[randomNumber].data.author}`)
        .setImage(allowed[randomNumber].data.url)
        .addField('Information: ', "• **UpVotes:** " + allowed[randomNumber].data.ups + " / • **Comments:** " + allowed[randomNumber].data.num_comments)
        .setTimestamp()
        .setFooter(`© Sakura `, "https://cdn.discordapp.com/avatars/739817077573025892/cb1e8de0cafdc718c0b40181cd1cdd6d.png?size=1024")
        return message.channel.send(embed)

        
    }
}

