const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const redditimage = require("reddit.images");
const config = require('../../configs/config.json');

module.exports = {
    config: {
        name: 'reddit',
        description: 'Shows pic from Reddit',
        aliases: ["reddit"],
        usage: '<subreddit>',
        accessableby: "",
    },
    run: async (client, message, args) => {
        try {
        if(!args[0]) return message.reply("**Please provide a subreddit.**")
        const subreds = args[0]
        
        const redditResult = await redditimage.fetch({
             type: "custom",
             subreddit: [subreds || 'memes'],
        })

       const reddit = new MessageEmbed()
        .setTitle(redditResult[0].title)
        .setURL(redditResult[0].postLink)
        .setImage(redditResult[0].image)
        .setDescription(`👍 **${redditResult[0].upvotes}** | 👎 **${redditResult[0].downvotes}**`)
        .setAuthor(`r/${subreds}`, "https://cdn.discordapp.com/attachments/799226474640048149/799273472990642196/2018_social_media_popular_app_logo_reddit-512.png", redditResult[0].postLink)
        .setColor(config.embedcolor)
        .setFooter(`If the image didn't load click the title.`, message.guild.iconURL({ dynamic: true }))
        .setTimestamp()
        

   if(redditResult[0].NSFW === true) {
        message.channel.send('Wait... this meme was flagged as `nsfw` meme, are you sure you want to continue? (`yes`) or (`no`)')
        let nsfwFilter = m => m.author.id === message.author.id;
        let nsfwCollector = new Discord.MessageCollector(message.channel, nsfwFilter, { max: 999 });
        nsfwCollector.on('collect', async msg => {
            if(msg.content.toLowerCase() === 'yes') {
                if(msg.channel.nsfw) {
                    message.channel.send(reddit)
                    await nsfwCollector.stop()
                    return;
                } else {
                    message.channel.send('This channel is NOT a nsfw channel.')
                    await nsfwCollector.stop()
                    return;
                }
            } else if(msg.content.toLowerCase() === 'no') {
                message.channel.send('Alright.')
                await nsfwCollector.stop()
                return;
            } else {
               message.channel.send('Please provide a valid answer! (`yes`) or (`no`)')
                return;
            }
        })
    } else if(redditResult[0].spoiler === true) {
         message.channel.send('This meme was flagged as `spoiler` meme, are you sure you want to continue? (`yes`) or (`no`)')
          let spoilerFilter = m => m.author.id === message.author.id;
        let spoilerCollector = new Discord.MessageCollector(message.channel, spoilerFilter, { max: 999 });
        spoilerCollector.on('collect', async msg => {
            if(msg.content.toLowerCase() === 'yes') {
                message.channel.send(reddit)
                await spoilerCollector.stop()
                return;
            } else if(msg.content.toLowerCase() === 'no') {
                message.channel.send('Seems like you dont want spoilers, alright ig.')
                await spoilerCollector.stop()
                return;
            } else {
             message.channel.send('Please provide a valid answer! (`yes`) or (`no`)')
             return;
            }
        })
    } else  if(redditResult[0].NSFW !== true || redditResult[0].spoiler !== true) {
        return message.channel.send(reddit)
    }
    } catch(e) {
        if(e.status === 403) return message.channel.send('Meme Is Private!')
        if(e.status === 404) return message.channel.send('Meme Not Found!')
        return message.channel.send('Invalid subreddit.')
    }
    }
}
